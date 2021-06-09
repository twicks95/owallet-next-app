import { useState } from "react";
import axiosApiInstances from "../../utils/axios";
import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";
import Footer from "../../components/module/Footer";
import PageNav from "../../components/module/PageNav";
import { authorizationPage } from "../../middleware/authorizationPage";
import styles from "../../styles/ChangePin.module.css";

export async function getServerSideProps(context) {
  const data = await authorizationPage(context);
  const res = await axiosApiInstances
    .get(`user/${data.userId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return [];
    });
  return {
    props: { data: res },
  };
}

export default function ChangePassword(props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const { user_id } = props.data.data[0];

  const [pin, setPin] = useState({});

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

  const handleCreatePin = (e) => {
    e.preventDefault();
    setLoading(true);
    const allPin =
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;

    window.setTimeout(() => {
      axiosApiInstances
        .patch(`auth/pin/create/${props.userId}`, { userPin: allPin })
        .then((res) => {
          router.push("/");
        })
        .catch((err) => {
          console.log(err.response);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  };

  return (
    <Layout title="Change Pin">
      <Navbar data={props.data} />
      <div className={`container-fluid ${styles.outerContainer}`}>
        <div className="row row-cols-1 row-cols-md-2 h-100">
          <div className={`col-md-3 ${styles.navSide}`}>
            <PageNav data={props.data} page="profile" />
          </div>
          <div className={`col-md-9 ${styles.changePasswordSide}`}>
            <div className={`${styles.changePinContainer}`}>
              <div className={`text-start ${styles.headDesc}`}>
                <h5>Change PIN</h5>
                <p>
                  Enter your current 6 digits Zwallet PIN below to continue to
                  the next steps.
                </p>
              </div>
              <div className={`${styles.form}`}>
                <form
                  className={`my-5 p-0 ${styles.formContainer}`}
                  onSubmit={handleCreatePin}
                >
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
                      Continue
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
                      Continue
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
