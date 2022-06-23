import {
  AccountBalanceWalletRounded,
  Chat,
  Favorite,
  HomeRounded,
  Settings,
  SummarizeRounded,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import BannerName from "./components/BannerName";
import CartItem from "./components/CartItem";
import { Items, MenuItems } from "./components/Data";
import DebitCard from "./components/DebitCard";
import Header from "./components/Header";
import ItemCard from "./components/ItemCard";
import MenuCard from "./components/MenuCard";
import MenuContainer from "./components/MenuContainer";
import { useStateValue } from "./components/StateProvider";
import SubMenuContainer from "./components/SubMenuContainer";

const bottomMenus = [
  { link: "#", icon: <HomeRounded /> },
  { link: "#", icon: <Chat /> },
  { link: "#", icon: <AccountBalanceWalletRounded /> },
  { link: "#", icon: <Favorite /> },
  { link: "#", icon: <SummarizeRounded /> },
  { link: "#", icon: <Settings /> },
];
function App() {
  const menuList = useRef(null);
  const menuCard = useRef(null);

  // Maindish state
  const [isMainData, setMainData] = useState(
    Items.filter((element) => element.itemId === "buger01")
  );

  const [{ cart }, dispatch] = useStateValue();
  const handleClick = (e) => {
    [...menuList.current.children].forEach((n) => n.classList.remove("active"));
    e.target.classList.add("active");
  };

  const setMenuCardActive = (e) => {
    [...menuCard.current.children].forEach((n) => n.classList.remove("active"));
    e.target.classList.add("active");
  };
  useEffect(() => {
    // Buttom menu
    if (!menuList.current) return;
    [...menuList.current.children].forEach((n) => n.classList.remove("active"));

    [...menuList.current.children].slice(0, 1)[0].classList.add("active");

    // MenuCard active toggle
    if (!menuCard.current) return;

    [...menuCard.current.children].forEach((n) => n.classList.remove("active"));
    [...menuCard.current.children].slice(0, 1)[0].classList.add("active");
  }, [isMainData, cart]);

  // Set main dish item filter
  const setData = (itemId) => {
    setMainData(Items.filter((element) => element.itemId === itemId));
  };

  return (
    <div className="App">
      {/* Header Section */}
      <Header />

      {/* Main Container */}

      <main>
        <div className="mainContainer">
          {/* Banner */}
          <div className="banner">
            <BannerName name={"Lokesh Debnath"} discount={"200"} link={"#"} />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Fdelivery.png?alt=media&token=69b9823d-96df-452a-bd4e-14d27a4cc337"
              alt="delivery pic"
              className="deliveryPic"
            />
          </div>

          {/* DishContainer */}
          <div className="dishContainer">
            <div className="menuCard">
              <SubMenuContainer name={"Menu Category"} />
            </div>
            <div
              className="rowContainer"
              ref={menuCard}
              onClick={setMenuCardActive}
            >
              {MenuItems &&
                MenuItems.map((data) => (
                  <div
                    className={`rowMenuCard`}
                    key={data.id}
                    onClick={() => setData(data.itemId)}
                  >
                    <MenuCard imgSrc={data.imgSrc} name={data.name} />
                  </div>
                ))}
            </div>
            <div className="dishitemContainer">
              {isMainData &&
                isMainData.map((data) => (
                  <ItemCard
                    key={data.id}
                    itemId={data.itemId}
                    imgSrc={data.imgSrc}
                    name={data.name}
                    ratings={data.ratings}
                    price={data.price}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="rightMenu">
          <div className="debitCardContainer">
            <div className="debitCard">
              <DebitCard />
            </div>
          </div>

          {!cart ? (
            <div></div>
          ) : (
            <div className="cartCheckOutContainer">
              <SubMenuContainer name={"Cart Items"} />
              <div className="cartContainer">
                <div className="cartItems">
                  {cart &&
                    cart.map((data) => (
                      <CartItem
                        key={data.id}
                        itemId={data.itemId}
                        name={data.name}
                        imgSrc={data.imgSrc}
                        price={data.price}
                      />
                    ))}
                </div>
              </div>

              <div className="totalSection">
                <h3>Total</h3>
                <p>
                  <span>&#8377;</span> 250
                </p>
              </div>
              <button className="checkOut">Check Out</button>
            </div>
          )}
        </div>
      </main>

      {/* Buttom Menu */}
      <div className="buttomMenu">
        <ul id="menu" ref={menuList}>
          {bottomMenus.map((menu, index) => (
            <MenuContainer
              key={index}
              link={menu.link}
              icon={menu.icon}
              onClick={handleClick}
            />
          ))}

          <div className="indicator"></div>
        </ul>
      </div>
    </div>
  );
}

export default App;
