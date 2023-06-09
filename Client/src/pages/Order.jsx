import React, { useState } from "react";
import styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormik } from "formik";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import Navbar from "../components/Navbar";
import { TokenRequest } from "../../requestMethod";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const countryOptions = [
  { value: "Country", label: "Select Country" },
  { value: "VN", label: "Vietnam" },
  { value: "KH", label: "Cambodia" },
  { value: "TH", label: "Thailand" },
  { value: "LA", label: "Laos" },
  { value: "MY", label: "Malaysia" },
  { value: "ID", label: "Indonesia" },
  { value: "TL", label: "Timor Leste" },
  { value: "SG", label: "Singapore" },
  { value: "PH", label: "Philippines" },
  { value: "BN", label: "Brunei" },
  { value: "MM", label: "Myanmar" },
];

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const OrderForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
  width: 500px;
  height: 500px;
`;
const OrderFormName = styled.div`
  font-size: 30px;
  font-weight: 60px;
`;
const InputName = styled.label`
  font-weight: bold;
`;

const InputField = styled.input`
  padding: 10px;
  border: none;
  &:focus {
    border: 1px solid red;
  }
`;

const CountrySelect = styled.select`
  padding: 10px;
`;

const CountryOption = styled.option``;
const SubmitButton = styled.button`
  margin: 0 auto;
  padding: 10px 20px;
  width: 100%;
  max-width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Order = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const state = urlParams.get("state");
  const cartItem = JSON.parse(state);
  const data = cartItem && cartItem.length > 0 ? cartItem[0].username : "";
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      Username: { data },
      Email: "",
      Address: "",
      Country: "",
      Phone: "",
    },
    onSubmit: async (values) => {
      // Handle form submission here
      const res = await TokenRequest.post("/orders", {
        email: values.Email,
        address: values.Address,
        phone: values.Phone,
        country: values.Country,
      });
      if (res.data.message === "Đơn hàng đã được tạo thành công.") {
        navigate("/success");
      }
    },
  });

  const handlePhoneChange = (value) => {
    formik.setFieldValue("Phone", value); // Update Formik form state for Phone field
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <Container>
        <OrderFormName>PRODUCT ORDER FORM</OrderFormName>
        <OrderForm onSubmit={formik.handleSubmit}>
          <InputName htmlFor="Username">Username</InputName>
          <InputField
            type="text"
            name="Username"
            id="Username"
            placeholder="Enter Your Username"
            value={data}
            disabled
          />

          <InputName htmlFor="Email">Email</InputName>
          <InputField
            type="email"
            name="Email"
            id="Email"
            onChange={formik.handleChange}
            placeholder="Enter your email"
            value={formik.values.Email}
            required
          />

          <InputName htmlFor="Address">Address</InputName>
          <InputField
            type="text"
            name="Address"
            id="Address"
            onChange={formik.handleChange}
            placeholder="Ex : 23 Ta Quang Buu , Hai Ba Trung , Bach Khoa , Ha Noi..."
            value={formik.values.Address}
          />

          <InputName htmlFor="Country">Country</InputName>
          <CountrySelect
            name="Country"
            id="Country"
            onChange={formik.handleChange}
            value={formik.values.Country}
            required
          >
            {countryOptions.map((country) => (
              <CountryOption key={country.value} value={country.value}>
                {country.label}
              </CountryOption>
            ))}
          </CountrySelect>

          <InputName htmlFor="Phone">Phone</InputName>
          <PhoneInput
            defaultCountry="VN"
            name="Phone"
            value={formik.values.Phone}
            inputStyle={{
              width: "100%",
            }}
            onChange={handlePhoneChange}
            placeholder="Enter Your Phone Number"
            required
          />
          <SubmitButton type="submit">ORDER</SubmitButton>
        </OrderForm>
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Order;
