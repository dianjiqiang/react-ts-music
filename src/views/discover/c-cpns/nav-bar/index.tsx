import React, { memo, type ReactNode } from "react";
import { NavBarStyle } from "./style";
import { NavLink } from "react-router-dom";

import { discoverMenu } from "@/assets/data/local-data";

interface NavBarPropsType {
  children?: ReactNode;
}

const NavBar: React.FC<NavBarPropsType> = memo(() => {
  return (
    <NavBarStyle className="top">
      <div className="wrap-v1 nav ">
        {discoverMenu.map((item) => (
          <div className="item" key={item.title}>
            <NavLink to={item.link}>{item.title}</NavLink>
          </div>
        ))}
      </div>
    </NavBarStyle>
  );
});

NavBar.displayName = "NavBar";

export default NavBar;
