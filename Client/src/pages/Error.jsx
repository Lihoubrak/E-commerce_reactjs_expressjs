import styled from "styled-components";
import { keyframes } from "styled-components";
const Error = () => {
  const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
  const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #85ffbd;
    background-image: linear-gradient(45deg, #85ffbd 0%, #fffb7d 100%);
    animation: ${fadeIn} 0.5s ease-in;
  `;
  const OrderText = styled.div`
    font-size: 200px;
  `;
  const OrderButton = styled.button`
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    &:hover {
      background-color: wheat;
      color: red;
    }
  `;
  const Wrapp = styled.div`
    width: 30%;
    height: 30%;
    text-align: center;
  `;
  return (
    <Container>
      <Wrapp>
        <OrderText>404</OrderText>
        <OrderText style={{fontSize : "50px"}}>Page Not Found</OrderText>
        <a href="/">
          {" "}
          <OrderButton>Go to HomePage</OrderButton>
        </a>
      </Wrapp>
    </Container>
  );
};

export default Error;
