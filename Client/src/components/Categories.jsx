import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import CategoryItem from "./CategoryItem";
import { publicRequest } from "../../requestMethod";
import { useState } from "react";
import { category } from "../constant/category";

const Container = styled.div`
  display: flex;
  margin: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;
const Categories = () => {
  return (
    <Container>
      {category.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
