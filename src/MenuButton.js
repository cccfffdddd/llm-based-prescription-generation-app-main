import React from 'react';
import menuIcon from './menu_button.png'; 

const MenuButton = ({ onClick }) => (
  <button className="menu-button" onClick={onClick}>
    <img src={menuIcon} alt="Menu" />
  </button>
);

export default MenuButton;
