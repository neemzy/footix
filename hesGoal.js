import { slugifyForSoccerStreams } from "./soccerStreams.js";

function slugifyForHesGoal(team) {
  const slug = slugifyForSoccerStreams(team);

  switch (slug) {
    case "sparta-prague":
      return "sparta-praha";
  }

  return slug;
}

function getHesGoalUrl(teamA, teamB) {
  return `https://www.hesgoaled.com/p/${slugifyForHesGoal(teamA)}-vs-${slugifyForHesGoal(teamB)}.html`;
}

export {
  getHesGoalUrl
};
