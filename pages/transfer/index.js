import { useState } from "react";
import axiosApiInstances from "../../utils/axios";
import Layout from "../../components/Layout";
import styles from "../../styles/Transfer.module.css";
import Navbar from "../../components/module/Navbar";
import Footer from "../../components/module/Footer";
import PageNav from "../../components/module/PageNav";
import { MagnifyingGlass } from "phosphor-react";
import { authorizationPage } from "../../middleware/authorizationPage";

export async function getServerSideProps(context) {
  const data = await authorizationPage(context);
  const res = await axiosApiInstances
    .get(`user/${data.userId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  return {
    props: { data: res },
  };
}

export default function Transfer(props) {
  const [phone, setPhone] = useState("");

  const handleSearch = (data) => {
    // console.log({ userPhone: phone });
    axiosApiInstances
      .get(`user?userPhone=${data}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  console.log(phone);

  return (
    <Layout title="Transfer">
      <Navbar data={props.data} />
      <div className={`container-fluid ${styles.outerContainer}`}>
        <div className="row row-cols-1 row-cols-md-2 h-100">
          <div className={`col-md-3 ${styles.navSide}`}>
            <PageNav data={props.data} page="transfer" />
          </div>
          <div className={`col-md-9 ${styles.personalInfoSide}`}>
            <div className={`text-start ${styles.searchReceiverContainer}`}>
              <div className={`${styles.searchGroup}`}>
                <MagnifyingGlass className={`${styles.magnifyingGlass}`} />
                <input
                  type="text"
                  name="userPhone"
                  placeholder="Search receiver here..."
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyUp={(e) => e.key === "Enter" && handleSearch(phone)}
                />
              </div>
              <div className={styles.receiverLists}>
                <div
                  className={`d-flex align-items-center justify-content-between ${styles.list}`}
                >
                  <div className="d-flex text-start">
                    <img src="/user2.png" className="me-2" />
                    <div className="d-flex flex-column justify-content-center">
                      <h5 className="m-0">Samuel Umtiti</h5>
                      <span>+62 813-8492-9994</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`d-flex align-items-center justify-content-between ${styles.list}`}
                >
                  <div className="d-flex text-start">
                    <img src="/user2.png" className="me-2" />
                    <div className="d-flex flex-column justify-content-center">
                      <h5 className="m-0">Samuel Umtiti</h5>
                      <span>+62 813-8492-9994</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`d-flex align-items-center justify-content-between ${styles.list}`}
                >
                  <div className="d-flex text-start">
                    <img src="/user2.png" className="me-2" />
                    <div className="d-flex flex-column justify-content-center">
                      <h5 className="m-0">Samuel Umtiti</h5>
                      <span>+62 813-8492-9994</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`d-flex align-items-center justify-content-between ${styles.list}`}
                >
                  <div className="d-flex text-start">
                    <img src="/user2.png" className="me-2" />
                    <div className="d-flex flex-column justify-content-center">
                      <h5 className="m-0">Samuel Umtiti</h5>
                      <span>+62 813-8492-9994</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`d-flex align-items-center justify-content-between ${styles.list}`}
                >
                  <div className="d-flex text-start">
                    <img src="/user2.png" className="me-2" />
                    <div className="d-flex flex-column justify-content-center">
                      <h5 className="m-0">Samuel Umtiti</h5>
                      <span>+62 813-8492-9994</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`d-flex align-items-center justify-content-between ${styles.list}`}
                >
                  <div className="d-flex text-start">
                    <img src="/user2.png" className="me-2" />
                    <div className="d-flex flex-column justify-content-center">
                      <h5 className="m-0">Samuel Umtiti</h5>
                      <span>+62 813-8492-9994</span>
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
