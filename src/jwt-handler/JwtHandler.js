export const JwtHandler = {
  JWT_KEY: "token",
  USER_ID: "USER_ID",
  TEAM:"team",
  onChangeEvent: new CustomEvent("onJwtChange"),

  onChange: () => {
    window.dispatchEvent(JwtHandler.onChangeEvent);
  },

  setJwt: (value) => {
    localStorage.setItem(JwtHandler.JWT_KEY, value);

    JwtHandler.onChange();
  },

  clearJwt: () => {
    localStorage.removeItem(JwtHandler.JWT_KEY);
    localStorage.removeItem(JwtHandler.USER_ID);
    localStorage.removeItem(JwtHandler.TEAM)

    JwtHandler.onChange();
  },

  getJwt: () => {
    return localStorage.getItem(JwtHandler.JWT_KEY);
  },

  isJwtValid: () => Boolean(JwtHandler.getJwt()),
};
