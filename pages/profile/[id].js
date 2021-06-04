import React from "react";
import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";
import axiosApiInstances from "../../utils/axios";

export async function getServerSideProps(context) {
  console.log(context.query);
  const res = await axiosApiInstances
    .get(`users/${context.query.id}`)
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  return {
    props: { user: res }, // will be passed to the page component as props
  };
}

export default function profile(props) {
  return (
    <Layout title="profile">
      <Navbar />
      <h1>Profile page by ID</h1>
      <div className="card">
        {props.user.name ? <h4>{props.user.name}</h4> : <h4>Loading...</h4>}
      </div>
    </Layout>
  );
}
