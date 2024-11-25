import ical from "node-ical";
import Discord from "discord.js";
import config from "./config.json" with { type: "json" };
import { dedupeGames, parseTeams } from "./utils.js";
import { getRonaldoUrls } from "./ronaldo.js";
import { getHesGoalUrl } from "./hesGoal.js";
import { getSoccerStreamsUrl } from "./soccerStreams.js";
import { getStreamEastUrl } from "./streamEast.js";

const now = Date.now();
const in30mins = new Date(now + 30 * 60 * 1000).getTime();
const client = new Discord.Client({ intents: [Discord.IntentsBitField.Flags.DirectMessages] });

// Fetch all calendars
const calendars = await Promise.all(config.calendars.map(calendar => new Promise((resolve, reject) => {
  ical.fromURL(calendar, {}, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
})));

// Filter games starting in next 30 minutes and add stream URLs
const games = dedupeGames(await Promise.all(calendars.reduce((games, events) => games.concat(Object.values(events)
  .filter(event => {
    if (!event.start) {
      return false;
    }

    const start = event.start.getTime();
    return start > now && start < in30mins;
  })
  .sort((eventA, eventB) => eventA.start - eventB.start >= 0 ? 1 : -1)
  .map(event => new Promise(async (resolve, reject) => {
    const minutes = event.start.getMinutes();
    const teams = parseTeams(event.summary);
    const soccerStreamUrl = await getSoccerStreamsUrl(...teams);
    const streamEastUrl = await getStreamEastUrl(...teams);

    resolve({
      start: event.start.getHours() + ":" + (minutes >= 10 ? minutes : `0${minutes}`),
      teams,
      urls: [
        ...(soccerStreamUrl ? [soccerStreamUrl] : []),
        ...(streamEastUrl ? [streamEastUrl] : []),
        ...getRonaldoUrls(...teams),
        getHesGoalUrl(...teams)
      ]
    });
  }))
), [])));

// Send Discord DM
client.once("ready", async () => {
  const dmUser = await client.users.fetch(config.discord.userId, false);

  if (dmUser) {
    await Promise.all(games.map(game => new Promise(async (resolve, reject) => {
      await dmUser.send(`**[${game.start}] ${game.teams.join(" - ")}**\n- <${game.urls.join(">\n- <")}>`);
      resolve();
    })));
  } else {
    console.error("Discord user not found");
  }

  client.destroy();
});

client.login(config.discord.token);
