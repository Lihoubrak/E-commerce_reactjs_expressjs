import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../responsive";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Product from "../components/Product";
const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FliterContainer = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-between;
`;
const FliterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;
const Fliter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const ProductList = () => {
  const cate = useParams();
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const handleFilter = (e) => {
    setFilter((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cate.category}</Title>
      <FliterContainer>
        <Fliter>
          <FliterText>Filter Products:</FliterText>
          <Select name="color" onChange={handleFilter}>
            <Option defaultValue>Color</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Putty</Option>
            <Option>Bronze</Option>
            <Option>Tusk</Option>
            <Option>Dark</Option>
          </Select>
          <Select name="size" onChange={handleFilter}>
            <Option defaultValue>Size</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
          </Select>
        </Fliter>
        <Fliter>
          <FliterText>Sort Products:</FliterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest" defaultValue>
              Newest
            </Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Fliter>
      </FliterContainer>
      <Product cate={cate.category} filter={filter} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
