import React from "react";
import styles from "./SideBar.module.css"
import logoIcon from "../../assets/icons/logo.svg"

const SideBar = () => {
  return (
    <header className={styles.header}>
        <div>
            <div className={styles.logo__container}>
                <img className={styles.img} src={logoIcon} />
                TusurTask
            </div>
        </div>
    </header>

  );
};

export default SideBar;
