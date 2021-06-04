import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Login.module.css";
import Cookie from "js-cookie";
import { unauthorizationPage } from "../../../middleware/authorizationPage";
// import phone1 from "../../../public/phone1.png";
// import phone2 from "../../../public/phone2png.png";
import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps(context) {
  await unauthorizationPage(context);
  return { props: {} };
}

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ userEmail: "", userPassword: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    // proses axios di dalam .then
    const data = {
      user_id: 1,
    };
    Cookie.set("token", "testingToken", { expires: 1, secure: true });
    Cookie.set("userId", data.user_id, { expires: 1, secure: true });
    router.push("/");
  };

  return (
    <Layout title="Login">
      <div className={`d-flex`}>
        <div
          className={`text-start d-flex flex-column justify-content-between ${styles.leftBanner}`}
        >
          <h1>Owallet</h1>
          <div className={`text-center ${styles.imageGroup}`}>
            <Image
              src="/phone1.png"
              // layout="responsive"
              width={100}
              height={200}
            />
            <Image
              src="/phone2png.png"
              // layout="responsive"
              width={100}
              height={200}
            />
          </div>
          <div>
            <h2 className="mb-4">App that Covering Banking Needs.</h2>
            <p>
              Owallet is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in Owallet everyday with worldwide
              users coverage.
            </p>
          </div>
        </div>
        <div className={`text-start ${styles.formSection}`}>
          <h3 className="mb-4">
            Start Accessing Banking Needs With All Devices and All Platforms
            With 30.000+ Users
          </h3>
          <p>
            Transfering money is eassier than ever, you can access Zwallet
            wherever you are. Desktop, laptop, mobile phone? we cover all of
            that for you!
          </p>
          <form
            className={`my-5 p-0 ${styles.formContainer}`}
            onSubmit={handleLogin}
          >
            <div className={`border border-danger mb-5 ${styles.inputGroup}`}>
              <label className={`border m-0 form-labe ${styles.emailLabel}`}>
                Email address
              </label>
              {/* <span className={styles.emailLabel}></span> */}
              <input
                type="email"
                className="form-control shadow-none"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                // placeholder="Enter your e-mail"
              />
            </div>
            <div className={`border border-danger mb-3 ${styles.inputGroup}`}>
              <label
                className={`border m-0 form-label ${styles.passwordLabel}`}
              >
                Password
              </label>
              {/* <span className={}></span> */}
              <input
                type="password"
                className="form-control shadow-none"
                id="exampleInputPassword1"
                // placeholder="Enter your password"
              />
            </div>
            <div className="text-end">
              <Link href="">Forgot password?</Link>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <p className="text-center">
            Don’t have an account? Let’s{" "}
            <span className={`${styles.signup}`}>
              <Link href="/register">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
