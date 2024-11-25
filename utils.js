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
  const slug = team.toLowerCase().replace(/\s+/g, "-") // replace whitespace with dashes
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")  // remove diacritics
    .replace(/^([1-9]\.)?(ac|fc|rb|sk|bsc)-/, "") // remove extraneous prefixes...
    .replace(/-(fc)$/, ""); // ...and suffixes

  switch (slug) {
    case "sparta-praag":
      return "sparta-prague";
    case "stade-brestois-29":
      return "brest";
    case "paris-saint-germain":
      return "psg";
    case "sporting-portugal":
      return "sporting-cp";
  }

  return slug;
}

export {
  dedupeGames,
  parseTeams,
  slugify
};
