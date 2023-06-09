import styled from "styled-components";
import { mobile } from "../../responsive";
import { useFormik } from "formik";
import { publicRequest } from "../../requestMethod";
import React from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: 1px solid ${(props) => (props.hasError ? "red" : "gray")};
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
  font-size: 14px;
  margin-left: 5px;
`;

const ErrorMessage1 = styled.div`
  position: absolute;
  top: 56px;
  right: 231px;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
`;
const ErrorMessage2 = styled.div`
  position: absolute;
  top: 116px;
  right: 74px;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
`;
const ErrorIcon = styled.span`
  margin-right: 5px;
  color: red;
  font-size: 14px;
`;

const Register = () => {
  const [emailTouched, setEmailTouched] = React.useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] =
    React.useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validate: (values) => {
      const errors = {};

      if (values.password !== values.confirm_password) {
        errors.confirm_password = "Password and confirm password do not match";
      }

      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Invalid email address";
      }

      return errors;
    },
    onSubmit: async (values) => {
      if (Object.keys(formik.errors).length > 0) {
        alert("Please fix the validation errors");
        return;
      }

      try {
        // Handle form submission here
        const res = await publicRequest.post("/auths/register", {
          email: values.email,
          username: values.username,
          password: values.password,
        });
        if (res.status === 200) {
          alert("Create account successfully !!!");
          navigate("/auths/login");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("User with that email or username already exists");
        }
        console.error(error);
      }
    },
  });

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordTouched(true);
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            placeholder="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <Input
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={handleEmailBlur}
            hasError={formik.errors.email && emailTouched}
          />
          {formik.errors.email && emailTouched && (
            <ErrorMessage1 show={emailTouched}>
              <ErrorIcon>!</ErrorIcon>
              <Error>{formik.errors.email}</Error>
            </ErrorMessage1>
          )}
          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Input
            placeholder="Confirm Password"
            name="confirm_password"
            type="password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={handleConfirmPasswordBlur}
            hasError={formik.errors.confirm_password && confirmPasswordTouched}
          />
          {formik.errors.confirm_password && confirmPasswordTouched && (
            <ErrorMessage2 show={confirmPasswordTouched}>
              <ErrorIcon>!</ErrorIcon>
              <Error>{formik.errors.confirm_password}</Error>
            </ErrorMessage2>
          )}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
