import React, { memo, useCallback, type ReactNode } from "react";
import { AppHeaderStyle, HeaderLeftStyle, HeaderRightStyle } from "./style";
import { NavLink } from "react-router-dom";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import headerTitles from "@/assets/data/header_titles.json";

interface AppHeaderPropsType {
  children?: ReactNode;
}

const AppHeader: React.FC<AppHeaderPropsType> = memo(() => {
  // 根据不同的type展示不同的元素
  const showItem = useCallback((item: any) => {
    if (item.type === "path") {
      return (
        <NavLink to={item.link}>
          {item.title} <i className="icon sprite_01"></i>
        </NavLink>
      );
    } else {
      return (
        <a href={item.link} target="_blank" rel="noreferrer">
          {item.title}
        </a>
      );
    }
  }, []);

  //点击切换路由
  return (
    <AppHeaderStyle>
      <div className="content wrap-v1">
        <HeaderLeftStyle>
          <a className="logo sprite_01" href="/">
            网易云音乐
          </a>
          <div className="title-list">
            {headerTitles.map((item) => {
              return (
                <div className="item" key={item.title}>
                  {showItem(item)}
                </div>
              );
            })}
          </div>
        </HeaderLeftStyle>
        <HeaderRightStyle>
          <span className="search">
            <Input placeholder="音乐/视频/电台/用户" prefix={<SearchOutlined />} />
          </span>
          <span className="center">
            <a href="https://music.163.com/#/login?targetUrl=%2Fcreatorcenter" target="_black">
              创作者中心
            </a>
          </span>
          <span className="login">登录</span>
        </HeaderRightStyle>
      </div>
      <div className="divider"></div>
    </AppHeaderStyle>
  );
});

AppHeader.displayName = "AppHeader";

export default AppHeader;
