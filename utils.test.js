import { slugify } from "./utils.js";

describe("slugify", () => {
  it("removes diacritics", () => {
    expect(slugify("Atlético Madrid")).toEqual("atletico-madrid");
    expect(slugify("Bayern München")).toEqual("bayern-munchen");
  });

  it("removes extraneous prefixes", () => {
    expect(slugify("FC Barcelona")).toEqual("barcelona");
    expect(slugify("RB Leipzig")).toEqual("leipzig");
    expect(slugify("BSC Young Boys")).toEqual("young-boys");
    expect(slugify("1.FC Köln")).toEqual("koln");
  });

  it("removes extraneous suffixes", () => {
    expect(slugify("Empoli FC")).toEqual("empoli");
  });
});
