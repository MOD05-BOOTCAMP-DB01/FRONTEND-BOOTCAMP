export const JwtHandler = {
  JWT_KEY: "token",
  USER_ID: "USER_ID",
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

    JwtHandler.onChange();
  },

  getJwt: () => {
    return localStorage.getItem(JwtHandler.JWT_KEY);
  },

  isJwtValid: () => Boolean(JwtHandler.getJwt()),
};
