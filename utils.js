function dedupeGames(games) {
  const deduped = [];

  games.forEach(game => {
    if (deduped.find(({ teams }) => teams.join() === game.teams.join())) {
      return;
    }

    deduped.push(game);
  });

  return deduped;
}

function parseTeams(eventName) {
  const teams = eventName.replace(/ \[[A-Z]+\]$/, "");
  return teams.split(" - ");
}

function slugify(team) {
  const slug = team.toLowerCase().replace(/\s+/g, "-");

  switch (slug) {
    case "sparta-praag":
      return "sparta-prague";
    case "stade-brestois-29":
      return "brest";
    case "bayern-münchen":
      return "bayern-munich";
    case "paris-saint-germain":
      return "psg";
    case "fc-barcelona":
      return "barcelona";
    case "rb-salzburg":
      return "salzburg";
    case "sporting-portugal":
      return "sporting-cp";
    case "sk-slovan-bratislava":
      return "slovan-bratislava";
    case "atlético-madrid":
      return "atletico-madrid";
  }

  return slug;
}

export {
  dedupeGames,
  parseTeams,
  slugify
};
