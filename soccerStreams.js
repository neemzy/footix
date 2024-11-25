import { slugify } from "./utils.js";

const soccerStreamsBaseUrl = "https://soccerstreams.unblockedstream.online";
const soccerStreamsUris = await fetchSoccerStreamsUris();

async function fetchSoccerStreamsUris() {
  const html = await (await fetch(`${soccerStreamsBaseUrl}/soccerstreams`)).text();
  return [...html.matchAll(/\/[A-Za-zÀ-ž0-9\.-]+\-vs\-[A-Za-zÀ-ž0-9\.-]+\/[0-9]+/g)].map(r => r[0]);
}

function slugifyForSoccerStreams(team) {
  const slug = slugify(team);

  switch (slug) {
    case "ac-milan":
      return "milan";
    case "inter":
      return "internazionale";
  }

  return slug;
}

async function getSoccerStreamsUrl(teamA, teamB) {
  const uri = soccerStreamsUris.find(uri => uri.toLowerCase().match(new RegExp(`${slugifyForSoccerStreams(teamA)}-vs-${slugifyForSoccerStreams(teamB)}`, "i")));

  return uri
    ? `${soccerStreamsBaseUrl}${uri}`
    : null;
}

export {
  slugifyForSoccerStreams,
  getSoccerStreamsUrl
};
