(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["module"], factory);
    } else if (typeof exports !== "undefined") {
        factory(module);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod);
        global.mergeArrayByPropertyValue = mod.exports;
    }
})(this, function (module) {
    "use strict";

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var mergeArrayByPropertyValue = function mergeArrayByPropertyValue(id, sourceArray, toMergeArray, options) {
        var infoMatched = void 0,
            sourceArrayKey = void 0,
            toMergeArrayKey = void 0,
            newEl = void 0;
        if (typeof id === "string") {
            sourceArrayKey = id;
            toMergeArrayKey = id;
        } else {
            // Assume id is actually an array of ids
            sourceArrayKey = id[0];
            toMergeArrayKey = id[1] || id[0];
        }
        var mergeArray = sourceArray.map(function (sourceEl) {
            infoMatched = toMergeArray.find(function (targetMergeEl) {
                return sourceEl[sourceArrayKey] === targetMergeEl[toMergeArrayKey];
            });

            newEl = Object.assign({}, sourceEl); // Avoid mutation, and default if there's no matching info
            //newEl = { ...sourceEl };
            if (typeof infoMatched !== "undefined") {
                // Assign as new target if we supplied that option
                if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object" && typeof options.newProperty === "string") {
                    newEl[options.newProperty] = Object.assign({}, infoMatched); // Avoid mutation again
                    if (!(typeof options.preserveTargetKey !== "undefined" & options.preserveTargetKey)) {
                        delete newEl[options.newProperty][toMergeArrayKey];
                    }
                } else {
                    // Not a new property to be set on new merged array
                    if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object" && _typeof(options.keyMapping) === "object") {
                        var matchingKeyInMapping = void 0;
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            var _loop = function _loop() {
                                var key = _step.value;

                                matchingKeyInMapping = options.keyMapping.find(function (member) {
                                    return member.key === key;
                                });
                                if (typeof matchingKeyInMapping !== "undefined") {
                                    newEl[matchingKeyInMapping.newKey] = infoMatched[key];
                                } else {
                                    newEl[key] = infoMatched[key];
                                }
                            };

                            for (var _iterator = Object.keys(infoMatched)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                _loop();
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
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
});
