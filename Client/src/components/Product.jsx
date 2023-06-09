import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../../requestMethod";
import ProductItem from "./ProductItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Product = ({ cate, filter, sort }) => {
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  function toSentenceCase(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await publicRequest.get(
        cate ? `/products/category/${toSentenceCase(cate)}` : "/products/"
      );

      setProduct(res.data);
      setFilteredProducts(res.data);
    };

    if (filter && filter.size && filter.color) {
      const fetchProductFilter = async () => {
        const res = await publicRequest.get(
          `products/category/${toSentenceCase(cate)}?size=${
            filter.size
          }&color=${filter.color}`
        );
        setFilteredProducts(res.data);
      };
      fetchProductFilter();
    } else {
      fetchProduct();
    }
  }, [cate, filter]);
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  return (
    <Container>
      {cate
        ? filteredProducts.map((item) => (
            <ProductItem item={item} key={item.id} />
          ))
        : product
            .slice(0, 8)
            .map((item, index) => <ProductItem item={item} key={index} />)}
    </Container>
  );
};

export default Product;
