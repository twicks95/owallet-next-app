import { useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Dashboard.module.css";
import Cookies from "next-cookies";
import Navbar from "../components/module/Navbar";
import Footer from "../components/module/Footer";
import PageNav from "../components/module/PageNav";
import axiosApiInstances from "../utils/axios";
import { authorizationPage } from "../middleware/authorizationPage";
import { Button } from "react-bootstrap";
import { ArrowUp, IconContext, Plus } from "phosphor-react";
import Link from "next/link";

export async function getServerSideProps(context) {
  const data = await authorizationPage(context);
  const res = await axiosApiInstances
    .get(`user/${data.userId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      return [];
    });
  return {
    props: { data: res },
  };
}

export default function Home(props) {
  // const [users, setUsers] = useState(props.users);
  const { balance, user_phone } = props.data.data[0];

  return (
    <Layout title="Dashboard">
      <Navbar data={props.data} />
      <div className={`container-fluid ${styles.outerContainer}`}>
        <div className="row row-cols-1 row-cols-md-2 h-100">
          <div className={`col-md-3 ${styles.navSide}`}>
            <PageNav data={props.data} page="dashboard" />
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
                    <p>Rp{balance}</p>
                    <span>+62 {user_phone}</span>
                  </div>
                  <div className="d-flex flex-column gap-3">
                    <Button
                      variant="primary"
                      className={`d-flex align-items-center justify-content-evenly`}
                    >
                      <ArrowUp className="me-2" />
                      Transfer
                    </Button>
                    <Button
                      variant="primary"
                      className={`d-flex align-items-center justify-content-evenly`}
                    >
                      <Plus className="me-2" />
                      Top Up
                    </Button>
                  </div>
                </div>
              </IconContext.Provider>
              <div className={`col-12 p-0 ${styles.main}`}>
                <div className={`row row-cols-2`}>
                  <div className={`col-6 pe-0`}>
                    <div className={`${styles.stat}`}>Graph</div>
                  </div>
                  <div className={`col-6`}>
                    <div className={`${styles.history}`}>
                      <div
                        className={`d-flex align-items-center justify-content-between ${styles.historyHead}`}
                      >
                        <h2>Transaction History</h2>
                        <Link href="/">See all</Link>
                      </div>
                      <div
                        className={`d-flex align-items-center justify-content-between ${styles.list}`}
                      >
                        <div className="d-flex text-start">
                          <img src="/user2.png" className="me-2" />
                          <div className="d-flex flex-column justify-content-center">
                            <h5 className="m-0">Samuel Umtiti</h5>
                            <span>Transfer</span>
                          </div>
                        </div>
                        <p className={`m-0 ${styles.transfer}`}>+Rp50.000</p>
                      </div>
                      <div
                        className={`d-flex align-items-center justify-content-between ${styles.list}`}
                      >
                        <div className="d-flex text-start">
                          <img src="/user2.png" className="me-2" />
                          <div className="d-flex flex-column justify-content-center">
                            <h5 className="m-0">Samuel Umtiti</h5>
                            <span>Transfer</span>
                          </div>
                        </div>
                        <p className={`m-0 ${styles.transfer}`}>+Rp50.000</p>
                      </div>
                      <div
                        className={`d-flex align-items-center justify-content-between ${styles.list}`}
                      >
                        <div className="d-flex text-start">
                          <img src="/user2.png" className="me-2" />
                          <div className="d-flex flex-column justify-content-center">
                            <h5 className="m-0">Samuel Umtiti</h5>
                            <span>Transfer</span>
                          </div>
                        </div>
                        <p className={`m-0 ${styles.transfer}`}>+Rp50.000</p>
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
