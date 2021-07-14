import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authorizationPage } from "middleware/authorizationPage";
import axiosApiInstances from "utils/axios";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import PageNav from "components/module/PageNav";
import styles from "styles/InputAmount.module.css";
import { PencilSimple, IconContext } from "phosphor-react";
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
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState();
  const [receiver, setReceiver] = useState({});
  const { balance } = props.user;
  const { receiverId } = router.query;

  useEffect(() => {
    axiosApiInstances.get(`user/${receiverId}`).then((res) => {
      setReceiver(res.data.data[0]);
    });
  }, []);

  const handleContinue = (id, amount, note) => {
    router.push(
      `/transfer/confirmation?receiverId=${id}&amount=${amount}&note=${note}`
    );
  };

  return (
    <Layout title="Input Amount">
      <Navbar user={props.user} />
      <div className={`container-fluid ${styles.outerContainer}`}>
        <div className="row row-cols-1 row-cols-md-2 h-100 gy-3 gy-md-0">
          <div className={`col-md-3 ${styles.navSide}`}>
            <PageNav user={props.user} page="transfer" />
          </div>
          <div className={`col-md-9 ${styles.personalInfoSide}`}>
            <div className={`text-start ${styles.transferAmountContainer}`}>
              <h5>Transfer Money</h5>
              <div
                className={`d-flex align-items-center justify-content-between ${styles.list}`}
              >
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
              <p>
                Type the amount you want to transfer and then press continue to
                the next steps.
              </p>
              <div className={`${styles.inputAmountContainer}`}>
                <input
                  type="text"
                  placeholder="0.00"
                  pattern="[0-9]"
                  maxLength="10"
                  title="Maximum 9.999.999.999"
                  className={styles.amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <span className={styles.balance}>
                  Rp{balance.toLocaleString("id-ID")} Available
                </span>
                <div className={styles.inputGroup}>
                  <IconContext.Provider
                    value={{
                      color: "rgba(169, 169, 169, 0.6)",
                      size: "1.2em",
                      weight: "bold",
                      mirrored: false,
                    }}
                  >
                    <PencilSimple className={styles.pencilSimple} />
                  </IconContext.Provider>
                  <input
                    type="text"
                    placeholder="Add some notes"
                    className={styles.note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-100 text-end">
                {amount <= balance && amount != 0 ? (
                  <Button
                    variant="primary"
                    onClick={() => handleContinue(receiverId, amount, note)}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button variant="primary" disabled>
                    Continue
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
