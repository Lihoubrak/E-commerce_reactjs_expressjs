import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ClearIcon from "@mui/icons-material/Clear";
import { TokenRequest, publicRequest } from "../../requestMethod";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartContext from "../Context/CartContext";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const LoginBtn = styled.button`
  background-color: #2e7d32;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
`;

const SignupBtn = styled.button`
  background-color: #c62828;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const Cart = () => {
  const [cartItem, setCartItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [isdelete, setIsdelete] = useState(false);
  const { setItem } = useContext(CartContext);
  const TOKEN = Cookies.get("userInfo");
  const fetchCart = async () => {
    try {
      const res = TOKEN ? await TokenRequest.get(`/carts/find/`) : [];
      setCartItem(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchCart();
  }, [isdelete]);
  const quanlitys = cartItem
    ? cartItem.reduce(
        (accumulator, currentItem) => currentItem.quantity + accumulator,
        0
      )
    : 0;
  const increaseCart = async (productVariantId, quantity) => {
    try {
      const product =
        cartItem &&
        cartItem.find((item) => item.productVariantId === productVariantId);
      if (product.quantity >= product.stockQuantity) {
        Swal.fire({
          icon: "error",
          text: "Số lượng yêu cầu vượt quá số lượng hàng có sẵn.",
        });
      } else {
        const res = await TokenRequest.put(`/carts/${productVariantId}`, {
          quantity: quantity,
        });
        setIsdelete(quantity);
        setItem(quantity);
        setQuantity(quantity);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseCart = async (productVariantId, quantity) => {
    try {
      const res =
        quantity < 1
          ? await TokenRequest.delete(`/carts/${productVariantId}`)
          : await TokenRequest.put(`/carts/${productVariantId}`, {
              quantity: quantity,
            });
      setQuantity(quantity);
      setIsdelete(quantity);
      setItem(quantity);
    } catch (err) {
      console.error(err);
    }
  };

  const removeCart = async (productVariantId, quantity) => {
    try {
      const res = await TokenRequest.delete(`/carts/${productVariantId}`);
      setIsdelete(productVariantId);
      setItem(quantity+productVariantId);
    } catch (err) {
      console.error(err);
    }
  };
  const totalPrice = cartItem
    ? cartItem.reduce(
        (accumulator, currentItem) =>
          accumulator + currentItem.quantity * currentItem.price,
        0
      )
    : 0;
  const handleCheckout = async () => {
    if (cartItem) {
      try {
        const res = await publicRequest.post(
          "http://localhost:3000/api/stripe/checkout",
          { cartItem }
        );
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    }
    // else {
    //     Swal.fire({
    //       title: "Are you have an account?",
    //       showDenyButton: true,
    //       showCancelButton: true,
    //       confirmButtonText: "Login",
    //       denyButtonText: `Register`,
    //     }).then((result) => {
    //       /* Read more about isConfirmed, isDenied below */
    //       if (result.isConfirmed) {
    //         window.location.href("/auths/login");
    //       } else if (result.isDenied) {
    //         window.location.href("/auths/register");
    //       }
    //     });
    //   }
  };
  const handleCheckoutPayment = () => {
    const queryString = new URLSearchParams({
      state: JSON.stringify(cartItem),
    });
    // Redirect to the "/order" route with the encoded data
    window.location.href = "/order?" + queryString;
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <a href="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </a>
          <TopTexts>
            <TopText>Shopping Bag({quanlitys})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cartItem && cartItem.length > 0 ? (
              cartItem.map((cart, index) => {
                return (
                  <div key={index}>
                    <Hr />
                    <Product>
                      <ProductDetail>
                        <Image src={cart.image} />
                        <Details>
                          <ProductName>
                            <b>Product:</b> {cart.title}
                          </ProductName>
                          <ProductId>
                            <b>ID:</b> {cart.id}
                          </ProductId>
                          <ProductColor color={cart.color} />
                          <ProductSize>
                            <b>Size:</b> {cart.size}
                          </ProductSize>
                        </Details>
                      </ProductDetail>
                      <PriceDetail style={{ position: "relative" }}>
                        <ProductAmountContainer>
                          <AddIcon
                            onClick={() =>
                              increaseCart(
                                cart.productVariantId,
                                cart.quantity + 1
                              )
                            }
                          />
                          <ProductAmount>{cart.quantity}</ProductAmount>
                          <RemoveIcon
                            onClick={() =>
                              decreaseCart(
                                cart.productVariantId,
                                cart.quantity - 1
                              )
                            }
                          />
                        </ProductAmountContainer>
                        <ProductPrice>$ {cart.price}</ProductPrice>
                        <ClearIcon
                          onClick={() =>
                            removeCart(cart.productVariantId, cart.quantity)
                          }
                          style={{
                            position: "absolute",
                            top: "45%",
                            right: "20%",
                            cursor: "pointer",
                          }}
                        />
                      </PriceDetail>
                    </Product>
                    <Hr />
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "30px",
                  color: "GrayText",
                  padding: "20px",
                }}
              >
                You not have cart yet !!!
              </div>
            )}
          </Info>
          {cartItem &&
            cartItem.length > 0 && ( // Check if cartItem array is not empty
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
                </SummaryItem>
                <Button onClick={handleCheckoutPayment}>
                  CASH ON DELIVERY
                </Button>
                <Button onClick={handleCheckout}>CHECKOUT NOW</Button>
              </Summary>
            )}
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};
export default Cart;
