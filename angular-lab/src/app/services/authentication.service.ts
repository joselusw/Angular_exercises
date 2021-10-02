import { Injectable } from "@angular/core";
import { LocalStorage } from "../utils/constants/LocalStorage";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private readonly authUser = "master8@lemoncode.net";
  private readonly authPwd = "12345678";

  constructor() {}

  public login(username: string, password: string): boolean {
    if (username === this.authUser && password === this.authPwd) {
      localStorage.setItem(LocalStorage.USER_LOGGED, "true");
      return true;
    } else {
      return false;
    }
  }

  public logout(): void {
    localStorage.removeItem(LocalStorage.USER_LOGGED);
  }

  public isLogged(): boolean {
    return localStorage.getItem(LocalStorage.USER_LOGGED) === "true";
  }

  public getUsername(): string {
    return this.authUser;
  }
}
