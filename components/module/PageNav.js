import Cookie from "js-cookie";
import { useRouter } from "next/router";
import {
  ArrowUp,
  IconContext,
  Plus,
  SignOut,
  SquaresFour,
  User,
} from "phosphor-react";
import styles from "../../styles/PageNav.module.css";

export default function PageNav(props) {
  const router = useRouter();
  const { page } = props;
  const { user_id } = props.data.data[0];

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("userId");
    router.push("/login");
  };

  const handleClick = (e) => {
    const target = e.target.innerText.toLowerCase();
    switch (target) {
      case "dashboard":
        router.push("/");
        break;
      case "transfer":
        router.push("/transfer");
        break;
      case "top up":
        router.push("/topup");
        break;
      case "profile":
        router.push(`/profile/${user_id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`text-start ${styles.navContainer}`}>
      <ul>
        <li
          className={page === "dashboard" ? styles.active : ""}
          name="test"
          onClick={(e) => handleClick(e)}
        >
          {page === "dashboard" ? (
            <IconContext.Provider
              value={{
                color: "#6379f4",
                size: "1.2em",
                weight: "bold",
                mirrored: false,
              }}
            >
              <SquaresFour className="me-3" />
            </IconContext.Provider>
          ) : (
            <SquaresFour className="me-3" />
          )}
          <span>Dashboard</span>
        </li>
        <li
          className={page === "transfer" ? styles.active : ""}
          onClick={(e) => handleClick(e)}
        >
          {page === "transfer" ? (
            <IconContext.Provider
              value={{
                color: "#6379f4",
                size: "1.2em",
                weight: "bold",
                mirrored: false,
              }}
            >
              <ArrowUp className="me-3" />
            </IconContext.Provider>
          ) : (
            <ArrowUp className="me-3" />
          )}
          <span>Transfer</span>
        </li>
        <li
          className={page === "topup" ? styles.active : ""}
          onClick={(e) => handleClick(e)}
        >
          {page === "topup" ? (
            <IconContext.Provider
              value={{
                color: "#6379f4",
                size: "1.2em",
                weight: "bold",
                mirrored: false,
              }}
            >
              <Plus className="me-3" />
            </IconContext.Provider>
          ) : (
            <Plus className="me-3" />
          )}
          <span>Top Up</span>
        </li>
        <li
          className={page === "profile" ? styles.active : ""}
          onClick={(e) => handleClick(e)}
        >
          {page === "profile" ? (
            <IconContext.Provider
              value={{
                color: "#6379f4",
                size: "1.2em",
                weight: "bold",
                mirrored: false,
              }}
            >
              <User className="me-3" />
            </IconContext.Provider>
          ) : (
            <User className="me-3" />
          )}
          <span>Profile</span>
        </li>
        <li onClick={handleLogout}>
          <SignOut className="me-3" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}
