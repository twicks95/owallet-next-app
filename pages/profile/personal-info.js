import Link from "next/link";
import axiosApiInstances from "../../utils/axios";
import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";
import Footer from "../../components/module/Footer";
import PageNav from "../../components/module/PageNav";
import { authorizationPage } from "../../middleware/authorizationPage";
import styles from "../../styles/PersonalInfo.module.css";

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
  const { user_email, user_name, user_phone } = props.user;
  const name = user_name.split(" ");
  return (
    <Layout title="Personal Info">
      <Navbar user={props.user} />
      <div className={`container-fluid ${styles.outerContainer}`}>
        <div className="row row-cols-1 row-cols-md-2 h-100 gy-3 gy-md-0">
          <div className={`col-md-3 ${styles.navSide}`}>
            <PageNav user={props.user} page="profile" />
          </div>
          <div className={`col-md-9 ${styles.personalInfoSide}`}>
            <div className={`text-start ${styles.personalInfoContainer}`}>
              <div className={`${styles.headDesc}`}>
                <h5>Personal Information</h5>
                <p>
                  Your personal information is collected from sign up process.
                  If you want to make changes, please contact our support.
                </p>
              </div>
              <div className={`${styles.detailInfo}`}>
                <div className={`${styles.list}`}>
                  <h4>First Name</h4>
                  <p>{name[0]}</p>
                </div>
                <div className={`${styles.list}`}>
                  <h4>Last Name</h4>
                  <p>{name.length > 1 ? name[name.length - 1] : "-"}</p>
                </div>
                <div className={`${styles.list}`}>
                  <h4>Verified Email</h4>
                  <p>{user_email}</p>
                </div>
                <div
                  className={`d-flex align-items-center justify-content-between ${styles.list}`}
                >
                  <div>
                    <h4>Phone Number</h4>
                    <p className="mb-0">+62 {user_phone.substr(1)}</p>
                  </div>
                  <Link href="/manage-phone">Manage</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
