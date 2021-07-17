import Layout from "components/Layout";
import styles from "styles/Landing.module.css";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { unauthorizationPage } from "middleware/authorizationPage";
import { useRouter } from "next/router";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import { Phone, LockSimple, DownloadSimple } from "phosphor-react";

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
      <div className={styles.outerContainer}>
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
        <section className={`${styles.hero}`}>
          <div>
            <h1>Awesome App For Saving Time.</h1>
            <p>
              We bring you a mobile app for banking problems that oftenly
              wasting much of your times.
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
        </section>
        <Row className={styles.partners}>
          <Col>
            <img src="/microsoft.svg" alt="microsoft" />
          </Col>
          <Col>
            <img src="/dropbox.svg" alt="dropbox" />
          </Col>
          <Col>
            <img src={`/h${"&"}m.svg`} alt={`h${"&"}m`} />
          </Col>
          <Col>
            <img src="/airbnb.svg" alt="airbnb" />
          </Col>
        </Row>
        <section className={styles.about}>
          <div className="d-flex flex-column align-items-center mb-5">
            <h2>
              <span>About</span> the Application.
            </h2>
            <h3>
              We have some great features from the application and it’s totally
              free to use by all users around the world.
            </h3>
          </div>
          <div className={`d-flex gap-4 ${styles.cardGroup}`}>
            <div className={styles.card}>
              <div className={styles.iconContainer}>
                <Phone size={26} color="#6379f4" />
              </div>
              <h4>24/7 Support</h4>
              <p>
                We have 24/7 contact support so you can contact us whenever you
                want and we will respond it.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.iconContainer}>
                <LockSimple size={26} color="#6379f4" />
              </div>
              <h4>Data Privacy</h4>
              <p>
                We make sure your data is safe in our database and we will
                encrypt any data you submitted to us.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.iconContainer}>
                <DownloadSimple size={26} color="#6379f4" />
              </div>
              <h4>Easy Download</h4>
              <p>
                Zwallet is 100% totally free to use it’s now available on Google
                Play Store and App Store.
              </p>
            </div>
          </div>
        </section>
        <section className={styles.features}>
          <Row>
            <Col xs={4} className="position-relative">
              <img src="/phone1.png" alt="mockup" />
              <img src="/phone1.png" alt="mockup" />
            </Col>
            <Col
              xs={8}
              style={{ paddingTop: "100px", paddingBottom: "100px" }}
              className="text-start"
            >
              <div>
                <h2>
                  All The <span>Great</span> Owallet Features.
                </h2>
                <ul
                  style={{ listStyle: "none" }}
                  className="p-0 d-flex flex-column gap-3"
                >
                  <div className={styles.list}>
                    <li>Small Fee</li>
                    <p>
                      We only charge 5% of every success transaction done in
                      Zwallet app.
                    </p>
                  </div>
                  <div className={styles.list}>
                    <li>Data Secured</li>
                    <p>
                      All your data is secured properly in our system and it’s
                      encrypted.
                    </p>
                  </div>
                  <div className={styles.list}>
                    <li>User Friendly</li>
                    <p>
                      Zwallet come up with modern and sleek design and not
                      complicated.
                    </p>
                  </div>
                </ul>
              </div>
            </Col>
          </Row>
        </section>
        <section className={styles.userComments}>
          <h2>
            What Users are <span>Saying.</span>
          </h2>
        </section>
        <footer className={styles.footer}>
          <h5>OWallet</h5>
          <p>
            Simplify financial needs and saving much time in banking needs with
            one single app.
          </p>
          <hr />
          <div className="d-flex justify-content-between">
            <small>2021 Owallet. All rights reserved</small>
            <div>
              <span>+62 5637 9901</span>
              <span>contact@owallet.com</span>
            </div>
          </div>
        </footer>
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
