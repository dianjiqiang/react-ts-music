import React, { memo, type ReactNode } from "react";
import { ArtistStyle } from "./style";

interface ArtistPropsType {
  children?: ReactNode;
}

const Artist: React.FC<ArtistPropsType> = memo(() => {
  return <ArtistStyle>Artist</ArtistStyle>;
});

Artist.displayName = "Artist";

export default Artist;
