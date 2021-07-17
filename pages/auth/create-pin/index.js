import { useState } from "react";
import { useRouter } from "next/router";
import { authorizationPage } from "middleware/authorizationPage";
import axiosApiInstances from "utils/axios";
import Layout from "components/Layout";
import styles from "styles/CreatePin.module.css";

export async function getServerSideProps(context) {
  const data = await authorizationPage(context);
  const res = await axiosApiInstances
    .get(`user/${data.userId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return [];
    });

  return {
    props: { user: res[0] },
  };
}

export default function Register(props) {
  const router = useRouter();
  const [pin, setPin] = useState({});
  const [loading, setLoading] = useState(false);
  const { user_id } = props.user;

  const changeText = (event) => {
    if (event.target.value) {
      const nextSibling = document.getElementById(
        `pin-${parseInt(event.target.name, 10) + 1}`
      );

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }
    setPin({ ...pin, [`pin${event.target.name}`]: event.target.value });
  };

  const handleCreatePin = (e, id) => {
    e.preventDefault();
    setLoading(true);
    const allPin =
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;

    axiosApiInstances
      .patch(`auth/pin/create/${id}`, { userPin: allPin })
      .then(() => {
        router.push("/create-pin/success");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <Layout title="Create Pin">
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
          <h3 className="mb-4">
            Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN
            That You Created Yourself.
          </h3>
          <p>
            Create 6 digits pin to secure all your money and your data in
            Zwallet app. Keep it secret and don’t tell anyone about your Zwallet
            account password and the PIN.
          </p>
          <form
            className={`my-5 p-0 ${styles.formContainer}`}
            onSubmit={(e) => handleCreatePin(e, user_id)}
          >
            <div className={styles.inputs}>
              <input
                type="text"
                name="1"
                id="pin-1"
                maxLength="1"
                onChange={(e) => changeText(e)}
              />
              <input
                type="text"
                name="2"
                id="pin-2"
                maxLength="1"
                onChange={(e) => changeText(e)}
              />
              <input
                type="text"
                name="3"
                id="pin-3"
                maxLength="1"
                onChange={(e) => changeText(e)}
              />
              <input
                type="text"
                name="4"
                id="pin-4"
                maxLength="1"
                onChange={(e) => changeText(e)}
              />
              <input
                type="text"
                name="5"
                id="pin-5"
                maxLength="1"
                onChange={(e) => changeText(e)}
              />
              <input
                type="text"
                name="6"
                id="pin-6"
                maxLength="1"
                onChange={(e) => changeText(e)}
              />
            </div>
            {!pin.pin1 ||
            !pin.pin2 ||
            !pin.pin3 ||
            !pin.pin4 ||
            !pin.pin5 ||
            !pin.pin6 ? (
              <button
                type="submit"
                className="btn btn-primary self-column"
                disabled
              >
                Create my pin
              </button>
            ) : loading ? (
              <button
                className="btn btn-primary d-flex align-items-center justify-content-center"
                type="button"
                disabled
              >
                <span
                  className="spinner-grow spinner-grow-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Create my pin
              </button>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
}
