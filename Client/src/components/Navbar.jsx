import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../../responsive";
import CartContext from "../Context/CartContext";
import { TokenRequest } from "../../requestMethod";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const MediaItem = styled.span`
  font-size: 14px;
  cursor: pointer;
  margin: 15px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}

  &:hover {
    /* Define the styles for the hover state here */
    color: red;
    /* Add any other styles you want for the hover state */
  }
`;
const LogoutButton = styled.span`
  font-size: 14px;
  cursor: pointer;
  margin: 15px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}

  &:hover {
    /* Define the styles for the hover state here */
    color: red;
    /* Add any other styles you want for the hover state */
  }
`;

const Navbar = () => {
  const { item } = useContext(CartContext);
  const [cartItem, setCartItem] = useState(null);
  const TOKEN = Cookies.get("userInfo");
  const user = TOKEN ? jwtDecode(TOKEN).username : null;

  const handleLogout = () => {
    // Perform logout actions here, such as clearing cookies or local storage
    Cookies.remove("userInfo");
    // You may also need to clear any state related to the logged-in user
    setCartItem(null);
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = TOKEN ? await TokenRequest.get(`/carts/find/`) : [];
        setCartItem(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, [item]);

  const totalQuantity = cartItem
    ? cartItem.reduce(
        (accumulator, currentItem) => accumulator + currentItem.quantity,
        0
      )
    : 0;

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>LAMADA.</Logo>
        </Center>
        <Right>
          {user ? (
            <>
              <MediaItem>{user.toUpperCase()}</MediaItem>
              <LogoutButton onClick={handleLogout}>LOGOUT</LogoutButton>
            </>
          ) : (
            <>
              <a style={{ textDecoration: "none" }} href="auths/register">
                <MediaItem>REGISTER</MediaItem>
              </a>
              <a style={{ textDecoration: "none" }} href="auths/login">
                <MediaItem>SIGN IN</MediaItem>
              </a>
            </>
          )}
          <a href="/cart">
            <MediaItem>
              <Badge color="secondary" badgeContent={totalQuantity}>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MediaItem>
          </a>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
