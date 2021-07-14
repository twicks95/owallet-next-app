import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authorizationPage } from "middleware/authorizationPage";
import axiosApiInstances from "utils/axios";
import Layout from "components/Layout";
import styles from "styles/Transfer.module.css";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import PageNav from "components/module/PageNav";
import { MagnifyingGlass } from "phosphor-react";
import { connect } from "react-redux";
import { getUser } from "redux/actions/userData";
import Cookies from "js-cookie";

export const getStaticPaths = async () => {
  const res = await axiosApiInstances
    .get("user/all?limit=1000")
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return [];
    });

  const paths = res.map((item) => ({
    query: {
      userPhone: `${item.user_phone}`,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ query }) => {
  // await authorizationPage(context);
  const users = await axiosApiInstances
    .get(`user/phone?userPhone=${query.phone}`)
    .then((res) => {
      console.log(res.data.data);
      // return res.data.data;
    })
    .catch(() => {
      return [];
    });

  return {
    props: {},
  };
};

const Transfer = (props) => {
  const router = useRouter();
  const userId = Cookies.get("userId");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState("");
  const [userLogin, setUserLogin] = useState([]);

  useEffect(() => {
    props.getUser(userId).then((res) => {
      setUserLogin(res.action.payload.data.data[0]);
    });
  }, []);

  const handleSearch = (phone) => {
    router.push(`/transfer/${phone}`);
    // axiosApiInstances
    //   .get(`user/phone?userPhone=${phone}`)
    //   .then((res) => {
    //     setUser(res.data.data);
    //   })
    //   .catch((err) => {
    //     setMessage(err.response.data.msg);
    //     setUser([]);
    //   });
  };

  const handleClick = (receiverId) => {
    router.push(`/transfer/input-amount?receiverId=${receiverId}`);
  };

  return (
    <Layout title="Transfer">
      <Navbar user={userLogin} />
      <div className={`container-fluid ${styles.outerContainer}`}>
        <div className="row row-cols-1 row-cols-md-2 h-100 gy-3 gy-md-0">
          <div className={`col-md-3 ${styles.navSide}`}>
            <PageNav user={userLogin} page="transfer" />
          </div>
          <div className={`col-md-9 ${styles.personalInfoSide}`}>
            <div className={`text-start ${styles.searchReceiverContainer}`}>
              <div className={`${styles.searchGroup}`}>
                <MagnifyingGlass className={`${styles.magnifyingGlass}`} />
                <input
                  type="text"
                  name="phone"
                  placeholder="Search receiver here..."
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyUp={(e) => e.key === "Enter" && handleSearch(phone)}
                />
              </div>
              <div className={styles.receiverLists}>
                {/* {user.length > 0 ? (
                  user.map((item, index) => (
                    <div
                      key={index}
                      className={`d-flex align-items-center justify-content-between ${styles.list}`}
                      onClick={() => handleClick(item.user_id)}
                    >
                      <div className="d-flex text-start">
                        <img
                          src={
                            item.user_image
                              ? `${process.env.API_IMG_URL}/${item.user_image}`
                              : "/default-img-placeholder.png"
                          }
                          className="me-2"
                        />
                        <div className="d-flex flex-column justify-content-center">
                          <h5 className="m-0">{item.user_name}</h5>
                          <span>{item.user_phone}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="d-flex flex-column align-items-center justify-content-center h-100">
                    <p
                      style={{
                        color: "rgb(169, 169, 169)",
                        fontSize: "38px",
                        fontWeight: "800",
                      }}
                      className="m-0"
                    >
                      No Receiver.
                    </p>
                    <span
                      style={{
                        color: "rgb(169, 169, 169)",
                        fontSize: "14px",
                        textAlign: "center",
                        width: "60%",
                      }}
                    >
                      {message
                        ? message
                        : "You can find your receiver by enter their phone number in the search box above."}
                    </span>
                  </div>
                )} */}
                {props.users.map((item, index) => (
                  <div
                    key={index}
                    className={`d-flex align-items-center justify-content-between ${styles.list}`}
                    onClick={() => handleClick(item.user_id)}
                  >
                    <div className="d-flex text-start">
                      <img
                        src={
                          item.user_image
                            ? `${process.env.API_IMG_URL}/${item.user_image}`
                            : "/default-img-placeholder.png"
                        }
                        className="me-2"
                      />
                      <div className="d-flex flex-column justify-content-center">
                        <h5 className="m-0">{item.user_name}</h5>
                        <span>{item.user_phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

const mapDispatchToProps = { getUser };
export default connect(null, mapDispatchToProps)(Transfer);
