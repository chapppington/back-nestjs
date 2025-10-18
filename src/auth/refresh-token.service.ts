import { Injectable } from "@nestjs/common";
import type { Response } from "express";

@Injectable()
export class RefreshTokenService {
  readonly EXPIRE_DAY_REFRESH_TOKEN = 7;
  readonly REFRESH_TOKEN_NAME = "refreshToken";
  readonly ACCESS_TOKEN_NAME = "accessToken";

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: "sibkomplekt.ru",
      expires: expiresIn,
      secure: true, // true if production
      sameSite: "lax", // lax if production
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, "", {
      httpOnly: true,
      domain: "sibkomplekt.ru",
      expires: new Date(0),
      secure: true, // true if production
      sameSite: "lax", // lax if production
    });
  }

  removeAccessTokenFromResponse(res: Response) {
    res.cookie(this.ACCESS_TOKEN_NAME, "", {
      domain: "sibkomplekt.ru",
      expires: new Date(0),
      secure: true,
      sameSite: "strict",
    });
  }
}
