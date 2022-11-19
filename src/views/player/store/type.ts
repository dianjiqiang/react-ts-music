export interface currentSongType {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Array<{
    id: number;
    name: string;
    tns: Array<any>;
    alias: Array<any>;
  }>;
  alia: Array<any>;
  pop: number;
  st: number;
  rt: string;
  fee: number;
  v: number;
  crbt: any;
  cf: string;
  al: {
    id: number;
    name: string;
    picUrl: string;
    tns: Array<any>;
    pic_str: string;
    pic: number;
  };
  dt: number;
  h: {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
  };
  m: {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
  };
  l: {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
  };
  sq: {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
  };
  hr: any;
  a: any;
  cd: string;
  no: number;
  rtUrl: any;
  ftype: number;
  rtUrls: Array<any>;
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  originSongSimpleData: any;
  tagPicList: any;
  resourceState: boolean;
  version: number;
  songJumpInfo: any;
  entertainmentTags: any;
  awardTags: any;
  single: number;
  noCopyrightRcmd: any;
  mv: number;
  rtype: number;
  rurl: any;
  mst: number;
  cp: number;
  publishTime: number;
}
