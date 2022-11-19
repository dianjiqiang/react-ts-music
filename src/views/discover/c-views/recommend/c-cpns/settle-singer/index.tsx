import AreaHeaderV2 from "@/components/area-header-v2";
import React, { memo, useEffect, type ReactNode } from "react";
import { SettleSingerStyle } from "./style";
import { fetchArtistList } from "../../store/recommend";
import { useAppDispatch, useAppSelector } from "@/store";
import { shallowEqual } from "react-redux";
import { formatImageSize } from "@/utils/format";

interface SettleSingerPropsType {
  children?: ReactNode;
}

const SettleSinger: React.FC<SettleSingerPropsType> = memo(() => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchArtistList());
  }, []);
  // 接收数据
  const { settleSingers } = useAppSelector(
    (state) => ({
      settleSingers: state.recommend.settleSingers
    }),
    shallowEqual
  );
  return (
    <SettleSingerStyle>
      <AreaHeaderV2 title="入驻歌手" isMore={true} morePath="/discover/artist"></AreaHeaderV2>
      <div className="singer-list">
        {settleSingers.map((item: any) => {
          return (
            <a href="/singer" key={item.id} className="item">
              <img src={formatImageSize(item.img1v1Url, 62)} alt="" />
              <div className="info">
                <div className="singer">{item.name}</div>
                <div className="desc">{item.alias.join("") || item.name}</div>
              </div>
            </a>
          );
        })}
      </div>
      <div className="apply-for">
        <a href="">申请成为网易音乐人</a>
      </div>
    </SettleSingerStyle>
  );
});

SettleSinger.displayName = "SettleSinger";

export default SettleSinger;
