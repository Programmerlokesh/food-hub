import { AddRounded, RemoveRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { actionType } from "./reducer";
import { useStateValue } from "./StateProvider";
let cartItems = [];

function CartItem({ name, imgSrc, itemId, price }) {
  const [quantity, setQuantity] = useState(1);
  const [{ cart }, dispatch] = useStateValue();
  const [itemPrice, setItemPrice] = useState(
    parseInt(quantity) * parseFloat(price)
  );

  useEffect(() => {
    cartItems = cart;
    setItemPrice(parseInt(quantity) * parseFloat(price));
  }, [quantity]);

  const updateQuantity = (action, id) => {
    if (action === "add") {
      setQuantity(quantity + 1);
    } else {
      if (quantity == 1) {
        cartItems.pop(id);
        dispatch({
          type: actionType.SET_CART,
          cart: cartItems,
        });
      }
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="cartItem">
      <div className="imgBox">
        <img src={imgSrc} alt="" />
      </div>
      <div className="itemSection">
        <h2 className="itemName">{name}</h2>
        <div className="itemQuantity">
          <span>x {quantity}</span>
          <div className="quantity">
            <RemoveRounded
              className="itemRemove"
              onClick={() => updateQuantity("remove", itemId)}
            />

            <AddRounded
              className="itemAdd"
              onClick={() => updateQuantity("add", itemId)}
            />
          </div>
        </div>
      </div>
      <p className="itemPrice">
        <span className="rupeeSign">&#8377;</span>
        <span className="itemPriceValue">{itemPrice}</span>
      </p>
    </div>
  );
}

export default CartItem;
