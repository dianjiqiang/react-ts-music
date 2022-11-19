import AreaHeaderV2 from "@/components/area-header-v2";
import React, { memo, type ReactNode } from "react";
import { HotAnchorStyle } from "./style";
import { hotRadios } from "@/assets/data/local-data";

interface HotAnchorPropsType {
  children?: ReactNode;
}

const HotAnchor: React.FC<HotAnchorPropsType> = memo(() => {
  return (
    <HotAnchorStyle>
      <AreaHeaderV2 title="热门主播"></AreaHeaderV2>
      <div className="anchor-list">
        {hotRadios.map((item) => {
          return (
            <div className="item" key={item.picUrl}>
              <a href="/discover/djradio" className="image">
                <img src={item.picUrl} alt="" />
              </a>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="position">{item.position}</div>
              </div>
            </div>
          );
        })}
      </div>
    </HotAnchorStyle>
  );
});

HotAnchor.displayName = "HotAnchor";

export default HotAnchor;
