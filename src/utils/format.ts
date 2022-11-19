export function formatFigures(number: number) {
  if (number > 1000000000) {
    return Math.floor(number / 100000000) + "亿";
  } else if (number > 10000) {
    return Math.floor(number / 10000) + "万";
  } else {
    return number;
  }
}

export function formatImageSize(imageUrl: string, width: number, height: number | undefined = width) {
  return imageUrl + `?param=${width}x${height}`;
}

export function formatTime(number: number) {
  let fen: string | number = Math.floor(number / 60);
  if (fen < 10) {
    fen = "0" + fen;
  }
  let miao: string | number = Math.floor(number % 60);
  if (miao < 10) {
    miao = "0" + miao;
  }
  return fen + ":" + miao;
}

interface ILyric {
  time: number;
  text: string;
}
const timeRefExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
export function formatLyric(lyricsString: string) {
  const lyrics: ILyric[] = [];
  const lines = lyricsString.split("\n");
  lines.forEach((item) => {
    const result = timeRefExp.exec(item);
    if (!result) {
      return;
    } else {
      const time1 = Number(result[1]) * 60 * 1000;
      const time2 = Number(result[2]) * 1000;
      const time3 = result[3].length === 3 ? Number(result[3]) : Number(result[3]) * 10;
      const time = time1 + time2 + time3;

      // 获取文本
      const text = item.replace(timeRefExp, "");

      lyrics.push({ time, text });
    }
  });
  return lyrics;
}
