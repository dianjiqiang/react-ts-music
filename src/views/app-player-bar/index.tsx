import React, { memo, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AppPlayerBarStyle, BarControl, BarOperator, BarPlayInfo } from "./style";
import { Slider, message } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { formatImageSize, formatTime } from "@/utils/format";
import { getSongPlayUrl } from "@/utils/handle-payer";
import { shallowEqual } from "react-redux";
import dayjs from "dayjs";
import {
  changeLyricIndexAction,
  changeMusicAction,
  changeMusicOverAction,
  changePlayModeAction
} from "../player/store/player";

interface AppPlayerBarPropsType {
  children?: ReactNode;
}

const AppPlayerBar: React.FC<AppPlayerBarPropsType> = memo(() => {
  const { currentSong, songLyric, lyricIndex, playMode } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      songLyric: state.player.songLyric,
      lyricIndex: state.player.lyricIndex,
      playMode: state.player.playMode
    }),
    shallowEqual
  );
  const dispatch = useAppDispatch();
  const [progress, setProgress] = useState(0); // 获取当前时间

  //获取播放器
  const [isPlayer, setIsPlayer] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = getSongPlayUrl(currentSong.id);
      audioRef.current
        .play()
        .then(() => setIsPlayer(true))
        .catch((err) => {
          if ((err + "").includes("Failed to load because no supported source was found")) {
            message.warning("猫的版权");
          }
        });
    }
    currentDTRef.current = currentSong.dt;
    // 获取同步数据 避免上次数据
  }, [currentSong, songLyric]);

  //播放
  const handleAudioClick = useCallback(() => {
    const player = !isPlayer;
    setIsPlayer(!isPlayer);
    if (audioRef.current && player) {
      audioRef.current.play().catch((err) => {
        console.log("播放失败", err);
      });
    } else if (audioRef.current && !player) {
      audioRef.current.pause();
    }
    currentDTRef.current = currentSong.dt;
  }, [isPlayer]);

  // 获取时间
  const [currentTime, setCurrent] = useState(0);
  const currentDTRef = useRef(0);
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      let currentTime = audioRef.current.currentTime;
      setCurrent(currentTime);
      // 计算当前时间
      const progress = ((currentTime * 1000) / currentDTRef.current) * 100;
      setProgress(progress);

      setTimeout(() => {
        // 根据当前时间 匹配对应歌词
        currentTime *= 1000;
        let index = songLyric.length - 1;
        for (let i = 0; i < songLyric.length; i++) {
          const lyric = songLyric[i];
          if (lyric.time > currentTime) {
            index = i - 1;
            break;
          }
        }
        if (lyricIndex === index || index === -1) return;
        dispatch(changeLyricIndexAction(index));

        //展示歌词
        message.open({
          content: (songLyric[index] as any).text,
          key: "lyric",
          duration: 0
        });
      });
    }
  }, [songLyric, lyricIndex]);

  // 拖动滑块
  const clickSlider = (e: any) => {
    setProgress(e);
    if (audioRef.current) {
      audioRef.current.currentTime = ((e / 1000) * currentDTRef.current) / 100;
    }
  };

  //切换播放模式
  const handlechangePlayMode = useCallback(() => {
    let newPlayMode = playMode + 1;
    if (newPlayMode > 2) {
      newPlayMode = 0;
    }

    dispatch(changePlayModeAction(newPlayMode));
  }, [playMode]);

  // 上一首下一首
  const handleChangeMusic = useCallback((flag: boolean) => {
    dispatch(changeMusicAction(flag));
  }, []);

  // 一曲结束
  const handleTimeOver = useCallback(() => {
    dispatch(changeMusicOverAction("11" as any));
  }, []);

  return (
    <AppPlayerBarStyle className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlayer}>
          <button className="btn sprite_playbar prev" onClick={() => handleChangeMusic(false)}></button>
          <button className="btn sprite_playbar play" onClick={() => handleAudioClick()}></button>
          <button className="btn sprite_playbar next" onClick={() => handleChangeMusic(true)}></button>
        </BarControl>
        <BarPlayInfo>
          <Link to={"/player"}>
            <img className="image" src={formatImageSize(currentSong.al?.picUrl, 50)} alt="" />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <span className="singer-name">{currentSong.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              <Slider
                step={0.5}
                value={progress}
                tooltip={{ formatter: null }}
                onChange={(e) => clickSlider(e)}
              ></Slider>
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{dayjs(currentSong.dt).format("mm:ss")}</span>
              </div>
            </div>
          </div>
        </BarPlayInfo>
        <BarOperator playMode={playMode}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button className="btn sprite_playbar loop" onClick={() => handlechangePlayMode()}></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio ref={audioRef} onTimeUpdate={() => handleTimeUpdate()} onEnded={() => handleTimeOver()}></audio>
    </AppPlayerBarStyle>
  );
});

AppPlayerBar.displayName = "AppPlayerBar";

export default AppPlayerBar;
