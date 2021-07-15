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
import { Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";

// export const getStaticPaths = async () => {
//   const res = await axiosApiInstances
//     .get("user/all?limit=1000")
//     .then((res) => {
//       return res.data.data;
//     })
//     .catch((err) => {
//       return [];
//     });

//   const paths = res.map((item) => ({
//     query: {
//       userPhone: `${item.user_phone}`,
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

export const getStaticProps = async () => {
  const users = await axiosApiInstances
    .get("user/all?limit=5")
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });

  return {
    props: { users: users.data, pagination: users.pagination },
  };
};

const Transfer = (props) => {
  const router = useRouter();
  const userId = Cookies.get("userId");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState("");
  const [userLogin, setUserLogin] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const [sort, setSort] = useState("");
  const [users, setUsers] = useState(props.users);
  const limit = 5;

  useEffect(() => {
    props.getUser(userId).then((res) => {
      setUserLogin(res.action.payload.data.data[0]);
    });
    setTotalPage(props.pagination.totalPage);
  }, []);

  useEffect(() => {
    axiosApiInstances
      .get(`user/all?page=${page}&limit=${limit}&sort=${sort}`)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch(() => setUsers(props.users));
  }, [page, sort]);

  const handleSearch = (phone) => {
    setNotFound(false);
    phone
      ? axiosApiInstances
          .get(`user/phone?userPhone=${phone}`)
          .then((res) => {
            setUser(res.data.data);
          })
          .catch((err) => {
            setNotFound(true);
            setMessage(err.response.data.msg);
            setUser([]);
          })
          .finally(() => {
            setTotalPage(0);
          })
      : setTotalPage(props.pagination.totalPage),
      router.push("/transfer");
  };

  const handleClick = (receiverId) => {
    router.push(`/transfer/input-amount?receiverId=${receiverId}`);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    setPage(selectedPage);
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
              <Row style={{ marginBottom: "50px" }} className="g-2">
                <Col xs={12} md={9} lg={10}>
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
                </Col>
                <Col xs={12} md={3} lg={2}>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title="Sort"
                    className={styles.dropdown}
                  >
                    <Dropdown.Item
                      onClick={() => {
                        setSort("user_id ASC");
                      }}
                    >
                      All
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setSort("user_name ASC");
                      }}
                    >
                      Name <span>a-z</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setSort("user_name DESC");
                      }}
                    >
                      Name <span>z-a</span>
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
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
                ) : notFound ? (
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
                ) : (
                  users.map((item, index) => (
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
                )}
              </div>
              <div className="d-flex align-items-center justify-content-center mt-5">
                <ReactPaginate
                  previousLabel={""}
                  nextLabel={""}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={totalPage} // Total page
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  onPageChange={(e) => handlePageClick(e)}
                  containerClassName={styles.pagination}
                  subContainerClassName={`${styles.pages} ${styles.pagination}`}
                  activeClassName={styles.active}
                />
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
