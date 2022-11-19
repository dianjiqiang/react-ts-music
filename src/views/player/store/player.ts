import type { FnReturnType } from "./../../../store/index";
import { formatLyric } from "@/utils/format";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSongDetail, getSongLyric } from "../service/player";
import type { currentSongType } from "./type";

export const fetchCurrentSongAction = createAsyncThunk<void, number, { state: FnReturnType }>(
  "currentSong",
  (id: number, { dispatch, getState }) => {
    const playSongList = getState().player.playSongList;
    const findIndex = playSongList.findIndex((item) => item.id === id);
    if (findIndex === -1) {
      getSongDetail(id).then((res) => {
        dispatch(changeCurrentSongAction(res.songs[0]));
        // 存放列表
        dispatch(changePlaySongListAction([...playSongList, res.songs[0]]));
      });
    } else {
      const song = playSongList[findIndex];
      dispatch(changeCurrentSongAction(song));
      dispatch(changePlaySongIndexAction(findIndex));
    }

    getSongLyric(id).then((res: any) => {
      dispatch(changeSongLyric(res.lrc.lyric));
    });
  }
);

export const changeMusicAction = createAsyncThunk<void, boolean, { state: FnReturnType }>(
  "changeMusic",
  (payload, { dispatch, getState }) => {
    const { playMode, playSongIndex, playSongList } = getState().player;

    // 获取新歌曲的索引
    let newIndex = playSongIndex;

    // 如果是单曲循环过来的 直接送走
    if ((payload as any) === "dqxh") {
      const song = playSongList[newIndex];
      dispatch(fetchCurrentSongAction(song.id));
      return;
    }

    if (playMode === 1) {
      newIndex = Math.floor(Math.random() * playSongList.length);
    } else {
      newIndex = payload ? playSongIndex + 1 : playSongIndex - 1;
      if (newIndex > playSongList.length - 1) newIndex = 0;
      if (newIndex < 0) newIndex = playSongList.length - 1;
    }

    // 获取当前的歌曲
    const song = playSongList[newIndex];
    dispatch(fetchCurrentSongAction(song.id));
  }
);
// 一曲结束
export const changeMusicOverAction = createAsyncThunk<void, boolean, { state: FnReturnType }>(
  "musicOver",
  (_, { dispatch, getState }) => {
    const playMode = getState().player.playMode;
    if (playMode === 2) {
      dispatch(changeMusicAction("dqxh" as any));
    } else {
      dispatch(changeMusicAction(true));
    }
  }
);

interface initialStateType {
  currentSong: currentSongType;
  songLyric: Array<{ time: number; name: string }>;
  lyricIndex: number;
  playSongList: currentSongType[];
  playSongIndex: number;
  playMode: number;
}

