import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArtistList, getBanners, getHotRecommend, getNewAlbum, getPlayListDetail } from "../service/recommend";

export const featchBannerDataAction = createAsyncThunk("banner", (_, { dispatch }) => {
  getBanners().then((res) => {
    dispatch(changeBanners(res.banners));
  });
});

export const getchHotRecommendAction = createAsyncThunk("hotRecommend", (_, { dispatch }) => {
  getHotRecommend(8).then((res) => {
    dispatch(changeHotRecommend(res.result));
  });
});

export const fetchNewAlbumAction = createAsyncThunk("newAlbum", (_, { dispatch }) => {
  getNewAlbum(10).then((res) => {
    dispatch(changeNewAlbum(res.products));
  });
});

// 榜单数据
export const fetchPlayListDetailAction = createAsyncThunk("playListDetail", (_, { dispatch }) => {
  Promise.all([getPlayListDetail(19723756), getPlayListDetail(3779629), getPlayListDetail(2884035)]).then((res) => {
    dispatch(changeRankAction(res.map((item: any) => item.playlist)));
  });
});

//入驻歌手
export const fetchArtistList = createAsyncThunk("artistList", (_, { dispatch }) => {
  getArtistList(5001, 5).then((res) => {
    dispatch(changeSettleSingerAction(res.artists));
  });
});

const recommendStore = createSlice({
  name: "recommend",
  initialState: {
    banners: [],
    hotRecommend: [],
    newAlbum: [],
    rankings: [],
    settleSingers: []
  },
  reducers: {
    changeBanners(state, { payload }) {
      state.banners = payload;
    },
    changeHotRecommend(state, { payload }) {
      state.hotRecommend = payload;
    },
    changeNewAlbum(state, { payload }) {
      state.newAlbum = payload;
    },
    changeRankAction(state, { payload }) {
      state.rankings = payload;
    },
    changeSettleSingerAction(state, { payload }) {
      state.settleSingers = payload;
    }
  }
});

export default recommendStore.reducer;
export const { changeBanners, changeHotRecommend, changeNewAlbum, changeRankAction, changeSettleSingerAction } =
  recommendStore.actions;
