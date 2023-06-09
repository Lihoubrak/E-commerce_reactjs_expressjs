import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Product from "../components/Product";
import Slider from "../components/Slider";
import PasswordResetForm from "../components/PasswordResetForm";
import OTPVerificationForm from "../components/OTPVerificationForm";
import NewPasswordForm from "../components/NewPasswordForm";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider/>
      <Categories/>
      <Product/>
      <Newsletter/>
      <Footer/>
      <PasswordResetForm/>
      <OTPVerificationForm/>
      <NewPasswordForm/>
    </div>
  );
};

export default Home;
