import React, { memo, type ReactNode } from "react";
import { RouterLoadingStyle } from "./style";

import { Spin } from "antd";

interface RouterLoadingPropsType {
  children?: ReactNode;
}

const RouterLoading: React.FC<RouterLoadingPropsType> = memo(() => {
  return (
    <RouterLoadingStyle>
      <Spin tip="loading..."></Spin>
    </RouterLoadingStyle>
  );
});

RouterLoading.displayName = "RouterLoading";

export default RouterLoading;
