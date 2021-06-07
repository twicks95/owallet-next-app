import React from "react";
import { ArrowUp, Plus, SignOut, SquaresFour, User } from "phosphor-react";
import styles from "../../styles/PageNav.module.css";

export default function PageNav() {
  return (
    <div className={`text-start ${styles.navContainer}`}>
      <ul>
        <li>
          <SquaresFour className="me-3" />
          Dashboard
        </li>
        <li>
          <ArrowUp className="me-3" />
          Transfer
        </li>
        <li>
          <Plus className="me-3" />
          Top Up
        </li>
        <li>
          <User className="me-3" />
          Profile
        </li>
        <li>
          <SignOut className="me-3" />
          Logout
        </li>
      </ul>
    </div>
  );
}
