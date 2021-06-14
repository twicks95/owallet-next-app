import Cookie from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import { authorizationPage } from "middleware/authorizationPage";
import axiosApiInstances from "utils/axios";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import PageNav from "components/module/PageNav";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  IconContext,
  NotePencil,
  PencilSimple,
} from "phosphor-react";
import styles from "styles/Profile.module.css";
import { Alert, Button, Modal } from "react-bootstrap";

export async function getServerSideProps(context) {
  const data = await authorizationPage(context);
  const res = await axiosApiInstances
    .get(`user/${data.userId}`)
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

export default function Profile(props) {
  const router = useRouter();
  const { user_id, user_image, user_name, user_phone } = props.user;

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState(user_name);
  const [smShow, setSmShow] = useState(false);
  const [phone, setPhone] = useState(user_phone);
  const [imageError, setImageError] = useState(false);
  const [imageSuccess, setImageSuccess] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const [changePhone, setChangePhone] = useState(false);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setSmShow(true);
  };
  const handleUploadImage = (id, data) => {
    const formData = new FormData();
    for (const field in data) {
      formData.append(field, data[field]);
    }
    axiosApiInstances
      .patch(`user/update/image/${id}`, formData)
      .then((res) => {
        setSmShow(false);
        setImageSuccess(true);
        setImage(null);
        router.push(`/profile/${id}`);
      })
      .catch((err) => {
        setMessage(err.response.data.msg);
        setImageError(true);
      });
  };

  const handleUpdateName = (id, userName) => {
    axiosApiInstances
      .patch(`user/update/name/${id}`, { userName })
      .then((res) => {
        router.push(`/profile/${id}`);
      });
  };
  const handleUpdatePhone = (id, userPhone) => {
    axiosApiInstances
      .patch(`user/update/phone/${id}`, { userPhone })
      .then((res) => {
        router.push(`/profile/${id}`);
      });
  };

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("userId");
    router.push("/login");
  };

  return (
    <Layout title="Profile">
      <Navbar user={props.user} />
      <Modal
        size="sm"
        show={smShow}
        onHide={() => {
          setSmShow(false);
          setImage(null);
          setImageError(false);
        }}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">
            Change Picture
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-start">
          Sure want to change your profile picture?
          {imageError && (
            <Alert variant="danger" className="mt-4">
              {message}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ height: "36px", padding: "0px 10%" }}
            variant="light"
            onClick={() => {
              setSmShow(false);
              setImage(null);
              setImageError(false);
            }}
          >
            Close
          </Button>
          <Button
            style={{ height: "36px", padding: "0px 10%" }}
            variant="primary"
            onClick={() => handleUploadImage(user_id, { image })}
          >
            Change
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={`container-fluid ${styles.outerContainer}`}>
        <div className="row row-cols-1 row-cols-md-2 h-100 gy-3 gy-md-0">
          <div className={`col-md-3 ${styles.navSide}`}>
            <PageNav user={props.user} page="profile" />
          </div>
          <div className={`col-md-9 ${styles.profileSide}`}>
            <IconContext.Provider
              value={{
                color: "#7A7886",
                size: "1.2em",
                weight: "bold",
                mirrored: false,
              }}
            >
              <div
                className={`d-flex flex-column align-items-center ${styles.profileContainer}`}
              >
                <div className="d-flex flex-column align-items-center mb-3">
                  <img
                    src={
                      user_image
                        ? `http://localhost:3004/api/${user_image}`
                        : "/default-img-placeholder.png"
                    }
                    className={styles.avatar}
                    alt="user avatar"
                  />
                  <input
                    type="file"
                    id="image"
                    className={styles.input}
                    onChange={(e) => handleImage(e)}
                  />
                  <label
                    htmlFor="image"
                    className={`d-flex align-items-center ${styles.edit}`}
                  >
                    <PencilSimple className={`me-1 ${styles.pencil}`} />
                    Change
                  </label>
                </div>
                <div
                  className={`d-flex justify-content-center align-items-center position-relative w-50 ${styles.name}`}
                >
                  {!changeName ? (
                    <>
                      <h1>{user_name}</h1>
                      <NotePencil
                        color={"#a09daf"}
                        className={`${styles.notePencil}`}
                        onClick={() => setChangeName(true)}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <CheckCircle
                        color={"#1EC15F"}
                        className={`${styles.checkCircle}`}
                        onClick={() => {
                          setChangeName(false);
                          handleUpdateName(user_id, name);
                        }}
                      />
                    </>
                  )}
                </div>
                <div
                  className={`d-flex justify-content-center align-items-center position-relative w-50 ${styles.phone}`}
                >
                  {!changePhone ? (
                    <>
                      <h3>+62 {user_phone.substr(1)}</h3>
                      <NotePencil
                        color={"#a09daf"}
                        className={`${styles.notePencil}`}
                        onClick={() => setChangePhone(true)}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <CheckCircle
                        color={"#1EC15F"}
                        className={`${styles.checkCircle}`}
                        onClick={() => {
                          setChangePhone(false);
                          handleUpdatePhone(user_id, phone);
                        }}
                      />
                    </>
                  )}
                </div>
                <ul className="mt-5">
                  <li
                    className={`d-flex align-items-center justify-content-between`}
                    onClick={() => router.push(`/profile/personal-info`)}
                  >
                    Personal Information <ArrowRight />
                  </li>
                  <li
                    className={`d-flex align-items-center justify-content-between`}
                    onClick={() => router.push("/profile/change-password")}
                  >
                    Change Password <ArrowRight />
                  </li>
                  <li
                    className={`d-flex align-items-center justify-content-between`}
                    onClick={() => router.push("/profile/change-pin")}
                  >
                    Change Pin <ArrowRight />
                  </li>
                  <li
                    className={`d-flex align-items-center justify-content-between`}
                    onClick={handleLogout}
                  >
                    Logout <ArrowRight />
                  </li>
                </ul>
              </div>
            </IconContext.Provider>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
