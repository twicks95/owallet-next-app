import { authorizationPage } from "middleware/authorizationPage";
import axiosApiInstances from "utils/axios";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import PageNav from "components/module/PageNav";
import styles from "styles/Topup.module.css";

export async function getServerSideProps(context) {
  const data = await authorizationPage(context);
  const authorization = { Authorization: `Bearer ${data.token} || ""` };
  const res = await axiosApiInstances
    .get(`user/${data.userId}`, { headers: authorization })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  return {
    props: { user: res[0] },
  };
}

export default function Topup(props) {
  return (
    <Layout title="Topup">
      <Navbar user={props.user} />
      <div className={`container-fluid ${styles.outerContainer}`}>
        <div className="row row-cols-1 row-cols-md-2 h-100 gy-3 gy-md-0">
          <div className={`col-md-3 ${styles.navSide}`}>
            <PageNav user={props.user} page="transfer" />
          </div>
          <div className="col-md-9">
            <div className={styles.contentSide}>
              <h1>How To Top Up</h1>
              <div className={styles.list}>
                <div className="d-flex align-items-center text-start">
                  <span>1</span>
                  <p className="m-0">
                    Go to the nearest ATM or you can use E-Banking.
                  </p>
                </div>
              </div>
              <div className={styles.list}>
                <div className="d-flex align-items-center text-start">
                  <span>2</span>
                  <p className="m-0">
                    Type your security number on the ATM or E-Banking.
                  </p>
                </div>
              </div>
              <div className={styles.list}>
                <div className="d-flex align-items-center text-start">
                  <span>3</span>
                  <p className="m-0">Select “Transfer” in the menu</p>
                </div>
              </div>
              <div className={styles.list}>
                <div className="d-flex align-items-center text-start">
                  <span>4</span>
                  <p className="m-0">
                    Type the virtual account number that we provide you at the
                    top.
                  </p>
                </div>
              </div>
              <div className={styles.list}>
                <div className="d-flex align-items-center text-start">
                  <span>5</span>
                  <p className="m-0">
                    Type the amount of the money you want to top up.
                  </p>
                </div>
              </div>
              <div className={styles.list}>
                <div className="d-flex align-items-center text-start">
                  <span>6</span>
                  <p className="m-0">Read the summary details</p>
                </div>
              </div>
              <div className={styles.list}>
                <div className="d-flex align-items-center text-start">
                  <span>7</span>
                  <p className="m-0">Press transfer / top up</p>
                </div>
              </div>
              <div className={styles.list}>
                <div className="d-flex align-items-center text-start">
                  <span>8</span>
                  <p className="m-0">
                    You can see your money in Owallet within 3 hours.
                  </p>
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
