import React, { memo, type ReactNode } from "react";
import { DownloadStyle } from "./style";

interface DownloadPropsType {
  children?: ReactNode;
}

const Download: React.FC<DownloadPropsType> = memo(() => {
  return <DownloadStyle>Download</DownloadStyle>;
});

Download.displayName = "Download";

export default Download;
