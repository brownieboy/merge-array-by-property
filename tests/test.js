const chai = require("chai");
const expect = chai.expect;

const mergeArrayByPropertyValue = require("../dist/index.js");

const characters = [
    { id: "hansolo", name: "Han Solo", planetId: "020", weapon: "blaster" },
    {
        id: "lukeskywalker",
        name: "Luke Skywalker",
        planetId: "010",
        weapon: "light sabre"
    },
    { id: "c3po", name: "C-3PO", planetId: "010" }
];

const planets = [
    { id: "010", name: "Tatooine", allegiance: "Neutral" },
    { id: "020", name: "Corellia", allegiance: "Neutral" }
];

Object.freeze(characters, planets);

let mergedCharsNewProperty, mergedCharsFlat;
describe("Merging characters and planets with new property", () => {
    mergedCharsNewProperty = mergeArrayByPropertyValue(
        ["planetId", "id"],
        characters,
        planets,
        { newProperty: "planetData" }
    );

    it("should produce a merged array", () => {
        console.log("mergedCharsNewProperty:");
        console.log(mergedCharsNewProperty);
        expect(mergedCharsNewProperty).to.be.an("array");
    });

    it("should be the same length as source", () => {
        expect(mergedCharsNewProperty.length).to.equal(characters.length);
    });

    it("should not be the same be array as source", () => {
        expect(mergedCharsNewProperty).not.to.equal(characters);
    });

    const arrayLength = characters.length;
    for (let x = 0; x < arrayLength; x++) {
        it(`array member ${x}, ${
            mergedCharsNewProperty[x].id
        }, should have new planetData object property`, () => {
            expect(mergedCharsNewProperty[x].planetData).to.be.an("object");
        });
    }

    it("first array item should have Han's id property", () => {
        expect(mergedCharsNewProperty[0].id).to.equal("hansolo");
    });
    it("first array item's platentData property should have Corellia for its planet", () => {
        expect(mergedCharsNewProperty[0].planetData.name).to.equal("Corellia");
    });
    it("third array item should have C-3PO's name property", () => {
        expect(mergedCharsNewProperty[2].name).to.equal("C-3PO");
    });
    it("third array item's planetData property should have Tatooine for its planet", () => {
        expect(mergedCharsNewProperty[2].planetData.name).to.equal("Tatooine");
    });
});

describe("Merging characters and planets flat, with keyMapping", () => {
    mergedCharsFlat = mergeArrayByPropertyValue(
        ["planetId", "id"],
        characters,
        planets,
        {
            keyMapping: [
                { key: "id", newKey: "planetId" },
                { key: "name", newKey: "planetName" }
            ]
        }
    );

    it("should produce a merged array", () => {
        console.log("mergedCharsFlat:");
        console.log(mergedCharsFlat);
        expect(mergedCharsFlat).to.be.an("array");
    });

    it("should be the same length as source", () => {
        expect(mergedCharsFlat.length).to.equal(characters.length);
    });

    it("should not be the same be array as source", () => {
        expect(mergedCharsFlat).not.to.equal(characters);
    });
    it("first array item should have Han's id property", () => {
        expect(mergedCharsFlat[0].id).to.equal("hansolo");
    });
    it("first array item should have Corellia for its planet", () => {
        expect(mergedCharsFlat[0].planetName).to.equal("Corellia");
    });
    it("third array item should have C-3PO's name property", () => {
        expect(mergedCharsFlat[2].name).to.equal("C-3PO");
    });
    it("third array item should have neutral as allegiance", () => {
        expect(mergedCharsFlat[2].allegiance).to.equal("Neutral");
    });
});
