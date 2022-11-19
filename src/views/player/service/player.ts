import keyieRequest from "@/service";

export function getSongDetail(ids: number) {
  return keyieRequest.get({
    url: "/song/detail?ids=" + ids
  });
}

// 获取歌词数据
export function getSongLyric(id: number) {
  return keyieRequest.get({
    url: "/lyric",
    params: {
      id
    }
  });
}
