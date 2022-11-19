import React, { memo, Suspense } from "react";
import { AppStyle } from "./styled";
import { useRoutes } from "react-router-dom";
import routes from "./router";

import AppHeader from "./components/app-header";
import AppFooter from "./components/app-footer";
import AppPlayerBar from "./views/app-player-bar";
// import { useAppDispatch } from "./store";
// import { fetchCurrentSongAction } from "./views/player/store/player";

const App = memo(() => {
  // 获取某一首歌曲
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchCurrentSongAction(202369));
  // }, []);

  return (
    <AppStyle>
      <div className="App">
        <AppHeader></AppHeader>
        <Suspense fallback="">
          <div className="main">{useRoutes(routes)}</div>
        </Suspense>
        <AppFooter></AppFooter>
        <AppPlayerBar></AppPlayerBar>
      </div>
    </AppStyle>
  );
});

App.displayName = "MyApp";

export default App;
