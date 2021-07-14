import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authorizationPage } from "middleware/authorizationPage";
import axiosApiInstances from "utils/axios";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import PageNav from "components/module/PageNav";
import styles from "styles/TransferStatus.module.css";
import { CheckCircle, DownloadSimple, ShareNetwork } from "phosphor-react";
import moment from "moment";
import { Button } from "react-bootstrap";

export async function getServerSideProps(context) {
  const data = await authorizationPage(context);
  const authorization = { Authorization: `Bearer ${data.token} || ""` };
  const res = await axiosApiInstances
    .get(`user/${data.userId}`, { headers: authorization })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return [];
    });
  return {
    props: { user: res[0] },
  };
}

export default function PersonalInfo(props) {
  const router = useRouter();
  const { balance, user_id } = props.user;
  const { receiverId, amount, note } = router.query;
  const [receiver, setReceiver] = useState({});
  const date = new Date(Date.now());

  useEffect(() => {
    axiosApiInstances.get(`user/${receiverId}`).then((res) => {
      setReceiver(res.data.data[0]);
    });
  }, []);

  return (
    <Layout title="Transfer Status">
      <Navbar user={props.user} />
      <div className={`container-fluid ${styles.outerContainer}`}>
        <div className="row row-cols-1 row-cols-md-2 h-100 gy-3 gy-md-0">
          <div className={`col-md-3 ${styles.navSide}`}>
            <PageNav user={props.user} page="transfer" />
          </div>
          <div className={`col-md-9`}>
            <div className={`${styles.transferDetailContainer}`}>
              <CheckCircle
                weight={"fill"}
                size="70"
                color="#1EC15F"
                style={{ textAlign: "center" }}
              />
              <span
                style={{
                  margin: "0px",
                  fontSize: "22px",
                  fontWeight: "700",
                  margin: "30px 0 40px 0",
                }}
              >
                Transfer Success
              </span>
              <div className={`${styles.detailList}`}>
                <p>Amount</p>
                <span>Rp{parseInt(amount).toLocaleString("id-ID")}</span>
              </div>
              <div className={`${styles.detailList}`}>
                <p>Balance Left</p>
                <span>Rp{balance.toLocaleString("id-ID")}</span>
              </div>
              <div className={`${styles.detailList}`}>
                <p>Date {"&"} Time</p>
                <span>{moment(date).format("lll")}</span>
              </div>
              <div className={`${styles.detailList}`}>
                <p>Notes</p>
                <span>{note ? note : "-"}</span>
              </div>
              <div className={`${styles.receiver}`}>
                <div className="d-flex text-start">
                  <img
                    src={
                      receiver.user_image
                        ? `${process.env.API_IMG_URL}/${receiver.user_image}`
                        : "/default-img-placeholder.png"
                    }
                    className="me-2"
                  />
                  <div className="d-flex flex-column justify-content-center">
                    <h6 className="m-0">{receiver.user_name}</h6>
                    <span>{receiver.user_phone}</span>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-end mt-5 gap-2 gap-lg-4 w-100">
                <Button variant="secondary" className={styles.secondaryAction}>
                  <ShareNetwork />
                </Button>
                <Button
                  variant="secondary"
                  className={`d-flex align-items-center ${styles.secondaryAction}`}
                >
                  <DownloadSimple className={styles.downloadIcon} />
                  Download PDF
                </Button>
                <Button
                  variant="primary"
                  onClick={() => router.push("/dashboard")}
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
