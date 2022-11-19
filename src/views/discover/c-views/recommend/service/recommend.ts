import keyieRequest from "@/service";

export function getBanners() {
  return keyieRequest.get({
    url: "/banner"
  });
}

export function getHotRecommend(limit = 30) {
  return keyieRequest.get({
    url: "/personalized",
    params: {
      limit
    }
  });
}

export function getNewAlbum(limit = 10) {
  return keyieRequest.get({
    url: "/album/list",
    params: {
      limit
    }
  });
}

export function getPlayListDetail(id: number) {
  return keyieRequest.get({
    url: "playlist/detail",
    params: {
      id
    }
  });
}

export function getArtistList(cat: number, limit: number) {
  return keyieRequest.get({
    url: "/artist/list",
    params: {
      cat,
      limit
    }
  });
}
