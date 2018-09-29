# Merge Array by Property

Merges/joins two arrays based on the value of one of the array's properties; that's one property in each array, of course.  The property can have the same ID or a different one in earch.

## Installation
Install from npm, like so:

    npm install abnacn-validator --save



## Usage
The modules exposes three different functions: isValidABN, isValidACN and isValidABNorACN.  The latter will return true if the number is either a valid ABN or a valid ACN.


### Importing in ES6 syntax:

    // Just import the functions you need.  There's no default export.
    import {isValidABN, isValidACN, isValidABNorACN} from "abnacn-validator";

    isValidABN("53 004 085 616"); // -> true
    isValidABN("0"); // -> false
    isValidACN("005 749 986"); // -> true
    isValidACN("53 004 085 616"); // -> false  (that's an ABN!)
    isValidABNorACN("53 004 085 616"); // -> true
    isValidABNorACN("005 749 986"); // -> true
    isValidABNorACN("0"); // -> false



### Requiring in CommonJS (Node) syntax:

    var abnAcnValidatorObj = require("abnacn-validator");

    abnAcnValidatorObj.isValidABN("53 004 085 616"); // -> true
    abnAcnValidatorObj.isValidABN("0"); // -> false
    abnAcnValidatorObj.isValidACN("005 749 986"); // -> true
    abnAcnValidatorObj.isValidACN("53 004 085 616"); // -> false  (that's an ABN!)
    abnAcnValidatorObj.isValidABNorACN("53 004 085 616"); // -> true
    abnAcnValidatorObj.isValidABNorACN("005 749 986"); // -> true
    abnAcnValidatorObj.isValidABNorACN("0"); // -> false



### AMD/RequireJS Syntax
For the masochists among you...  ;-)

I built this as a UMD module, using Babel's babel-plugin-transform-es2015-modules-umd plugin. So in theory, it should work with the AMD/RequireJS syntax too.  But this is untested, so suck it and see.


### Script tag
And finally, the humble script tag:

    <script src="abnacn-validator.js"></script>


## Development
As usual, after cloning the repository, install the required packages like so:

    cd abnacn-validator
    npm install

Edit the one source file in the /src folder, then run:

    npm run build

to build it to the dist folder.  Babel will transform from ES6 to CommonJS format, and will also export in UMD format, courtesy of its [babel-plugin-transform-es2015-modules-umd plugin](https://babeljs.io/docs/plugins/transform-es2015-modules-umd/).

To run the test suite.

    npm test

Increased number of test cases for version 0.0.5.  Each valid and invalid ABN was verified at http://www.clearwater.com.au/code before being included in the test cases.  Test now also prints each ABN and ACN individually, so you can see which ones are valid and which are not.  Test cases now include variations with and without spaces.


## Acknowlegements
As of version 0.0.5, the ABN validation code is taken from Truffala's formula at:
http://stackoverflow.com/questions/14174738/regex-to-match-australian-business-number-abn

His code was adapted from the PHP code at http://www.clearwater.com.au/code.

This replaces the previous version's buggy code that was allowing invalid ABNs.


ACN validation code taken from Worldspawn's post on [this Whirlpool forum thread](http://forums.whirlpool.net.au/archive/984775).
