import React, { memo, type ReactNode } from "react";
import { SongsItemStyle } from "./style";

import { formatFigures, formatImageSize } from "@/utils/format";

interface SongsItemPropsType {
  children?: ReactNode;
  itemData?: any;
}

const SongsItem: React.FC<SongsItemPropsType> = memo((props: SongsItemPropsType) => {
  const { itemData = {} } = props;
  return (
    <SongsItemStyle>
      <div className="cover-top">
        <img src={formatImageSize(itemData.picUrl, 140)} alt="" />
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span>
              <i className="sprite_icon headset"></i>
              {formatFigures(itemData.playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="cover-bottom text-nowrap">{itemData.name}</div>
    </SongsItemStyle>
  );
});

SongsItem.displayName = "SongsItem";

export default SongsItem;
