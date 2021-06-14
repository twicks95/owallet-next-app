import { useEffect } from "react";
import { useRouter } from "next/router";
import { authorizationPage } from "middleware/authorizationPage";
import Layout from "components/Layout";
import styles from "styles/CreatePinSuccess.module.css";
import { CheckCircle } from "phosphor-react";

export async function getServerSideProps(context) {
  await authorizationPage(context);
  return { props: {} };
}

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    window.setTimeout(() => {
      router.push("/login");
    }, 5000);
  }, []);

  return (
    <Layout title="Succes Create PIN">
      <div className={`d-flex ${styles.outerContainer}`}>
        <div className={`text-start d-flex flex-column ${styles.leftBanner}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="90%"
            viewBox="0 0 807 892"
            fill="none"
            style={{ position: "absolute", bottom: "0", left: "0" }}
          >
            <g opacity="0.6">
              <path
                d="M-488.376 189.221C-663.649 189.221 -807.307 361.569 -775.807 534.056V1312.37H876.379V0.0478516C815.205 154.863 718.616 220.569 552.209 220.569C381.981 220.569 324.209 28.1535 161.044 28.1535C-65.0798 28.1535 14.087 512.436 -156.642 512.436C-337.483 512.436 -317.647 189.221 -488.376 189.221Z"
                fill="url(#paint0_linear)"
                fillOpacity="0.5"
              />
              <path
                d="M-775.807 542.704C-807.307 370.218 -663.649 197.869 -488.376 197.869C-317.647 197.869 -337.483 521.084 -156.642 521.084C14.087 521.084 -65.0798 36.802 161.044 36.802C324.209 36.802 381.981 229.218 552.209 229.218C718.616 229.218 815.205 163.512 876.379 8.69629"
                stroke="white"
                strokeOpacity="0.15"
                strokeWidth="10.1237"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="48.1063"
                y1="0.0478516"
                x2="47.547"
                y2="1239.94"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" stopOpacity="0.2" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <h1>Owallet</h1>
          <div className={`d-flex justify-content-start ${styles.imageGroup}`}>
            <img
              src="/phone1.png"
              style={{ width: "50%", transform: "rotate(-7.27deg)" }}
            />
            <img
              src="/phone2.png"
              style={{
                width: "50%",
                marginLeft: "-20%",
                transform: "rotate(9.45deg)",
              }}
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
          <CheckCircle
            color={"#1EC15F"}
            size={70}
            weight="fill"
            className={styles.checkCircle}
          />
          <h3 className="mb-4">Your PIN Was Successfully Created</h3>
          <p>
            Your PIN was successfully created and you can now access all the
            features in Zwallet. Login to your new account and start exploring!
          </p>
          <div className="d-flex align-items-center justify-content-between">
            <p style={{ color: "#6379f4", fontWeight: "700", width: "70%" }}>
              Please wait... you will be redirected to dashboard page in 3
              seconds.
            </p>
            <div style={{ width: "30%" }} className="text-center">
              <div
                style={{ color: "#6379f4" }}
                className="spinner-border spinner-border-sm"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
