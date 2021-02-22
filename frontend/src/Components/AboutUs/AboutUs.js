import React from "react";
import styles from "./AboutUs.module.css";


const AboutUs = () => {

  return (

    <div className={styles.containerheader} >

      <h1 className={styles.header}>Event Management creates opportunities</h1>

      <p className={styles.headerparag}>
        Event Management is a platform to find and build local communities.
        People use Event Management to meet new people, to learn new things,
        to find support, to leave their comfort zone and to pursue their
        passions together. When passionate people come together, it becomes
        something big.
        
          <br />

        <span className={styles.indent}  > Event Management </span>
          mission is to help people grow through real human
          connections and achieve their goals. From professional networking to
          brewery tours to programming workshops: With Event Management, people can
          continue their
          dreams and find a supportive community.
        </p>

    </div>
  );
};

export default AboutUs;