const initialState: initialStateType = {
  currentSong: JSON.parse(window.localStorage.getItem("currentSong") as string) || {
    name: "温柔",
    id: 4877413,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 13193,
        name: "五月天",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: "600902000000028836",
    fee: 8,
    v: 805,
    crbt: null,
    cf: "",
    al: {
      id: 490063,
      name: "涩女郎 电视原声带",
      picUrl: "https://p2.music.126.net/7pvCROH2UGqGAszPS5WfSw==/109951163093296876.jpg",
      tns: [],
      pic_str: "109951163093296876",
      pic: 109951163093296880
    },
    dt: 272371,
    h: {
      br: 320000,
      fid: 0,
      size: 10897285,
      vd: -70567,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 6538388,
      vd: -70567,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 4358940,
      vd: -70567,
      sr: 44100
    },
    sq: {
      br: 1019413,
      fid: 0,
      size: 34707450,
      vd: -70567,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "1",
    no: 6,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 2,
    s_id: 0,
    mark: 1125899906850816,
    originCoverType: 1,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 805,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mv: 0,
    rtype: 0,
    rurl: null,
    mst: 9,
    cp: 684010,
    publishTime: 1028131200000
  },
  songLyric: JSON.parse(window.localStorage.getItem("songLyric") as string) || [
    { time: 0, text: " 作词 : 五月天 阿信" },
    { time: 214, text: " 作曲 : 五月天 阿信" },
    { time: 428, text: " 编曲 : 五月天" },
    { time: 642, text: " 制作人 : 陈建良+五月天" },
    { time: 856, text: " 管乐 : 黄任贤+赖怡蒨（陈建良+五月天/敬业录音室+288录音室）" },
    {
      time: 1070,
      text: " 录音助理 : Yasuhiko Miyasaka/河口湖Studio+Shigeki Serizawa/Sound Crew Studio"
    },
    { time: 1284, text: " 混音 : 北城“Hakase”浩志" },
    { time: 1498, text: " OP : Rock Music Publishing (TWN) Co./Ltd." },
    { time: 1712, text: " 弦乐 : 李琪+吴世杰+何君恒+马纪伟+蓝国融+侯勇光（徐慕增/上赫录音室）" },
    {
      time: 1926,
      text: " 录音 : 北城“Hakase”浩志/河口湖Studio+Sound Crew Studio&陈建良/敬业录音室&五月天/五月天研究所+288录音室"
    },
    { time: 2140, text: " 母带后期处理 : 王舒屏/异术录音室" },
    { time: 2354, text: " 管弦乐团 : 陈建良+五月天" },
    { time: 2568, text: " 演奏 : 五月天" },
    { time: 2782, text: " 和声 : 五月天" },
    { time: 3000, text: "" },
    { time: 13480, text: "走在风中 今天阳光" },
    { time: 16560, text: "突然好温柔" },
    { time: 20000, text: "天的温柔 地的温柔" },
    { time: 23000, text: "像你抱着我" },
    { time: 26380, text: "然后发现你的改变" },
    { time: 29510, text: "孤单的今后" },
    { time: 32000, text: "如果冷 该怎么度过" },
    { time: 40250, text: "" },
    { time: 42690, text: "天边风光 身边的我" },
    { time: 45770, text: "都不在你眼中" },
    { time: 49100, text: "你的眼中藏着什么" },
    { time: 52220, text: "我从来都不懂" },
    { time: 55670, text: "没有关系 你的世界" },
    { time: 58650, text: "就让你拥有" },
    { time: 61150, text: "不打扰 是我的温柔" },
    { time: 65910, text: "" },
    { time: 71450, text: "不知道 不明了 不想要" },
    { time: 73700, text: "为什么我的心" },
    { time: 77940, text: "明明是想靠近" },
    { time: 81070, text: "却孤单到黎明" },
    { time: 84450, text: "不知道 不明了 不想要" },
    { time: 86680, text: "为什么我的心" },
    { time: 90760, text: "那爱情的绮丽" },
    { time: 94060, text: "总是在孤单里" },
    { time: 97280, text: "再把我的最好的爱给你" },
    { time: 103530, text: "" },
    { time: 104290, text: "不知不觉 不情不愿" },
    { time: 107310, text: "又到巷子口" },
    { time: 110800, text: "我没有哭 也没有笑" },
    { time: 113920, text: "因为这是梦" },
    { time: 117320, text: "没有预兆 没有理由" },
    { time: 120270, text: "你真的有说过" },
    { time: 122720, text: "如果有 就让你自由" },
    { time: 128770, text: "" },
    { time: 152620, text: "不知道 不明了 不想要" },
    { time: 154860, text: "为什么我的心" },
    { time: 158980, text: "明明是想靠近" },
    { time: 162190, text: "却孤单到黎明" },
    { time: 165360, text: "不知道 不明了 不想要" },
    { time: 167910, text: "为什么我的心" },
    { time: 171910, text: "那爱情的绮丽" },
    { time: 175120, text: "总是在孤单里" },
    { time: 178310, text: "再把我的最好的爱给你" },
    { time: 184250, text: "" },
    { time: 185330, text: "不知不觉 不情不愿" },
    { time: 188390, text: "又到巷子口" },
    { time: 191850, text: "我没有哭 也没有笑" },
    { time: 194960, text: "因为这是梦" },
    { time: 198180, text: "没有预兆 没有理由" },
    { time: 201380, text: "你真的有说过" },
    { time: 203930, text: "如果有 就让你自由" },
    { time: 211990, text: "" },
    { time: 213730, text: "自由" },
    { time: 218910, text: "这是我的温柔" },
    { time: 222190, text: "这是我的温柔" },
    { time: 225300, text: "这是我的温柔" },
    { time: 228630, text: "这是我的" },
    { time: 233190, text: "温柔" },
    { time: 235200, text: "" },
    { time: 243820, text: "让你自由" },
    { time: 257450, text: "" }
  ],
  lyricIndex: -1,
  playSongList: JSON.parse(window.localStorage.getItem("playSongList") as string) || [
    {
      name: "温柔",
      id: 4877413,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 13193,
          name: "五月天",
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: "600902000000028836",
      fee: 8,
      v: 805,
      crbt: null,
      cf: "",
      al: {
        id: 490063,
        name: "涩女郎 电视原声带",
        picUrl: "https://p2.music.126.net/7pvCROH2UGqGAszPS5WfSw==/109951163093296876.jpg",
        tns: [],
        pic_str: "109951163093296876",
        pic: 109951163093296880
      },
      dt: 272371,
      h: {
        br: 320000,
        fid: 0,
        size: 10897285,
        vd: -70567,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 6538388,
        vd: -70567,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4358940,
        vd: -70567,
        sr: 44100
      },
      sq: {
        br: 1019413,
        fid: 0,
        size: 34707450,
        vd: -70567,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: "1",
      no: 6,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 2,
      s_id: 0,
      mark: 1125899906850816,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 805,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      mv: 0,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 684010,
      publishTime: 1028131200000
    }
  ],
  playSongIndex: JSON.parse(window.localStorage.getItem("playSongIndex") as string) || 0,
  playMode: JSON.parse(window.localStorage.getItem("playMode") as string) || 0
};

const playerStore = createSlice({
  name: "player",
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload;
      window.localStorage.setItem("currentSong", JSON.stringify(payload));
    },
    changeSongLyric(state, { payload }) {
      payload = formatLyric(payload);

      state.songLyric = payload;

      window.localStorage.setItem("songLyric", JSON.stringify(payload));
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload;
    },
    changePlaySongIndexAction(state, { payload }) {
      state.playSongIndex = payload;
      window.localStorage.setItem("playSongIndex", JSON.stringify(payload));
    },
    changePlaySongListAction(state, { payload }) {
      state.playSongList = payload;
      window.localStorage.setItem("playSongList", JSON.stringify(payload));
    },
    changePlayModeAction(state, { payload }) {
      state.playMode = payload;
      window.localStorage.setItem("playMode", JSON.stringify(payload));
    }
  }
});

export default playerStore.reducer;

export const {
  changeCurrentSongAction,
  changeSongLyric,
  changeLyricIndexAction,
  changePlaySongIndexAction,
  changePlaySongListAction,
  changePlayModeAction
} = playerStore.actions;
