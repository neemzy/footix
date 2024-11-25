import { slugify } from "./utils.js";

const streamEastBaseUrl = "https://v3.streameast.to";
let links;

async function fetchStreamEastLinks() {
  const html = await (await fetch(`${streamEastBaseUrl}/soccer/streams1`)).text();

  return [...html.matchAll(/\/event\/([0-9]+)"[\s\S]*?>\s*?([A-Za-zÀ-ž0-9\.\s-]+) vs ([A-Za-zÀ-ž0-9\.\s-]+)/g)].map(result => ({
    id: result[1],
    teams: result.slice(2).map(team => renameStreamEastTeam(team.trim()))
  }));
}

function renameStreamEastTeam(team) {
  // The other way around from slugification:
  // transform the site's specific team names into "standard" ones
  switch (team) {
    case "FK Crvena zvezda":
      return "Red Star Belgrade";
  }

  return team;
}

function findStreamEastUrl(links, teamA, teamB) {
  const link = links.find(link => slugify(link.teams[0]) === slugify(teamA) && slugify(link.teams[1]) === slugify(teamB));

  return link
    ? `${streamEastBaseUrl}/soccer/event/${link.id}`
    : null;
}

async function getStreamEastUrl(teamA, teamB) {
  if (!links) {
    try {
      links = await fetchStreamEastLinks();
    } catch (e) {
      links = []; // fail silently
    }
  }

  return findStreamEastUrl(links, teamA, teamB);
}

export {
  findStreamEastUrl, // for unit testing purposes
  getStreamEastUrl
};
