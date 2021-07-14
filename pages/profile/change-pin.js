import { useState } from "react";
import { useRouter } from "next/router";
import { authorizationPage } from "middleware/authorizationPage";
import axiosApiInstances from "utils/axios";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import PageNav from "components/module/PageNav";
import styles from "styles/ChangePin.module.css";
import { IconContext, WarningCircle, Info } from "phosphor-react";

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

export default function ChangePassword(props) {
  const { user_id, user_pin } = props.user;
  const [pin, setPin] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changePin, setChangePin] = useState(false);
  const [incorrectPin, setIncorrectPin] = useState(false);
  const router = useRouter();

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

  const handleContinue = (e, currentPin) => {
    e.preventDefault();
    const allPin =
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;

    axiosApiInstances
      .post("auth/check/pin", {
        pin: allPin,
        userPin: currentPin,
      })
      .then((res) => {
        setPin({ pin1: "", pin2: "", pin3: "", pin4: "", pin5: "", pin6: "" });
        setIncorrectPin(false);
        setChangePin(true);
      })
      .catch((err) => {
        setIncorrectPin(true);
        setMessage("Incorrect current PIN!");
      });
  };

  const handleUpdatePin = (e, id) => {
    e.preventDefault();
    setLoading(true);
    setChangePin(false);
    const allPin =
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;

    window.setTimeout(() => {
      axiosApiInstances
        .patch(`auth/pin/create/${id}`, { userPin: allPin })
        .then((res) => {
          setPin({
            pin1: "",
            pin2: "",
            pin3: "",
            pin4: "",
            pin5: "",
            pin6: "",
          });
          setSuccess(true);
          setMessage(
            "Success... Your PIN has changed. The page will redirect you to profile in 3 seconds."
          );
          window.setTimeout(() => {
            router.push(`/profile/${id}`);
          }, 3000);
        })
        .catch((err) => {
          window.alert(err.response.msg);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  };

  return (
    <Layout title="Change Pin">
      <Navbar user={props.user} />
      <div className={`container-fluid ${styles.outerContainer}`}>
        <div className="row row-cols-1 row-cols-md-2 h-100 gy-3 gy-md-0">
          <div className={`col-md-3 ${styles.navSide}`}>
            <PageNav user={props.user} page="profile" />
          </div>
          <div className={`col-md-9 ${styles.changePasswordSide}`}>
            <div className={`${styles.changePinContainer}`}>
              <div className={`text-start ${styles.headDesc}`}>
                <h5>Change PIN</h5>
                {changePin && (
                  <div
                    className={`alert alert-info d-flex align-items-center`}
                    role="alert"
                  >
                    <IconContext.Provider
                      value={{
                        color: "#055160",
                        size: "1.7em",
                        weight: "bold",
                        mirrored: false,
                      }}
                    >
                      <Info className="me-2" />
                    </IconContext.Provider>
                    <div>You can change your PIN...</div>
                  </div>
                )}
                <p>
                  {changePin
                    ? "Type your new 6 digits security PIN to use in Zwallet."
                    : "Enter your current 6 digits Zwallet PIN below to continue to the next steps"}
                </p>
              </div>
              <div className={`${styles.form}`}>
                {incorrectPin && (
                  <div
                    className={`alert alert-danger d-flex align-items-center`}
                    role="alert"
                  >
                    <IconContext.Provider
                      value={{
                        color: "#842029",
                        size: "1.7em",
                        weight: "bold",
                        mirrored: false,
                      }}
                    >
                      <WarningCircle className="me-2" />
                    </IconContext.Provider>
                    <div>{message}</div>
                  </div>
                )}
                {success && (
                  <div className={`alert alert-success`} role="alert">
                    <IconContext.Provider
                      value={{
                        color: "#215132",
                        size: "1.7em",
                        weight: "bold",
                        mirrored: false,
                      }}
                    >
                      <WarningCircle className="mb-2" />
                    </IconContext.Provider>
                    <div>{message}</div>
                  </div>
                )}
                <form
                  className={`my-5 p-0 ${styles.formContainer}`}
                  onSubmit={
                    changePin
                      ? (e) => handleUpdatePin(e, user_id)
                      : (e) => handleContinue(e, user_pin)
                  }
                >
                  <div className={styles.inputs}>
                    <input
                      type="text"
                      name="1"
                      id="pin-1"
                      maxLength="1"
                      value={pin.pin1}
                      onChange={(e) => changeText(e)}
                    />
                    <input
                      type="text"
                      name="2"
                      id="pin-2"
                      maxLength="1"
                      value={pin.pin2}
                      onChange={(e) => changeText(e)}
                    />
                    <input
                      type="text"
                      name="3"
                      id="pin-3"
                      maxLength="1"
                      value={pin.pin3}
                      onChange={(e) => changeText(e)}
                    />
                    <input
                      type="text"
                      name="4"
                      id="pin-4"
                      maxLength="1"
                      value={pin.pin4}
                      onChange={(e) => changeText(e)}
                    />
                    <input
                      type="text"
                      name="5"
                      id="pin-5"
                      maxLength="1"
                      value={pin.pin5}
                      onChange={(e) => changeText(e)}
                    />
                    <input
                      type="text"
                      name="6"
                      id="pin-6"
                      maxLength="1"
                      value={pin.pin6}
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
                      {changePin ? "Change PIN" : "Continue"}
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
                      {changePin ? "Change PIN" : "Continue"}
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
