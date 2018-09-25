const mergeArrayByPropertyValue = (id, sourceArray, toMergeArray, options) => {
    let infoMatched, sourceArrayKey, toMergeArrayKey, newEl;
    if (typeof id === "string") {
        sourceArrayKey = id;
        toMergeArrayKey = id;
    } else {
        // Assume id is actually an array of ids
        sourceArrayKey = id[0];
        toMergeArrayKey = id[1] || id[0];
    }
    const mergeArray = sourceArray.map(sourceEl => {
        infoMatched = toMergeArray.find(
            targetMergeEl =>
                sourceEl[sourceArrayKey] === targetMergeEl[toMergeArrayKey]
        );

        newEl = Object.assign({}, sourceEl); // Avoid mutation, and default if there's no matching info
        //newEl = { ...sourceEl };
        if (typeof infoMatched !== "undefined") {
            // Assign as new target if we supplied that option
            if (
                typeof options === "object" &&
                typeof options.newProperty === "string"
            ) {
                newEl[options.newProperty] = Object.assign({}, infoMatched); // Avoid mutation again
                if (
                    !(
                        (typeof options.preserveTargetKey !== "undefined") &
                        options.preserveTargetKey
                    )
                ) {
                    delete newEl[options.newProperty][toMergeArrayKey];
                }
            } else {
                // Not a new property to be set on new merged array
                if (
                    typeof options === "object" &&
                    typeof options.keyMapping === "object"
                ) {
                    let matchingKeyInMapping;
                    for (let key of Object.keys(infoMatched)) {
                        matchingKeyInMapping = options.keyMapping.find(
                            member => member.key === key
                        );
                        if (typeof matchingKeyInMapping !== "undefined") {
                            newEl[matchingKeyInMapping.newKey] =
                                infoMatched[key];
                        } else {
                            newEl[key] = infoMatched[key];
                        }
                    }
                } else {
                    // Otherwise just merge, and damn the torpedoes!
                    newEl = Object.assign({}, sourceEl, infoMatched);
                }
            }
        }
        return newEl;
    });
    return mergeArray;
};

module.exports = mergeArrayByPropertyValue;
