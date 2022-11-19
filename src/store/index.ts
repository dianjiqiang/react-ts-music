import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";

import counterReducer from "./modules/counter";
import recommendReducer from "@/views/discover/c-views/recommend/store/recommend";
import playerReducer from "@/views/player/store/player";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    recommend: recommendReducer,
    player: playerReducer
  }
});

type GetStateFnType = typeof store.getState;
export type FnReturnType = ReturnType<GetStateFnType>;
type DispatchType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<FnReturnType> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;

export default store;
