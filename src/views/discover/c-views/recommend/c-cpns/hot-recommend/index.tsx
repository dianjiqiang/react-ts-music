import React, { memo, useEffect, type ReactNode } from "react";
import { HotRecommendStyle } from "./style";
import AreaHeaderV1 from "@/components/area-header-v1";
import { getchHotRecommendAction } from "@/views/discover/c-views/recommend/store/recommend";
import { useAppDispatch, useAppSelector } from "@/store";
import { shallowEqual } from "react-redux";
import SongsItem from "@/components/songs-item";

interface HotRecommendPropsType {
  children?: ReactNode;
}

const HotRecommend: React.FC<HotRecommendPropsType> = memo(() => {
  const { hotRecommend } = useAppSelector(
    (state) => ({
      hotRecommend: state.recommend.hotRecommend
    }),
    shallowEqual
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getchHotRecommendAction());
  }, [dispatch]);
  return (
    <HotRecommendStyle>
      <AreaHeaderV1
        title="热门推荐"
        keywords={["华语", "流行", "摇滚", "民谣", "电子"]}
        moreLink="/discover/songs"
      ></AreaHeaderV1>
      <div className="recommend-list">
        {hotRecommend.map((item: any) => {
          return <SongsItem key={item.id} itemData={item}></SongsItem>;
        })}
      </div>
    </HotRecommendStyle>
  );
});

HotRecommend.displayName = "HotRecommend";

export default HotRecommend;
