import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { publicRequest, TokenRequest } from "../../requestMethod";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../../responsive";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import CartContext from "../Context/CartContext";
import { Login } from "@mui/icons-material";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  background-color: #e5e6eb;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.color === "Putty"
      ? "#8C876E"
      : props.color === "Dark"
      ? "#725d43"
      : props.color === "Tusk"
      ? "#dbd1c0"
      : props.color === "Brown"
      ? "#715639"
      : props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;
const SingleProduct = () => {
  const { id: ProductId } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("S");
  const { setItem, item } = useContext(CartContext);
  const sizes = product.ProductVariants?.map((variant) => variant.size) || [];
  const uniqueSizes = [...new Set(sizes)];

  const colors = product.ProductVariants?.map((variant) => variant.color) || [];
  const uniqueColors = [...new Set(colors)];

  const images = product.ProductVariants?.map((variant) => variant.image) || [];
  const uniqueImages = [...new Set(images)];
  const quantitys =
    product.ProductVariants?.map((variant) => variant.quantity) || [];

  const imageIndex = uniqueImages?.findIndex((image) => image === currentImage);
  const stockQuanlity = imageIndex != -1 ? quantitys[imageIndex] : 0;
  const getSingleProduct = async () => {
    try {
      const response = await publicRequest.get(`/products/find/${ProductId}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, [ProductId]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      setQuantity((prevQuantity) =>
        prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
      );
    } else if (type === "inc") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };
  const handleAddCart = async () => {
    if (!color || !size) {
      Swal.fire({
        icon: "error",
        text: "Vui lòng chọn size hoặc màu mà bạn thích. Xin cảm ơn.",
      });
    } else {
      if (quantity >= quantitys[imageIndex]) {
        Swal.fire({
          icon: "error",
          text: "Số lượng yêu cầu vượt quá số lượng hàng có sẵn.",
        });
      } else {
        try {
          const response = await TokenRequest.post(`/carts/${ProductId}`, {
            quantity,
            size,
            color,
          });
          setItem((prev) => prev + quantity);
        } catch (error) {
          if (error.response && error.response.status) {
            Swal.fire({
              icon: "error",
              text: "Số lượng yêu cầu vượt quá số lượng hàng có sẵn.",
            });
          } else {
            console.error(error);
          }
        }
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={currentImage || product.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {uniqueColors.map((c) => (
                <FilterColor
                  key={c}
                  color={c}
                  onClick={() => {
                    setColor(c);
                    setCurrentImage(uniqueImages[uniqueColors.indexOf(c)]);
                  }}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {uniqueSizes.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <span>
            Stock :{" "}
            {currentImage ? (
              stockQuanlity
            ) : (
              <small>
                <strong>click chon color image for check stock</strong>
              </small>
            )}
          </span>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <AddIcon onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleAddCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default SingleProduct;
