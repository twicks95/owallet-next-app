import Cookie from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import axiosApiInstances from "../../utils/axios";
import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";
import Footer from "../../components/module/Footer";
import PageNav from "../../components/module/PageNav";
import { ArrowRight, IconContext, PencilSimple } from "phosphor-react";
import { authorizationPage } from "../../middleware/authorizationPage";
import styles from "../../styles/Profile.module.css";
import { Alert, Button, Modal } from "react-bootstrap";

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

export default function Profile(props) {
  const router = useRouter();
  const { user_id, user_image, user_name, user_phone } = props.data.data[0];
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [imageSuccess, setImageSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);

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
      .patch(`user/update/image/${user_id}`, formData)
      .then((res) => {
        console.log(res);
        setSmShow(false);
        setImageSuccess(true);
        setImage(null);
        router.push(`/profile/${user_id}`);
      })
      .catch((err) => {
        setMessage(err.response.data.msg);
        setImageError(true);
      });
  };

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("userId");
    router.push("/login");
  };

  return (
    <Layout title="Profile">
      <Navbar data={props.data} />
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
        <div className="row row-cols-1 row-cols-md-2 h-100">
          <div className={`col-md-3 ${styles.navSide}`}>
            <PageNav data={props.data} page="profile" />
          </div>
          <div className={`col-md-9 ${styles.profileSide}`}>
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
                  for="image"
                  className={`d-flex align-items-center ${styles.edit}`}
                >
                  <IconContext.Provider
                    value={{
                      color: "#7A7886",
                      size: "1.2em",
                      weight: "bold",
                      mirrored: false,
                    }}
                  >
                    <PencilSimple className={`me-1 ${styles.pencil}`} />
                  </IconContext.Provider>
                  Change
                </label>
              </div>
              <h1>{user_name}</h1>
              <h3>+62 {user_phone}</h3>
              <ul className="mt-5">
                <li
                  className={`d-flex align-items-center justify-content-between`}
                  onClick={() => router.push(`/personal-info/${user_id}`)}
                >
                  Personal Information <ArrowRight />
                </li>
                <li
                  className={`d-flex align-items-center justify-content-between`}
                  onClick={() => router.push("/change-password")}
                >
                  Change Password <ArrowRight />
                </li>
                <li
                  className={`d-flex align-items-center justify-content-between`}
                  onClick={() => router.push("/change-pin")}
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
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
