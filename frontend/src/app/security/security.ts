import {action, makeObservable, observable} from "mobx";
import axios from "axios";
import qs from "qs";
import {LOGIN_URI, LOGOUT_URI} from "../../config";

export class SecurityStore {
  @observable isLoggedIn: boolean = true;

  constructor() {
    makeObservable(this);
  }

  @action
  login = async (
      username: string,
      password: string,
      onResponseReceived?: (status: number) => void
  ) => {
    const response = await axios(LOGIN_URI, {
      method: "POST",
      headers: {"content-type": "application/x-www-form-urlencoded"},
      data: qs.stringify({
        username,
        password
      })
    }).catch(e => {
      if (onResponseReceived != null) {
        onResponseReceived(e.status);
      }
    });

    if (response && response.status === 200) {
      this.isLoggedIn = true;
    }
    if (response && onResponseReceived != null) {
      onResponseReceived(response.status);
    }
  };

  @action
  logout = async (onResponseReceived?: (status: number) => void) => {
    this.isLoggedIn = false;

    const response = await axios(LOGOUT_URI, {
      method: "POST"
    });

    if (onResponseReceived != null) {
      onResponseReceived(response.status);
    }
  };
}
