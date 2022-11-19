import React, { memo, type ReactNode } from "react";
import { DjradioStyle } from "./style";

interface DjradioPropsType {
  children?: ReactNode;
}

const Djradio: React.FC<DjradioPropsType> = memo(() => {
  return <DjradioStyle>Djradio</DjradioStyle>;
});

Djradio.displayName = "Djradio";

export default Djradio;
