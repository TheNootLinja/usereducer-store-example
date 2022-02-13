import styled from "styled-components";
import useShop from "./ShopContext";
import ProductCard from "./ProductCard";

const Cart = () => {
  const { products, total } = useShop();
  return (
    <div>
      <Title>Your cart total is {total}.00$</Title>
      <StyledCart>
        {products.map((product, index) => (
          <ProductCard {...product} key={index} />
        ))}
      </StyledCart>
    </div>
  );
};

export default Cart;

const Title = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin-top: 20px;
`;

const StyledCart = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;
