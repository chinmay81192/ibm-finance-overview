import React from "react";
import "./styles.scss";
import StockValue from "../StockValue";

interface IHeader {
  title: string;
  subtitle: string;
}

const Header: React.FC<IHeader> = ({ subtitle, title }: IHeader) => {
  return (
    <header className="Header">
      <h1 className="MainTitle">{title}</h1>
      <span className="SubTitle">{subtitle}</span>
      <StockValue />
    </header>
  );
};

export default Header;
