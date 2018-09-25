const mergeArrayByPropertyValue = require("../src/merge-array-by-property-value.js");

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

console.log("mergedChars");
console.log(mergedChars);
//
const mergedCharsFlat = mergeArrayByPropertyValue(
    ["planetId", "id"],
    characters,
    planets,
    {
        keyMapping: [
            { key: "name", newKey: "planetName" },
            { key: "allegiance", newKey: "allegiance" }
        ]
    }
);
console.log("mergedCharsFlat:");
console.log(mergedCharsFlat);
