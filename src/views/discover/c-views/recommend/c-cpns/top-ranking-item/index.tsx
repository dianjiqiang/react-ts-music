import { useAppDispatch } from "@/store";
import { formatImageSize } from "@/utils/format";
import { fetchCurrentSongAction } from "@/views/player/store/player";
import React, { memo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { TopRankItemStyle } from "./style";

interface TopRankingItemPropsType {
  children?: ReactNode;
  itemData?: any;
}

const TopRankingItem: React.FC<TopRankingItemPropsType> = memo((props: TopRankingItemPropsType) => {
  const { itemData } = props;
  const { tracks = [] } = itemData;

  const dispatch = useAppDispatch();
  const isPlayer = (item: any) => {
    dispatch(fetchCurrentSongAction(item.id));
  };

  return (
    <TopRankItemStyle>
      <div className="header">
        <div className="image">
          <img src={formatImageSize(itemData.coverImgUrl, 80)} alt="" />
          <a href="" className="image_cover"></a>
        </div>
        <div className="info">
          <a href="">{itemData.name}</a>
          <div>
            <button className="btn play sprite_02"></button>
            <button className="btn favor sprite_02"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="list-item" key={item.id}>
              <div className="rank">{index + 1}</div>
              <div className="info">
                <span className="name text-nowrap">{item.name}</span>
                <div className="operate">
                  <button className="btn sprite_02 play" onClick={() => isPlayer(item)}></button>
                  <button className="btn sprite_icon2 addto"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer">
        <Link to="/discover/ranking">查看全部 &gt;</Link>
      </div>
    </TopRankItemStyle>
  );
});

TopRankingItem.displayName = "TopRankingItem";

export default TopRankingItem;
