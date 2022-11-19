import React, { memo, type ReactNode } from "react";
import { MineStyle } from "./style";

interface MinePropsType {
  children?: ReactNode;
}

const Mine: React.FC<MinePropsType> = memo(() => {
  return <MineStyle>Mine</MineStyle>;
});

Mine.displayName = "Mine";

export default Mine;
