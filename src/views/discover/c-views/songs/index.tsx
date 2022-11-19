import React, { memo, type ReactNode } from "react";
import { SongsStyle } from "./style";

interface SongsPropsType {
  children?: ReactNode;
}

const Songs: React.FC<SongsPropsType> = memo(() => {
  return <SongsStyle>Songs</SongsStyle>;
});

Songs.displayName = "Songs";

export default Songs;
