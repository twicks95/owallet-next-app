import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authorizationPage } from "middleware/authorizationPage";
import axiosApiInstances from "utils/axios";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import PageNav from "components/module/PageNav";
import styles from "styles/Confirmation.module.css";
import { Button, Modal } from "react-bootstrap";
import { WarningCircle } from "phosphor-react";
import moment from "moment";

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

export default function PersonalInfo(props) {
  const router = useRouter();
  const { balance, user_id, user_pin } = props.user;
  const { receiverId, amount, note } = router.query;

  const [pin, setPin] = useState({});
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorPin, setErrorPin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const date = new Date(Date.now());

  useEffect(() => {
    axiosApiInstances.get(`user/${receiverId}`).then((res) => {
      setReceiver(res.data.data[0]);
    });
  }, []);

  const changeText = (event) => {
    if (event.target.value) {
      const nextSibling = document.getElementById(
        `pin-${parseInt(event.target.name, 10) + 1}`
      );

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }
    setPin({ ...pin, [`pin${event.target.name}`]: event.target.value });
  };

  const handleContinue = () => {
    setLoading(false);
    setShowModal(true);
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    setErrorPin(false);
    setLoading(true);
    const allPin =
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;

    axiosApiInstances
      .post("auth/check/pin", {
        pin: allPin,
        userPin: user_pin,
      })
      .then((res) => {
        const data = {
          receiverId: receiverId,
          senderId: user_id,
          amount,
          notes: note,
        };
        axiosApiInstances.post("transaction", data).then((res) => {
          router.push(
            `/transfer/status?receiverId=${receiverId}&amount=${amount}&note=${note}`
          );
        });
      })
      .catch(() => {
        setErrorPin(true);
        setLoading(false);
        setMessage("Cannot proceed the transfer. Incorrect PIN!");
      });
  };

  return (
    <Layout title="Confirmation">
      <Navbar user={props.user} />
      <Modal
        size="md"
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setPin({});
        }}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">
            Enter PIN to Transfer
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-start">
          Enter your 6 digits PIN for confirmation to continue transferring
          money.
          <form
            className={`my-5 p-0 ${styles.formContainer}`}
            onSubmit={(e) => handleTransfer(e)}
          >
            {errorPin && (
              <div
                className={`alert alert-danger d-flex align-items-center`}
                role="alert"
              >
                <WarningCircle color="#842029" className="me-2" />
                <div>{message}</div>
              </div>
            )}
            <div className={styles.inputs}>
              <input
                type="text"
                name="1"
                id="pin-1"
                maxLength="1"
                onChange={(e) => changeText(e)}
              />
              <input
                type="text"
                name="2"
                id="pin-2"
                maxLength="1"
                onChange={(e) => changeText(e)}
              />
              <input
                type="text"
                name="3"
                id="pin-3"
                maxLength="1"
                onChange={(e) => changeText(e)}
              />
              <input
                type="text"
                name="4"
                id="pin-4"
                maxLength="1"
                onChange={(e) => changeText(e)}
              />
              <input
                type="text"
                name="5"
                id="pin-5"
                maxLength="1"
                onChange={(e) => changeText(e)}
              />
              <input
                type="text"
                name="6"
                id="pin-6"
                maxLength="1"
                onChange={(e) => changeText(e)}
              />
            </div>

            {!pin.pin1 ||
            !pin.pin2 ||
            !pin.pin3 ||
            !pin.pin4 ||
            !pin.pin5 ||
            !pin.pin6 ? (
              <button
                type="submit"
                className="btn btn-primary self-column"
                disabled
              >
                Transfer money
              </button>
            ) : loading ? (
              <button
                className="btn btn-primary d-flex align-items-center justify-content-center"
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
              <button type="submit" className="btn btn-primary">
                Transfer money
              </button>
            )}
          </form>
        </Modal.Body>
      </Modal>
      <div className={`container-fluid ${styles.outerContainer}`}>
        <div className="row row-cols-1 row-cols-md-2 h-100 gy-3 gy-md-0">
          <div className={`col-md-3 ${styles.navSide}`}>
            <PageNav user={props.user} page="transfer" />
          </div>
          <div className={`col-md-9`}>
            <div className={`text-start ${styles.transferDetailContainer}`}>
              <h5>Transfer To</h5>
              <div
                className={`d-flex align-items-center justify-content-between ${styles.receiver}`}
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
              <h5>Details</h5>
              <div
                className={`d-flex align-items-center justify-content-between ${styles.detailList}`}
              >
                <div>
                  <p>Amount</p>
                  <span>Rp{parseInt(amount).toLocaleString("id-ID")}</span>
                </div>
              </div>
              <div
                className={`d-flex align-items-center justify-content-between ${styles.detailList}`}
              >
                <div>
                  <p>Balance Left</p>
                  <span>Rp{(balance - amount).toLocaleString("id-ID")}</span>
                </div>
              </div>
              <div
                className={`d-flex align-items-center justify-content-between ${styles.detailList}`}
              >
                <div>
                  <p>Date {"&"} Time</p>
                  <span>{moment(date).format("lll")}</span>
                </div>
              </div>
              <div
                className={`d-flex align-items-center justify-content-between ${styles.detailList}`}
              >
                <div>
                  <p>Notes</p>
                  <span>{note ? note : "-"}</span>
                </div>
              </div>
              <div className="w-100 text-end">
                <Button variant="primary" onClick={handleContinue}>
                  Continue
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
