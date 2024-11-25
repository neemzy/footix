# footix

Get Discord notifications with streaming links for football games

![Example screenshot](https://raw.githubusercontent.com/neemzy/footix/refs/heads/main/screenshot.jpg)

## Setup

```sh
$ npm i
$ cp config.json.dist config.json
```

Edit the newly created file:

```json
{
  "discord": {
    "token": "Discord bot token",
    "userId": "Discord user id (for DMs)"
  },
  "calendars": [
    "https://ics.fixtur.es/v2/your-favourite-team.ics",
    // ...
  ]
}
```

## Usage

```sh
$ npm start
```

Streaming links for every game starting in the next 30 minutes will be seeked, and results will be sent to the specified Discord user via DM. It is therefore advised to run the tool automatically at :25 and :55 hourly, e.g. via `crontab`:

```crontab
25,55 * * * * cd /path/to/footix && npm start
```
