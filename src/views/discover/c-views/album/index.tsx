import React, { memo, type ReactNode } from "react";
import { AlbumStyle } from "./style";

interface AlbumPropsType {
  children?: ReactNode;
}

const Album: React.FC<AlbumPropsType> = memo(() => {
  return <AlbumStyle>Album</AlbumStyle>;
});

Album.displayName = "Album";

export default Album;
