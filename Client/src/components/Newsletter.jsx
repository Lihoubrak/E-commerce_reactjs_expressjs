import React from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import styled from "styled-components";
import { mobile } from "../../responsive";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  flex-direction: column;
  background-color: #fcf5f5;
`;
const Title = styled.h1`
  font-size: 70px;
`;
const Description = styled.div`
  margin-top: 20px;
  font-size: 24px;
  font-weight: 300;
  ${mobile({ textAlign: "center" })}
`;
const InputContainer = styled.div`
  margin-top: 20px;
  border: 1px solid lightgray;
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "80%" })}
`;
const Button = styled.button`
  flex: 1;
  background-color: teal;
  border: none;
  color: white;

`;
const Input = styled.input`
  border: none;
  outline: none;
  flex: 8;
  padding-left: 20px;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <SendOutlinedIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
