import React, { memo, type ReactNode } from "react";
import { FocusStyle } from "./style";

interface FocusPropsType {
  children?: ReactNode;
}

const Focus: React.FC<FocusPropsType> = memo(() => {
  return <FocusStyle>Focus</FocusStyle>;
});

Focus.displayName = "Focus";

export default Focus;
