const chai = require("chai");
const expect = chai.expect;

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

let mergedCharsNewProperty, mergedCharsFlat;
describe("Merging characters and planets with new property", () => {
    mergedCharsNewProperty = mergeArrayByPropertyValue(
        ["planetId", "id"],
        characters,
        planets,
        { newProperty: "planetData" }
    );
    console.log("mergedCharsNewProperty:");
    console.log(mergedCharsNewProperty);
    it("should produce a merged array", () => {
        expect(mergedCharsNewProperty).to.be.an("array");
    });

    it("should be the same length as source", () => {
        expect(mergedCharsNewProperty.length).to.equal(characters.length);
    });

    it("should not be the same be array as source", () => {
        expect(mergedCharsNewProperty).not.to.equal(characters);
    });
});

describe("Merged array's objects", () => {
    const arrayLength = characters.length;
    for (let x = 0; x < arrayLength; x++) {
        it(`array member ${x}, ${
            mergedCharsNewProperty[x].id
        }, should have new planetData object`, () => {
            expect(mergedCharsNewProperty[x].planetData).to.be.an("object");
        });
    }
});

describe("Merging characters and planets flat", () => {
    mergedCharsFlat = mergeArrayByPropertyValue(
        ["planetId", "id"],
        characters,
        planets
    );
    console.log("mergedCharsFlat:");
    console.log(mergedCharsFlat);
    it("should produce a merged array", () => {
        expect(mergedCharsFlat).to.be.an("array");
    });

    it("should be the same length as source", () => {
        expect(mergedCharsFlat.length).to.equal(characters.length);
    });

    it("should not be the same be array as source", () => {
        expect(mergedCharsFlat).not.to.equal(characters);
    });
});

/*

expect(model.get.bind(model, 'z')).to.throw('Property does not exist in model schema.');
expect(model.get.bind(model, 'z')).to.throw(new Error('Property does not exist in model schema.'))

expect({a: 1}).to.be.an('object');
var validatorObj = require("../dist/abnacn-validator.js");

// I used http://www.clearwater.com.au/code to check valid and invalid ABNs  in
// the test arrays below.  I looked up existing ABNs at http://abr.business.gov.au/
var abns = ['83 914 571 673', '83914571673', '96 001 217 847', '21 000 006 226', '15 000 122 850', '52 097 227 177', '52097227177'];
var acns = ['000 000 019', '000 250 000', '000250000', '000 500 005', '000 750 005'];
var abnsAndAcns = abns.concat(acns);
var acnsAndAbns = acns.concat(abns);
var invalidAbns = ['', '0', '00 000 000 000', '11111111111', , '11 111 111 111', '83 914 571 672', '52 097 227 178', '21 000 006 227', '21000006227'];
var invalidAcns = ['', '0', '00 000 000 000'];
var invalidAbnsOrAcns = ['', '0', '00 000 000 000'];

describe("ABN Validator", function() {
    abns.forEach(function(abn) {
        it("should return true for valid ABN " + abn, function() {
            expect(validatorObj.isValidABN(abn)).to.be.true;
        });

    });

    invalidAbns.forEach(function(abn) {
        it("should return false for invalid ABN " + abn, function() {
            expect(validatorObj.isValidABN(abn)).to.not.be.true;
        });

    });

});

describe("ACN Validator", function() {
    acns.forEach(function(acn) {
        it("should return true for valid ACN " + acn, function() {
            expect(validatorObj.isValidACN(acn)).to.be.true;
        });

    });

    invalidAcns.forEach(function(acn) {
        it("should return false for invalid ACN " + acn, function() {
            expect(validatorObj.isValidACN(acn)).to.not.be.true;
        });
    });

});

describe("ACN/ABN combined Validator", function() {
    abnsAndAcns.forEach(function(abnOrAcn) {
        it("should return true for valid ABN or ACN " + abnOrAcn, function() {
            expect(validatorObj.isValidABNorACN(abnOrAcn)).to.be.true;
        });

    });

    invalidAbnsOrAcns.forEach(function(abnOrAcn) {
        it("should return false for neither valid ABN or ACN", function() {
            expect(validatorObj.isValidABNorACN(abnOrAcn)).to.not.be.true;
        });

    });
});

// Just to sure, let's switch the order and put ACN tests before ABN
describe("ACN/ABN combined Validator", function() {
    acnsAndAbns.forEach(function(abnOrAcn) {
        it("should return true for neither valid ACN or ABN (ACNs go first this time) " + abnOrAcn, function() {
            expect(validatorObj.isValidABNorACN(abnOrAcn)).to.be.true;
        });

    });
});

*/
