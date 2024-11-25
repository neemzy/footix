const streamEastBaseUrl = "https://v3.streameast.to";
const streamEastLinks = await fetchStreamEastLinks();

async function fetchStreamEastLinks() {
  const html = await (await fetch(`${streamEastBaseUrl}/soccer/streams1`)).text();

  return [...html.matchAll(/\/event\/([0-9]+)"[\s\S]*?>\s*?([A-Za-zÀ-ž0-9\.\s-]+) vs ([A-Za-zÀ-ž0-9\.\s-]+)/g)].map(result => ({
    id: result[1],
    teams: result.slice(2).map(team => renameStreamEastTeam(team.trim()))
  }));
}

function renameStreamEastTeam(team) {
  switch (team) {
    case "FK Crvena zvezda":
      return "Red Star Belgrade";
  }

  return team;
}

async function getStreamEastUrl(teamA, teamB) {
  const link = streamEastLinks.find(link => link.teams[0] === teamA && link.teams[1] === teamB);

  return link
    ? `${streamEastBaseUrl}/soccer/event/${link.id}`
    : null;
}

export {
  getStreamEastUrl
};
