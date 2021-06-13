import { useState } from "react";
import { useRouter } from "next/router";
import axiosApiInstances from "utils/axios";
import Layout from "components/Layout";
import styles from "styles/Transfer.module.css";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import PageNav from "components/module/PageNav";
import { MagnifyingGlass } from "phosphor-react";
import { authorizationPage } from "middleware/authorizationPage";

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

  // Ambil semua users
  // const users = await axiosApiInstances.get("user/all").then((res) => {
  //   return res.data.data;
  // });

  return {
    props: { user: res[0] },
    // props: {},
    // props: { users: users, user: res[0] },
  };
}

export default function Transfer(props) {
  const router = useRouter();
  // const { users } = props;
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState([]);

  const handleSearch = (data) => {
    axiosApiInstances
      .get(`user/phone?userPhone=${data}`)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleClick = (receiverId) => {
    router.push(`/transfer/input-amount?receiverId=${receiverId}`);
  };

  return (
    <Layout title="Transfer">
      <Navbar user={props.user} />
      <div className={`container-fluid ${styles.outerContainer}`}>
        <div className="row row-cols-1 row-cols-md-2 h-100 gy-3 gy-md-0">
          <div className={`col-md-3 ${styles.navSide}`}>
            <PageNav user={props.user} page="transfer" />
            {/* <PageNav page="transfer" /> */}
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
                {/* <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSearch(phone)}
                >
                  Search
                </button> */}
              </div>
              <div className={styles.receiverLists}>
                {user.length > 0 ? (
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
                  <></>
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
