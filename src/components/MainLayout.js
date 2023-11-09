import React from "react";
import Navbar from "./parents/Navbar";
import Footer from "./parents/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="" style={{minHeight:'100vh'}}>
      <Navbar />
        <div className="">
            <Outlet />
        </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
