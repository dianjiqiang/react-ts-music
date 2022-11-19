import React, { memo, type ReactNode } from "react";
import { AreaHeaderV2Style } from "./style";

interface AreaHeaderV2PropsType {
  children?: ReactNode;
  title?: string;
  isMore?: boolean;
  morePath?: string;
}

const AreaHeaderV2: React.FC<AreaHeaderV2PropsType> = memo((props: AreaHeaderV2PropsType) => {
  const { title, isMore = false, morePath } = props;

  let moreEl;
  if (isMore) {
    moreEl = <a href={morePath}>查看更多 &gt;</a>;
  }
  return (
    <AreaHeaderV2Style>
      <h3 className="title">{title}</h3>
      {moreEl}
    </AreaHeaderV2Style>
  );
});

AreaHeaderV2.displayName = "AreaHeaderV2";

export default AreaHeaderV2;
