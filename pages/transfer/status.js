import { CheckCircle, XCircle } from "phosphor-react";
import Navbar from "../../components/module/Navbar";
import Footer from "../../components/module/Footer";
import PageNav from "../../components/module/PageNav";

import React from "react";

export default function Status() {
  return (
    <div>
      <Navbar />
      <div className="row row-cols-1 row-cols-md-2 h-100 gy-3 gy-md-0">
        <div className={`col-md-3 ${styles.navSide}`}>
          <PageNav page="transfer" />
        </div>
        <div className={`col-md-9 ${styles.personalInfoSide}`}></div>
      </div>
      <Footer />
    </div>
  );
}
