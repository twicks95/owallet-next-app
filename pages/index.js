import Layout from "components/Layout";
import styles from "styles/Landing.module.css";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { unauthorizationPage } from "middleware/authorizationPage";
import { useRouter } from "next/router";

export default function Landing() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <Layout title="Landing Page">
      <div className={styles.landingNav}>
        <Link href="/">Owallet</Link>
        <div>
          <Button
            variant="primary"
            style={{ border: "1.5px solid #ffffff" }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Button
            variant="light"
            className={styles.btnLight}
            onClick={handleRegister}
          >
            Sign Up
          </Button>
        </div>
      </div>
      <div className={`${styles.hero}`}>
        <div>
          <h1>Awesome App For Saving Time.</h1>
          <p>
            We bring you a mobile app for banking problems that oftenly wasting
            much of your times.
          </p>
          <Button
            variant="light"
            className={styles.btnLight}
            onClick={handleRegister}
          >
            Tyr It Free
          </Button>
        </div>
        <img src="/phone2.png" alt="mockup" />
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  await unauthorizationPage(context);
  return {
    props: {},
  };
};
