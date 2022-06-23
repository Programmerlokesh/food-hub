import React from "react";

function MenuContainer({ link, icon, onClick }) {
  return (
    <li onClick={onClick}>
      <a href={link}>
        <span className="icon">{icon}</span>
      </a>
    </li>
  );
}

export default MenuContainer;
