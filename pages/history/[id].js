import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authorizationPage } from "middleware/authorizationPage";
import axiosApiInstances from "utils/axios";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import PageNav from "components/module/PageNav";
import styles from "styles/History.module.css";

export const getServerSideProps = async (context) => {
  const data = await authorizationPage(context);
  const authorization = { Authorization: `Bearer ${data.token} || ""` };
  const id = data.userId;

  const res = await axiosApiInstances
    .get(`user/${data.userId}`, { headers: authorization })
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return [];
    });
  const transactionByWeek = await axiosApiInstances
    .get(`transaction?by=week&id=${id}`, { headers: authorization })
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return [];
    });
  const transactionByMonth = await axiosApiInstances
    .get(`transaction?by=month&id=${id}`, { headers: authorization })
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return [];
    });
  return {
    props: { user: res[0], transactionByWeek, transactionByMonth },
  };
};

const History = (props) => {
  const { user_id } = props.user;
  const { transactionByWeek, transactionByMonth } = props;

  return (
    <Layout title="History">
      <Navbar user={props.user} />
      <div className={`container-fluid ${styles.outerContainer}`}>
        <div className="row row-cols-1 row-cols-md-2 h-100 gy-3 gy-md-0">
          <div className={`col-md-3 ${styles.navSide}`}>
            <PageNav user={props.user} page="dashboard" />
          </div>
          <div className={`col-md-9`}>
            <div className={`${styles.historyListContainer}`}>
              <h4 className="text-start w-100">Transaction History</h4>
              <div className="text-start mb-5 w-100">
                <h5>This Week</h5>
                <div
                  className={`${styles.listContainer} ${
                    transactionByWeek.length > 3 && styles.overflowOn
                  }`}
                >
                  {transactionByWeek.map((item, index) => (
                    <div
                      key={index}
                      className={`d-flex align-items-center justify-content-between ${styles.list}`}
                    >
                      <div className="d-flex text-start">
                        {item.transaction_sender_id === user_id ? (
                          <img
                            src={
                              item.receiver_image
                                ? `http://localhost:3004/api/${item.receiver_image}`
                                : "/default-img-placeholder.png"
                            }
                            className="me-2"
                          />
                        ) : (
                          <img
                            src={
                              item.sender_image
                                ? `http://localhost:3004/api/${item.sender_image}`
                                : "/default-img-placeholder.png"
                            }
                            className="me-2"
                          />
                        )}
                        <div className="d-flex flex-column justify-content-center">
                          <h6>
                            {item.transaction_sender_id === user_id
                              ? item.receiver_name
                              : item.sender_name}
                          </h6>
                          <span>{item.transaction_type}</span>
                        </div>
                      </div>
                      {item.transaction_sender_id === user_id ? (
                        <p
                          className={`m-0 ${styles.transfer} ${styles.expense}`}
                        >
                          -Rp{" "}
                          {parseInt(item.transaction_amount).toLocaleString(
                            "id-ID"
                          )}
                        </p>
                      ) : (
                        <p
                          className={`m-0 ${styles.transfer} ${styles.income}`}
                        >
                          +Rp{" "}
                          {parseInt(item.transaction_amount).toLocaleString(
                            "id-ID"
                          )}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-start w-100">
                <h5>This Month</h5>
                <div
                  className={`${styles.listContainer} ${
                    transactionByMonth.length > 3 && styles.overflowOn
                  }`}
                >
                  {transactionByMonth.map((item, index) => (
                    <div
                      key={index}
                      className={`d-flex align-items-center justify-content-between ${styles.list}`}
                    >
                      <div className="d-flex text-start">
                        {item.transaction_sender_id === user_id ? (
                          <img
                            src={
                              item.receiver_image
                                ? `http://localhost:3004/api/${item.receiver_image}`
                                : "/default-img-placeholder.png"
                            }
                            className="me-2"
                          />
                        ) : (
                          <img
                            src={
                              item.sender_image
                                ? `http://localhost:3004/api/${item.sender_image}`
                                : "/default-img-placeholder.png"
                            }
                            className="me-2"
                          />
                        )}
                        <div className="d-flex flex-column justify-content-center">
                          <h6>
                            {item.transaction_sender_id === user_id
                              ? item.receiver_name
                              : item.sender_name}
                          </h6>
                          <span>{item.transaction_type}</span>
                        </div>
                      </div>
                      {item.transaction_sender_id === user_id ? (
                        <p
                          className={`m-0 ${styles.transfer} ${styles.expense}`}
                        >
                          -Rp{" "}
                          {parseInt(item.transaction_amount).toLocaleString(
                            "id-ID"
                          )}
                        </p>
                      ) : (
                        <p
                          className={`m-0 ${styles.transfer} ${styles.income}`}
                        >
                          +Rp{" "}
                          {parseInt(item.transaction_amount).toLocaleString(
                            "id-ID"
                          )}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default History;
