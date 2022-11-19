import React, { memo, type ReactNode } from "react";
import { RankingStyle } from "./style";

interface RankingPropsType {
  children?: ReactNode;
}

const Ranking: React.FC<RankingPropsType> = memo(() => {
  return <RankingStyle>Ranking</RankingStyle>;
});

Ranking.displayName = "Ranking";

export default Ranking;
