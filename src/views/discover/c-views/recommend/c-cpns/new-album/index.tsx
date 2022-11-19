import AreaHeaderV1 from "@/components/area-header-v1";
import NewAlbumItem from "@/components/new-album-item";
import { useAppDispatch, useAppSelector } from "@/store";
import { Carousel } from "antd";
import React, { memo, useCallback, useRef, type ReactNode, type ElementRef, useEffect } from "react";
import { shallowEqual } from "react-redux";
import { fetchNewAlbumAction } from "../../store/recommend";
import { NewAlbumStyle } from "./style";

interface NewAlbumPropsType {
  children?: ReactNode;
}

const NewAlbum: React.FC<NewAlbumPropsType> = memo(() => {
  const carousel = useRef<ElementRef<typeof Carousel>>(null);
  const handleClick = useCallback((flag: boolean) => {
    if (flag) {
      carousel.current?.next();
    } else {
      carousel.current?.prev();
    }
  }, []);

  //获取数据
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNewAlbumAction());
  }, []);
  const { newAlbum } = useAppSelector(
    (state) => ({
      newAlbum: state.recommend.newAlbum
    }),
    shallowEqual
  );
  return (
    <NewAlbumStyle>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album"></AreaHeaderV1>
      <div className="content">
        <button className="arrow arrow-left sprite_02" onClick={() => handleClick(false)}></button>
        <div className="banner">
          <Carousel dots={false} ref={carousel} speed={1300}>
            {[0, 1].map((item) => {
              return (
                <div className="hashsb" key={item}>
                  <div className="album-list">
                    {newAlbum.slice(item * 5, (item + 1) * 5).map((album: any, index) => {
                      return <NewAlbumItem key={index} itemData={album} />;
                    })}
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
        <button className="arrow arrow-right sprite_02" onClick={() => handleClick(true)}></button>
      </div>
    </NewAlbumStyle>
  );
});

NewAlbum.displayName = "NewAlbum";

export default NewAlbum;
