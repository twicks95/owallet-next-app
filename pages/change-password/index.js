import { useState } from "react";
import axiosApiInstances from "../../utils/axios";
import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";
import Footer from "../../components/module/Footer";
import PageNav from "../../components/module/PageNav";
import { authorizationPage } from "../../middleware/authorizationPage";
import {
  CheckCircle,
  Eye,
  EyeSlash,
  IconContext,
  LockSimple,
  WarningCircle,
} from "phosphor-react";
import styles from "../../styles/ChangePassword.module.css";

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
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [incorrectCurrentPass, setIncorrectCurrentPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [notMatch, setNotMatch] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user_id } = props.data.data[0];

  const handleText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangePassword = (e, id) => {
    e.preventDefault();
    setIncorrectCurrentPass(false);
    setNotMatch(false);
    setSuccess(false);

    if (form.newPassword === form.confirmPassword) {
      setLoading(true);
      window.setTimeout(() => {
        axiosApiInstances
          .patch(`user/password/update/${id}`, form)
          .then((res) => {
            setSuccess(true);
            setMessage("Success... Your old password has just been changed.");
          })
          .catch((err) => {
            setIncorrectCurrentPass(true);
            setMessage(err.response.data.msg);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 2000);
    } else {
      setNotMatch(true);
      setMessage("New and confirm password didn't match!");
    }
  };

  return (
    <Layout title="Change Password">
      <Navbar data={props.data} />
      <IconContext.Provider
        value={{
          color: "rgba(169, 169, 169, 0.8)",
          size: "1.2em",
          weight: "bold",
          mirrored: false,
        }}
      >
        <div className={`container-fluid ${styles.outerContainer}`}>
          <div className="row row-cols-1 row-cols-md-2 h-100">
            <div className={`col-md-3 ${styles.navSide}`}>
              <PageNav data={props.data} page="profile" />
            </div>
            <div className={`col-md-9 ${styles.changePasswordSide}`}>
              <div className={`${styles.changePasswordContainer}`}>
                <div className={`text-start ${styles.headDesc}`}>
                  <h5>Change Password</h5>
                  <p>
                    You must enter your current password and then type your new
                    password twice.
                  </p>
                </div>
                <div className={`${styles.form}`}>
                  {notMatch || incorrectCurrentPass || success ? (
                    <div
                      className={`alert ${
                        notMatch
                          ? "alert-warning"
                          : incorrectCurrentPass
                          ? "alert-danger"
                          : "alert-success"
                      } mb-5`}
                      role="alert"
                    >
                      <IconContext.Provider
                        value={{
                          color: `${
                            notMatch
                              ? "#664D03"
                              : incorrectCurrentPass
                              ? "#842029"
                              : "#215132"
                          }`,
                          size: "1.7em",
                          weight: "bold",
                          mirrored: false,
                        }}
                      >
                        {success ? (
                          <CheckCircle className="mb-2" />
                        ) : (
                          <WarningCircle className="mb-2" />
                        )}
                      </IconContext.Provider>
                      <div>{message}</div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <form
                    className={`my-5 p-0 ${styles.formContainer}`}
                    onSubmit={(e) => handleChangePassword(e, user_id)}
                  >
                    <div className={`mb-5 ${styles.inputGroup}`}>
                      <label
                        className={`m-0 form-label ${
                          form.currentPassword && styles.moveLabel
                        } ${styles.nameLabel}`}
                        for="current-password"
                      >
                        Current Password
                      </label>
                      <IconContext.Provider
                        value={{
                          color: `${
                            form.currentPassword
                              ? "#6379f4"
                              : "rgba(169, 169, 169, 0.8)"
                          }`,
                          size: "1.2em",
                          weight: "bold",
                          mirrored: false,
                        }}
                      >
                        <LockSimple className={`${styles.lock}`} />
                      </IconContext.Provider>
                      {showCurrentPassword ? (
                        <EyeSlash
                          className={`${styles.eyeSlash}`}
                          onClick={() => setShowCurrentPassword(false)}
                        />
                      ) : (
                        <Eye
                          className={`${styles.eye}`}
                          onClick={() => setShowCurrentPassword(true)}
                        />
                      )}
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        id="current-password"
                        className={`form-control shadow-none name-input ${styles.nameInput}`}
                        name="currentPassword"
                        onChange={(e) => handleText(e)}
                      />
                    </div>
                    <div className={`mb-5 ${styles.inputGroup}`}>
                      <label
                        className={`m-0 form-labe ${
                          form.newPassword && styles.moveLabel
                        } ${styles.emailLabel}`}
                        for="new-password"
                      >
                        New Password
                      </label>
                      <IconContext.Provider
                        value={{
                          color: `${
                            form.newPassword
                              ? "#6379f4"
                              : "rgba(169, 169, 169, 0.8)"
                          }`,
                          size: "1.2em",
                          weight: "bold",
                          mirrored: false,
                        }}
                      >
                        <LockSimple className={`${styles.lock}`} />
                      </IconContext.Provider>
                      {showNewPassword ? (
                        <EyeSlash
                          className={`${styles.eyeSlash}`}
                          onClick={() => setShowNewPassword(false)}
                        />
                      ) : (
                        <Eye
                          className={`${styles.eye}`}
                          onClick={() => setShowNewPassword(true)}
                        />
                      )}
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="new-password"
                        className={`form-control shadow-none email-input ${styles.emailInput}`}
                        name="newPassword"
                        onChange={(e) => handleText(e)}
                      />
                    </div>
                    <div
                      style={{ marginBottom: "90px" }}
                      className={`${styles.inputGroup}`}
                    >
                      <label
                        className={`m-0 form-label ${
                          form.confirmPassword && styles.moveLabel
                        } ${styles.passwordLabel}`}
                        for="confirm-password"
                      >
                        Confirm Password
                      </label>
                      <IconContext.Provider
                        value={{
                          color: `${
                            form.confirmPassword
                              ? "#6379f4"
                              : "rgba(169, 169, 169, 0.8)"
                          }`,
                          size: "1.2em",
                          weight: "bold",
                          mirrored: false,
                        }}
                      >
                        <LockSimple className={`${styles.lock}`} />
                      </IconContext.Provider>
                      {showConfirmPassword ? (
                        <EyeSlash
                          className={`${styles.eyeSlash}`}
                          onClick={() => setShowConfirmPassword(false)}
                        />
                      ) : (
                        <Eye
                          className={`${styles.eye}`}
                          onClick={() => setShowConfirmPassword(true)}
                        />
                      )}
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        className={`form-control shadow-none password-input ${styles.passwordInput}`}
                        name="confirmPassword"
                        onChange={(e) => handleText(e)}
                      />
                    </div>
                    {!form.currentPassword ||
                    !form.newPassword ||
                    !form.confirmPassword ? (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled
                      >
                        Change Password
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
                        Change Password
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IconContext.Provider>
      <Footer />
    </Layout>
  );
}
