import { formatImageSize } from "@/utils/format";
import React, { memo, type ReactNode } from "react";
import { NewAlbumItemStyle } from "./style";

interface NewAlbumItemPropsType {
  children?: ReactNode;
  itemData: any;
}

const NewAlbumItem: React.FC<NewAlbumItemPropsType> = memo((props: NewAlbumItemPropsType) => {
  const { itemData = {} } = props;

  return (
    <NewAlbumItemStyle>
      <div className="top">
        <img src={formatImageSize(itemData.coverUrl, 100)} alt="" />
        <a href={itemData.coverUrl} className="sprite_cover cover"></a>
      </div>
      <div className="bottom">
        <div className="name">{itemData.albumName}</div>
        <div className="artist">{itemData.artistName}</div>
      </div>
    </NewAlbumItemStyle>
  );
});

NewAlbumItem.displayName = "NewAlbumItem";

export default NewAlbumItem;
