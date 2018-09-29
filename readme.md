# Merge Array by Property

Merges/joins two arrays based on the value of the arrays' properties; that's one property in each array, of course.  The property can have the same ID or a different one in each array.

The function returns a new array.  It does not mutate either of the source arrays.

## Usage

### Source Arrays
Taking these two arrays as our source arrays to be be merged:

```javascript
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
```

```javascript
const planets = [
    { id: "010", name: "Tatooine", allegiance: "Neutral" },
    { id: "020", name: "Corellia", allegiance: "Neutral" }
];
```

### Example 1: Second Array Values Become Properties On First Array

This call:
```javascript
    mergedCharsNewProperty = mergeArrayByPropertyValue(
        ["planetId", "id"],
        characters,
        planets,
        { newProperty: "planetData" }
    );
```

will return this new array:
```javascript
[ { id: 'hansolo',
    name: 'Han Solo',
    planetId: '020',
    weapon: 'blaster',
    planetData: { name: 'Corellia', allegiance: 'Neutral' } },
  { id: 'lukeskywalker',
    name: 'Luke Skywalker',
    planetId: '010',
    weapon: 'light sabre',
    planetData: { name: 'Tatooine', allegiance: 'Neutral' } },
  { id: 'c3po',
    name: 'C-3PO',
    planetId: '010',
    planetData: { name: 'Tatooine', allegiance: 'Neutral' } } ]
```

The new array includes every member of the first array, with the corresponding values on the second array added to the merged array as a new property called planetData.  This is determined by the *newProperty* option passed into the call.

### Example 2: Flat Merge with Property Mapping
This call:
```javascript
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
```

will return this new array:

```javascript
[ { id: 'hansolo',
    name: 'Han Solo',
    planetId: '020',
    weapon: 'blaster',
    planetName: 'Corellia',
    allegiance: 'Neutral' },
  { id: 'lukeskywalker',
    name: 'Luke Skywalker',
    planetId: '010',
    weapon: 'light sabre',
    planetName: 'Tatooine',
    allegiance: 'Neutral' },
  { id: 'c3po',
    name: 'C-3PO',
    planetId: '010',
    planetName: 'Tatooine',
    allegiance: 'Neutral' } ]
```

This time the properties from the second array will be added directly as top level properties on the first array.  This is potentially dangerous because, by default, the property ids of the first array will be overwritten by the corresponding properties from the second array, which is probably not what you want!

The *keyMapping* option will allow you to specify a new property name for the incoming properties in that case.

## Installation
Install from npm, like so:

    npm install merge-array-by-property --save

or with yarn:

    yarn add merge-array-by-property 

The package has no run-time dependencies.


## Importing into your JS module:

    import mergeArrayArrayByProperty from "merge-array-by-property";  // ES6 syntax

our

    var mergeArrayByProperty = require("merge-array-by-property");

I built this as a UMD module, using Babel's babel-plugin-transform-es2015-modules-umd plugin. So in theory, it should work with the AMD/RequireJS syntax (if anybody is still using that!) but this is untested, so suck it and see.

You should also be able to added it directly as a script tag.

## API
The syntax is as follows, assuming that you've imported the function into your project as *mergeArrayByProperty*:

```javascript
    const newArray = mergeArrayByProperty(ids, array1, array2, options);
```

Where:
* *array1* and *array2* are the two arrays to be merged, obviously.  The function will loop through all members of array1, and look for matching members in array2, based on the *ids* passed in.
* *ids* can be a single array string, or an array of up to two members.  These are the property members that the function will use to try and join the two arrays together.  If you pass in a single value, e.g. "id", then it will join the two arrays matched on that _same_ property in each array.  More likely though, the two properties will have different names, so you should pass them in as a two-member array, e.g. ["planetId", "id"], which matched the *planetId* property in the first array to the *id* property in the second.
* *options* is an optional object, which can the following values:
    * *newProperty* is the name of a property which will take the _entire_ value from the matching value in the second array.  Without this option supplied, the function will attempt to merge the two arrays' properties at the top level.
    * *keyMapping* is an array of property key names, used to prevent properties in the first array being directly overwritten the by those in the second array in the final, merged array.  Each member of the *keyMapping* array is an object with a *key* and *newKey* property, with the latter becoming the former's name in the merged array.  E.g. passing in an *keyMapping* value of `{ key: "name", newKey: "planetName" }` will set the second array's *name* property to become the *planetName* property in the merged array.
    * *preserveTargetKey* is boolean, default is `false`.  By default, the second array's matching property will _not_ be included in the merged array.  This is because you already _have_ that property value in the first array (otherwise you couldn't match in the first place!), so you probably don't need the same property value under two different names on your merged array.  But just in case you do, set the *preserveTargetKey* to `true`.




## Development
As usual, after cloning the repository, install the required packages like so:

    cd merge-array-by-property
    yarn

Edit the one source file in the /src folder, then run:

    yarn build

to build it to the /dist folder.  Babel will transform from ES6 to CommonJS format, and will also export in UMD format, courtesy of its [babel-plugin-transform-es2015-modules-umd plugin](https://babeljs.io/docs/plugins/transform-es2015-modules-umd/).

To run the test suite.

    npm test


