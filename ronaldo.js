import { slugify } from "./utils.js";

function slugifyForRonaldo(team) {
  const slug = slugify(team);

  switch (slug) {
    case "bayern-munchen":
      return "bayern-munich";
  }

  return slug;
}

function getRonaldoUrl(team) {
  return `https://ronaldo7.me/soccer-streams/${slugifyForRonaldo(team)}-live-stream`;
}

function getRonaldoUrls(teamA, teamB) {
  return [getRonaldoUrl(teamA), getRonaldoUrl(teamB)];
}

export {
  getRonaldoUrls
};
