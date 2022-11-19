import React, { memo, useCallback, useRef, type ReactNode, type ElementRef, useState } from "react";
import { TopBannerStyle, BannerLeft, BannerControl, BannerRight } from "./style";
import { Carousel } from "antd";
import classNames from "classnames";
import { formatImageSize } from "@/utils/format";

interface TopBannerPropsType {
  children?: ReactNode;
  banners: any;
}

const TopBanner: React.FC<TopBannerPropsType> = memo((props: TopBannerPropsType) => {
  const { banners = [] } = props;

  // 轮播图
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null);
  const prevClick = useCallback((flag: boolean) => {
    if (flag) {
      bannerRef.current?.prev();
    } else {
      bannerRef.current?.next();
    }
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  let bgImageUrl = banners[currentIndex]?.imageUrl;
  if (bgImageUrl) {
    bgImageUrl = bgImageUrl + "?imageView&blur=40x20&param=730x270";
  }
  const changeBanners = useCallback((index: number) => {
    bannerRef.current?.goTo(index);
  }, []);
  const handelBeforeChange = useCallback((before: number, to: number) => {
    setTimeout(() => {
      setCurrentIndex(to);
    }, 700);
  }, []);
  return (
    <TopBannerStyle slot={bgImageUrl}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            autoplay
            autoplaySpeed={5000}
            speed={2000}
            effect="fade"
            ref={bannerRef}
            beforeChange={handelBeforeChange}
            dots={false}
          >
            {banners.map((item: any) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img className="image" src={formatImageSize(item.imageUrl, 730, 270)} alt={item.typeTitle} />
                </div>
              );
            })}
          </Carousel>
          <ul className="dots">
            {banners.map((item: any, index: number) => (
              <li key={item.imageUrl} onClick={() => changeBanners(index)}>
                <span className={classNames("item", { active: index === currentIndex })}></span>
              </li>
            ))}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={() => prevClick(true)}></button>
          <button className="btn right" onClick={() => prevClick(false)}></button>
        </BannerControl>
      </div>
    </TopBannerStyle>
  );
});

TopBanner.displayName = "TopBanner";

export default TopBanner;
