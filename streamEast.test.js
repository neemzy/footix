import { findStreamEastUrl } from "./streamEast.js";

const mockData = [{
  id: "12436498",
  teams: [
    "Chelsea",
    "Aston Villa"
  ]
}, {
  id: "12436504",
  teams: [
    "Liverpool",
    "Empoli"
  ]
}, {
  id: "12436507",
  teams: [
    "Milan",
    "FC Bayern München"
  ]
}, ];

describe("getStreamEastUrl", () => {
  it("finds links for games despite team name variations", async () => {
    expect(findStreamEastUrl(mockData, "Chelsea", "Aston Villa")).toEqual("https://v3.streameast.to/soccer/event/12436498");
    expect(findStreamEastUrl(mockData, "Liverpool FC", "Empoli FC")).toEqual("https://v3.streameast.to/soccer/event/12436504");
    expect(findStreamEastUrl(mockData, "AC Milan", "Bayern München")).toEqual("https://v3.streameast.to/soccer/event/12436507");
  });
});
