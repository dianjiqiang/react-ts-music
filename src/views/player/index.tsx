import React, { memo, type ReactNode } from "react";
import { PlayerStyle } from "./style";

interface PlayerPropsType {
  children?: ReactNode;
}

const Player: React.FC<PlayerPropsType> = memo(() => {
  return <PlayerStyle>Player</PlayerStyle>;
});

Player.displayName = "Player";

export default Player;
