// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
// import { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import Navbar from "../components/module/Navbar";
// import styles from "../styles/Home.module.css";
// import axiosApiInstances from "../utils/axios";

// export default function Home() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     console.log("Get Data!");
//     getUsers();
//   }, []);

//   const getUsers = () => {
//     axiosApiInstances
//       .get("users")
//       .then((res) => {
//         console.log(res.data);
//         setUsers(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <Layout title="Home">
//       <Navbar />
//       <h1 className={styles.titleHead}>Home page</h1>
//       <h2>{process.env.APP_NAME}</h2>
//       {users.map((item, index) => {
//         return (
//           <div key={index}>
//             <h3>Name: {item.name}</h3>
//             <h4>Phone: {item.phone}</h4>
//             <h5>Email: {item.email}</h5>
//             <div className="d-grid gap-2">
//               <button className="btn btn-primary" type="button">
//                 Button
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </Layout>
//   );
// }

// SSR ==============================================
import { useState } from "react";
import Layout from "../components/Layout";
import Navbar from "../components/module/Navbar";
import styles from "../styles/Home.module.css";
import axiosApiInstances from "../utils/axios";
import { authorizationPage } from "../middleware/authorizationPage";

export async function getServerSideProps(context) {
  const data = await authorizationPage(context);
  console.log(data);

  const res = await axiosApiInstances
    .get("users")
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      // console.log(err);
      return [];
    });
  return {
    props: { users: res, userLogin: data }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [users, setUsers] = useState(props.users);
  // console.log(users);
  return (
    <Layout title="Home">
      <Navbar />
      <h1 className={styles.titleHead}>Home page</h1>
      <h2>{process.env.APP_NAME}</h2>
      {users.map((item, index) => {
        return (
          <div key={index}>
            <div className="d-grid gap-2">
              <button className="btn btn-primary" type="button">
                {item.name}
              </button>
            </div>
          </div>
        );
      })}
    </Layout>
  );
}
