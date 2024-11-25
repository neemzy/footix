import { slugify } from "./utils.js";

function getRonaldoUrl(team) {
  return `https://ronaldo7.me/soccer-streams/${slugify(team)}-live-stream`;
}

function getRonaldoUrls(teamA, teamB) {
  return [getRonaldoUrl(teamA), getRonaldoUrl(teamB)];
}

export {
  getRonaldoUrls
};
