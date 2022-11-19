import AreaHeaderV1 from "@/components/area-header-v1";
import { useAppDispatch, useAppSelector } from "@/store";
import React, { memo, useEffect, type ReactNode } from "react";
import { fetchPlayListDetailAction } from "../../store/recommend";
import TopRankingItem from "../top-ranking-item";
import { TopRankingStyle } from "./style";

interface TopRankingPropsType {
  children?: ReactNode;
}

const TopRanking: React.FC<TopRankingPropsType> = memo(() => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPlayListDetailAction());
  }, []);
  // 获取榜单数据
  const { rankings } = useAppSelector((state) => ({
    rankings: state.recommend.rankings
  }));
  return (
    <TopRankingStyle>
      <AreaHeaderV1 title="榜单" moreLink="/discover/ranking"></AreaHeaderV1>
      <div className="content">
        {rankings.map((item, index) => (
          <TopRankingItem key={index} itemData={item}></TopRankingItem>
        ))}
      </div>
    </TopRankingStyle>
  );
});

TopRanking.displayName = "TopRanking";

export default TopRanking;
