import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import styles from "../../styles/Navbar.module.css";
import { BellSimple } from "phosphor-react";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("userId");
    router.push("/login");
  };
  return (
    <div
      className={`d-flex align-items-center justify-content-between ${styles.navbarContainer}`}
    >
      <Link href="/">Owallet</Link>
      <div className={`d-flex align-items-center ${styles.userNotif}`}>
        <div className={`${styles.avatar}`}>
          <img src="/user.png" alt="avatar" />
        </div>
        <div
          className={`d-flex flex-column justify-content-center ${styles.userInfo}`}
        >
          <p>Robert Chandler</p>
          <span>+62 8139 3877 7946</span>
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
