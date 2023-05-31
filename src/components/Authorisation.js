const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE = "user-top-read";
const CLIENT_ID = "268fc0cf3a024f2a8b409bbdb8095567";

//const REDIRECT_URI = "http://localhost:3000/";
const REDIRECT_URI = "https://spotify-analysis-1.vercel.app/";

export function handleAuthentication() {
  const hash = window.location.hash;
  let token = window.sessionStorage.getItem("token");

  if (!token && hash) {
    token = hash
      .substring(1)
      .split("&")
      .find((elem) => elem.startsWith("access_token"))
      .split("=")[1];

    window.location.hash = "";

    window.sessionStorage.setItem("token", token);
  }

  return token;
}

export function getAuthorisationUrl() {
  return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
}
