import React, { memo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AreaHeaderV1Style } from "./style";

interface AreaHeaderV1PropsType {
  children?: ReactNode;
  keywords?: string[];
  title?: string;
  moreText?: string;
  moreLink?: string;
}

const AreaHeaderV1: React.FC<AreaHeaderV1PropsType> = memo((props: AreaHeaderV1PropsType) => {
  const { keywords = [], title = "音乐", moreText = "更多", moreLink = "/" } = props;
  return (
    <AreaHeaderV1Style className="sprite_02">
      <div className="left">
        <h3 className="title">{title}</h3>
        <div className="keywords">
          {keywords.map((item) => (
            <div className="item" key={item}>
              <span className="text link">{item}</span>
              <span className="divider">|</span>
            </div>
          ))}
        </div>
      </div>
      <div className="right">
        <Link className="more" to={moreLink}>
          {moreText}
        </Link>
        <i className="sprite_02 icon"></i>
      </div>
    </AreaHeaderV1Style>
  );
});

AreaHeaderV1.displayName = "AreaHeaderV1";

export default AreaHeaderV1;
