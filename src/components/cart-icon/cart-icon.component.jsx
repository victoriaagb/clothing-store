import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { setIsCartOpen, isCartOpen } = useContext(CartContext);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div onClick={toggleCart} className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
