import React, { memo, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { DiscoverStyle } from "./style";

import NavBar from "./c-cpns/nav-bar";

const Discover = memo(() => {
  return (
    <DiscoverStyle>
      <NavBar></NavBar>
      <Suspense fallback="">
        <Outlet></Outlet>
      </Suspense>
    </DiscoverStyle>
  );
});

Discover.displayName = "Discover";

export default Discover;
