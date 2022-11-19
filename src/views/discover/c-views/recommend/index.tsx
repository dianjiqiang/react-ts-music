import { useAppDispatch, useAppSelector } from "@/store";
import React, { memo, useEffect, type ReactNode } from "react";
import { shallowEqual } from "react-redux";
import { featchBannerDataAction } from "./store/recommend";
import { RecommendStyle } from "./style";

import TopBanner from "./c-cpns/top-banner";
import HotRecommend from "./c-cpns/hot-recommend";
import NewAlbum from "./c-cpns/new-album";
import TopRanking from "./c-cpns/top-ranking";
import UserLogin from "./c-cpns/user-login";
import SettleSinger from "./c-cpns/settle-singer";
import HotAnchor from "./c-cpns/hot-anchor";

interface RecommendPropsType {
  children?: ReactNode;
}

const Recommend: React.FC<RecommendPropsType> = memo(() => {
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(featchBannerDataAction());
  }, []);

  return (
    <RecommendStyle>
      <TopBanner banners={banners}></TopBanner>
      <div className="content wrap-v2">
        <div className="left">
          <HotRecommend></HotRecommend>
          <NewAlbum></NewAlbum>
          <TopRanking></TopRanking>
        </div>
        <div className="right">
          <UserLogin></UserLogin>
          <SettleSinger></SettleSinger>
          <HotAnchor></HotAnchor>
        </div>
      </div>
    </RecommendStyle>
  );
});

Recommend.displayName = "Recommend";

export default Recommend;
