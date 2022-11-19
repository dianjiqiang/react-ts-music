import React, { memo, type ReactNode } from "react";
import { UserLoginStyle } from "./style";

interface UserLoginPropsType {
  children?: ReactNode;
}

const UserLogin: React.FC<UserLoginPropsType> = memo(() => {
  return (
    <UserLoginStyle className="sprite_02">
      <p className="desc">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      <a href="/#/login" className="sprite_02">
        用户登录
      </a>
    </UserLoginStyle>
  );
});

UserLogin.displayName = "UserLogin";

export default UserLogin;
