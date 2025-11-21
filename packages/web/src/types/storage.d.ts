/** The storage namespace */
declare namespace StorageType {
  interface Session {
    /** The theme color */
    themeColor: string;
    // /**
    //  * the theme settings
    //  */
    // themeSettings: App.Theme.ThemeSetting;
  }
  interface Local {
    themeMode: App.ThemeMode;
    settings: App.Setting;
    /** The token */
    token: string;
    /** The user info */
    userInfo: Api.Auth.UserInfo;
  }
}
