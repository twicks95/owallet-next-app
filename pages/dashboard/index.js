// import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authorizationPage } from "middleware/authorizationPage";
import axiosApiInstances from "utils/axios";
import Layout from "components/Layout";
import styles from "styles/Dashboard.module.css";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import PageNav from "components/module/PageNav";
import { Button, Modal } from "react-bootstrap";
import {
  ArrowUp,
  ArrowDown,
  CheckCircle,
  IconContext,
  Plus,
} from "phosphor-react";
import { Bar } from "react-chartjs-2";

export async function getServerSideProps(context) {
  const data = await authorizationPage(context);
  const authorization = { Authorization: `Bearer ${data.token || ""}` };

  const [userRes, transactionRes, incomeRes, expenseRes, dataChartRes] =
    await Promise.all([
      axiosApiInstances
        .get(`user/${data.userId}`, { headers: authorization })
        .then((res) => {
          return res.data.data[0];
        })
        .catch(() => {
          return [];
        }),
      axiosApiInstances
        .get(`transaction?id=${data.userId}&by=all&limit=5`, {
          headers: authorization,
        })
        .then((res) => {
          return res.data.data;
        })
        .catch(() => {
          return [];
        }),
      axiosApiInstances
        .get(`transaction/income/${data.userId}`, { headers: authorization })
        .then((res) => {
          return res.data.data[0].total_income;
        })
        .catch(() => {
          return "";
        }),
      axiosApiInstances
        .get(`transaction/expense/${data.userId}`, { headers: authorization })
        .then((res) => {
          return res.data.data[0].total_expense;
        })
        .catch(() => {
          return "";
        }),
      axiosApiInstances
        .get(`transaction/total/${data.userId}`, { headers: authorization })
        .then((res) => {
          return res.data.data;
        })
        .catch(() => {
          return [];
        }),
    ]);

  return {
    props: {
      user: userRes,
      transactionData: transactionRes,
      income: incomeRes,
      expense: expenseRes,
      dataChart: dataChartRes,
    },
  };
}

