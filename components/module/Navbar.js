import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Navbar.module.css";
import { BellSimple } from "phosphor-react";

function Navbar(props) {
  const router = useRouter();
  const { user_id, user_image, user_name, user_phone } = props.user;

  const handleProfile = (id) => {
    router.push(`/profile/${id}`);
  };

  return (
    <div
      className={`d-flex align-items-center justify-content-between ${styles.navbarContainer}`}
    >
      <Link href="/">Owallet</Link>
      <div className={`d-flex align-items-center ${styles.userNotif}`}>
        <div
          className={`${styles.avatar}`}
          onClick={() => handleProfile(user_id)}
        >
          <img
            src={
              user_image
                ? `${process.env.API_IMG_URL}${user_image}`
                : "/default-img-placeholder.png"
            }
            alt="avatar"
          />
        </div>
        <div
          className={`d-flex flex-column justify-content-center ${styles.userInfo}`}
        >
          <p>{user_name}</p>
          <span>+62 {user_phone ? user_phone.substr(1) : ""}</span>
        </div>
        <BellSimple size={24} className={styles.bell} />
      </div>
      <div className={styles.meatBalls}>
        <div className={styles.ball} />
        <div className={styles.ball} />
        <div className={styles.ball} />
      </div>
    </div>
  );
}

export default Navbar;
