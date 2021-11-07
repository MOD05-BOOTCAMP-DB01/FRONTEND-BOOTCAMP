import { JwtHandler } from "../jwt-handler/JwtHandler";
export const Api = {
  baseUrl: "http://localhost:3000",

  loginUrl: () => `${Api.baseUrl}/auth/signin`,
  createUser: () => `${Api.baseUrl}/auth/signup`,

  // OBJECTIVES
  readAllObjectives: () => `${Api.baseUrl}/objectives`,
  readObjectivesById: (id) => `${Api.baseUrl}/objectives/${id}`,
  createObjectiveUrl: () => Api.baseUrl + "/objectives",
  updateObjectiveUrl: (id) => `${Api.baseUrl}/objectives/${id}`,
  deleteObjectiveUrl: (id) => `${Api.baseUrl}/objectives/${id}`,

  // KRS
  readAllKrsUrl: () => `${Api.baseUrl}/key-results`,
  readKrsbyIdUrl: (id) => `${Api.baseUrl}/key-results/${id}`,
  createKrsUrl: () => `${Api.baseUrl}/key-results`,
  deleteKrsUrl: (id) => `${Api.baseUrl}/key-results/${id}`,
  updateKrsUrl: (id) => `${Api.baseUrl}/key-results/${id}`,

  // USERS
  createUserAdminUrl: () => `${Api.baseUrl}/users`,
  readAllUsers: () => `${Api.baseUrl}/users`,
  readAllUsersbyId: (id) => `${Api.baseUrl}/users/${id}`,
  readAllUsersbyId: (id) => `${Api.baseUrl}/users/${id}`,

  // checkin
  readAllCheckinsUrl: () => `${Api.baseUrl}/checkin`,

  
  authHeader: () => ({
    Authorization: "Bearer " + JwtHandler.getJwt(),
  }),

  buildApiGetRequest: (url, auth) =>
    fetch(url, {
      method: "GET",
      ...(auth ? Api.authHeader() : {}),
    }),

  buildApiPostRequest: (url, body, auth) =>
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        ...(auth ? Api.authHeader() : {}),
      }),
      body: JSON.stringify(body),
    }),

  buildApiPatchRequest: (url, body, auth) =>
    fetch(url, {
      method: "PATCH",
      headers: new Headers({
        "content-type": "application/json",
        ...(auth ? Api.authHeader() : {}),
      }),
      body: JSON.stringify(body),
    }),
  buildApiDeleteRequest: (url, auth) =>
    fetch(url, {
      method: "DELETE",
      headers: auth ? Api.authHeader() : {},
    }),
};