function Home(props) {
  const router = useRouter();
  const { income, expense, dataChart } = props;
  const { balance, user_id, user_phone } = props.user;
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [topupSuccess, setTopupSuccess] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    setTransactionHistory(props.transactionData);
  }, []);

  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const totalPerDay = [null, null, null, null, null, null, null];
  if (dataChart.length > 0) {
    for (const i of dataChart) {
      if (day.indexOf(i.day) >= 0) {
        totalPerDay[day.indexOf(i.day)] = parseInt(i.total);
      }
    }
  }

  // Data chart
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "total",
        data: totalPerDay,
        backgroundColor: [
          "#3955f5",
          "#3955f5",
          "#9DA6B5",
          "#9DA6B5",
          "#9DA6B5",
          "#3955f5",
          "#9DA6B5",
        ],
        borderColor: [
          "#3955f5",
          "#3955f5",
          "#9DA6B5",
          "#9DA6B5",
          "#9DA6B5",
          "#3955f5",
          "#9DA6B5",
        ],
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 10,
        minBarLength: 2,
      },
    ],
  };

  const handleTopup = (id, amount) => {
    setLoading(true);
    axiosApiInstances
      .post(`topup/${id}`, { amount })
      .then(() => {
        setTopupSuccess(true);
        setAmount("");
        router.push("/dashboard");
      })
      .catch((err) => {
        window.alert(err.response.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout title="Dashboard">
      <Navbar user={props.user} />
      <Modal
        size="md"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">
            Top Up Your Balance...
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="d-flex flex-column">
          {topupSuccess && (
            <div className="d-flex flex-column align-items-center justify-content-center mb-4">
              <CheckCircle weight={"fill"} size="70" color="#1EC15F" />
              <span
                style={{
                  margin: "0px",
                  fontSize: "22px",
                  fontWeight: "700",
                }}
              >
                Top Up Success...
              </span>
            </div>
          )}
          <div
            style={{ padding: "20px 0" }}
            className="d-flex flex-column justify-content-center"
          >
            <h6>Input the amount of money you want to add.</h6>
            <input
              type="text"
              placeholder="10.000.000"
              maxLength="10"
              pattern="[0-9]"
              value={amount}
              style={{
                borderStyle: "none",
                borderBottom: "1.5px solid #a9a9a999",
                color: "#6379f4",
                margin: "20px 0 0 0",
                outline: "none",
                fontSize: "46px",
                fontWeight: "700",
                textAlign: "center",
              }}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!amount ? (
            <button type="button" className="btn btn-primary w-100" disabled>
              Top Up
            </button>
          ) : loading ? (
            <button
              className="btn btn-primary d-flex align-items-center justify-content-center w-100"
              type="button"
              disabled
            >
              <span
                className="spinner-grow spinner-grow-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          ) : (
            <Button
              variant="primary"
              className="w-100"
              onClick={() => handleTopup(user_id, amount)}
            >
              Top Up
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <div className={`container-fluid ${styles.outerContainer}`}>
        <div className="row row-cols-1 row-cols-md-2 h-100 gy-3 gy-md-0">
          <div className={`col-md-3 p-0 px-md-3 ${styles.navSide}`}>
            <PageNav user={props.user} page="dashboard" />
          </div>
          <div className={`col-md-9 ${styles.profileSide}`}>
            <div className={`row row-cols-1 gy-3 ${styles.dashboardContainer}`}>
              <IconContext.Provider
                value={{
                  color: "#B5B0ED",
                  size: "1.2em",
                  weight: "bold",
                  mirrored: false,
                }}
              >
                <div
                  className={`col-12 d-flex align-items-center justify-content-between ${styles.head}`}
                >
                  <div className="text-start">
                    <h2>Balance</h2>
                    <p>Rp{balance.toLocaleString("id-ID")}</p>
                    <span>+62 {user_phone.substr(1)}</span>
                  </div>
                  <div className="d-flex flex-column gap-3">
                    <Button
                      variant="primary"
                      className={`d-flex align-items-center justify-content-evenly`}
                      onClick={() => router.push("/transfer")}
                    >
                      <ArrowUp className="me-2" />
                      Transfer
                    </Button>
                    <Button
                      variant="primary"
                      className={`d-flex align-items-center justify-content-evenly`}
                      onClick={() => {
                        setShowModal(true), setTopupSuccess(false);
                      }}
                    >
                      <Plus className="me-2" />
                      Top Up
                    </Button>
                  </div>
                </div>
              </IconContext.Provider>
              <div className={`col-12 p-0 ${styles.main}`}>
                <div className={`row row-cols-1 row-cols-lg-2 gy-3`}>
                  <div className={`col pe-lg-0`}>
                    <div
                      className={`d-flex flex-column justify-content-between ${styles.stat}`}
                    >
                      <div className="d-flex justify-content-between">
                        <div className={`text-start ${styles.income}`}>
                          <ArrowUp size={28} color="#1EC15F" />
                          <h6 className="m-0">Income</h6>
                          <span className="m-0">
                            {income
                              ? `Rp${parseInt(income).toLocaleString("id-ID")}`
                              : "Rp-"}
                          </span>
                        </div>
                        <div className={`text-start ${styles.expense}`}>
                          <ArrowDown size={28} color="#FF5B37" />
                          <h6 className="m-0">Expense</h6>
                          <span className="m-0">
                            {expense
                              ? `Rp${parseInt(expense).toLocaleString("id-ID")}`
                              : "Rp-"}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center h-100 mt-2">
                        <Bar
                          data={data}
                          options={{ maintainAspectRatio: true }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`col`}>
                    <div className={`${styles.history}`}>
                      <div
                        className={`d-flex align-items-center justify-content-between ${styles.historyHead}`}
                      >
                        <h2>Transaction History</h2>
                        <a href={`/history/${user_id}`}>See all</a>
                      </div>
                      <div className={styles.historyListContainer}>
                        {transactionHistory ? (
                          transactionHistory.map((item, index) => (
                            <div
                              key={index}
                              className={`d-flex align-items-center justify-content-between ${styles.list}`}
                            >
                              <div className="d-flex text-start">
                                {item.transaction_sender_id === user_id ? (
                                  <img
                                    src={
                                      item.receiver_image
                                        ? `${process.env.API_IMG_URL}${item.receiver_image}`
                                        : "/default-img-placeholder.png"
                                    }
                                    className="me-2"
                                  />
                                ) : (
                                  <img
                                    src={
                                      item.sender_image
                                        ? `${process.env.API_IMG_URL}${item.sender_image}`
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
                                  className={`m-0 ${styles.transfer} ${styles.out}`}
                                >
                                  -Rp{" "}
                                  {parseInt(
                                    item.transaction_amount
                                  ).toLocaleString("id-ID")}
                                </p>
                              ) : (
                                <p
                                  className={`m-0 ${styles.transfer} ${styles.in}`}
                                >
                                  +Rp{" "}
                                  {parseInt(
                                    item.transaction_amount
                                  ).toLocaleString("id-ID")}
                                </p>
                              )}
                            </div>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default Home;
