const mergeArrayByPropertyValue = require("../dist/index.js");

const characters = [
    { id: "hansolo", name: "Han Solo", planetId: "020" },
    { id: "lukeskywalker", name: "Luke Skywalker", planetId: "010" },
    { id: "c3po", name: "C3PO", planetId: "010" }
];

const planets = [
    { id: "010", name: "Tattoine", allegiance: "Neutral" },
    { id: "020", name: "Corellia", allegiance: "Neutral" }
];

Object.freeze(characters, planets);

const mergedChars = mergeArrayByPropertyValue(
    ["planetId", "id"],
    characters,
    planets,
    { newProperty: "planetData" }
);

console.log(mergedChars);
