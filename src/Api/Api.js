import { JwtHandler } from "../jwt-handler/JwtHandler";
export const Api = {
  baseUrl: process.env.REACT_APP_SECRET_NAME,

  loginUrl: () => `${Api.baseUrl}/auth/signin`,
  
  // OBJECTIVES
  readAllObjectives: () => `${Api.baseUrl}/objectives`,
  readObjectivesById: (id) => `${Api.baseUrl}/objectives/${id}`,
  // by user
  readObjectivesByUserId: (id) => `${Api.baseUrl}/users/objectives/${id}`,
  // by team
  readObjectiveByTeam:(id) =>`${Api.baseUrl}/teams/${id}/objectives`,
  // by quarter
  readObjectiveByQuarter:(quarter)=>`${Api.baseUrl}/quarters/${quarter}/objectives`,
  // by user team and quarter
  readObjectivesByTeamQuarter: (quarter,id) => `${Api.baseUrl}/quarters/${quarter}/${id}/objectives`,
  readObjectivesByTeamYear: (year,id) => `${Api.baseUrl}/years/:year/:id/objectives`,

  createObjectiveUrl: () => Api.baseUrl + "/objectives",
  updateObjectiveUrl: (id) => `${Api.baseUrl}/objectives/${id}`,
  deleteObjectiveUrl: (id) => `${Api.baseUrl}/objectives/${id}`,
  readObjectiveByYear: (year)=>`${Api.baseUrl}/years/${year}/objectives`,
  // KRS
  readAllKrsUrl: () => `${Api.baseUrl}/key-results`,
  readKrsbyIdUrl: (id) => `${Api.baseUrl}/key-results/${id}`,
  readKeyResultsByObjectivesId: (id) => `${Api.baseUrl}/objectives/${id}/key_results`,
  createKrUrl: () => `${Api.baseUrl}/key-results`,
  deleteKrsUrl: (id) => `${Api.baseUrl}/key-results/${id}`,
  updateKrsUrl: (id) => `${Api.baseUrl}/key-results/${id}`,

  // USERS
  createUserAdminUrl: () => `${Api.baseUrl}/users`,
  createUser: () => `${Api.baseUrl}/auth/signup`,
  readAllUsers: () => `${Api.baseUrl}/users`,
  readUserbyId: (id) => `${Api.baseUrl}/users/${id}`,
  updateUsers:(id)=>`${Api.baseUrl}/users/${id}`,

  // checkin
  readAllCheckinsUrl: () => `${Api.baseUrl}/checkin`,
  readCheckinsByKeyResultId: (id) => `${Api.baseUrl}/checkin/key_result/${id}`,
  createCkUrl: () => `${Api.baseUrl}/checkin`,
  updateCkUrl: (id) => `${Api.baseUrl}/checkin/${id}`,
  deleteCkUrl: (id) => `${Api.baseUrl}/checkin/${id}`,


  
  // teams
  readAllTeams:()=>`${Api.baseUrl}/teams`,

// years
realAllYears:()=>`${Api.baseUrl}/years`,

// quarters
readAllQuaters:()=>`${Api.baseUrl}/quarters`,
  authHeader: () => ({
    Authorization: "Bearer " + JwtHandler.getJwt(),
  }),


  buildApiGetRequest: (url, auth) =>
      fetch(url, {
      method: "GET",
      headers: new Headers({...(auth ? Api.authHeader() : {})}),
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
      headers: new Headers(auth ? Api.authHeader() : {}),
    }),
};
