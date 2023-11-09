import React from "react";
import css from "./css/Footer.module.css";
function Footer() {
  return (
    <>
      <div className={css.containerFooter}>
        <div className={`d-flex flex-row justify-content-between allign-items-center ${css.listFooter}`}>
          <p>No.Phone : 081210210238122</p>
          <p>Email : SoocerFieldJakarta@gmail.com</p>
          <p>Province : DKI Jakarta</p>          
        </div>
      </div>
    </>
  );
}

export default Footer;
