ng.module('smart-table')
    .filter('stSortGroup', [ '$filter', function ($filter) {
        var baseOrderBy = $filter('orderBy');

        function sortGroup(groupInput, predicate, reverse) {
            var sorted = ng.copy(groupInput);
            for (var key in sorted) {
                if (key.indexOf(predicate) == -1) {
                    sorted[key] = baseOrderBy(sorted[key], predicate);
                }
            }
        }

        return function (input, predicate, reverse) {
            var sortedGroups = [];
            var groupsTopValue = [];

            //pairing the group top value and the group key
            // in order to sort the keys.
            var groupsKeyAndTopValue = {};


            ng.forEach(input, function (group) {
                var currentGroupKey = Object.keys(group)[0];
                sortedGroups[currentGroupKey] = sortGroup(group, predicate, reverse);
                var topValue = sortedGroups[currentGroupKey][0];
                if (groupsTopValue.indexOf(topValue) == -1) {
                    groupsTopValue.push(topValue);
                }
                if (!groupsKeyAndTopValue[topValue]) {
                    groupsKeyAndTopValue[topValue] = [];
                }

                groupsKeyAndTopValue[topValue].push(currentGroupKey);

            });

            groupsTopValue.sort(function (a, b) {
                var toRet = 0;
                if (a > b) {
                    toRet = 1;
                } else if (a < b) {
                    toRet = -1;
                }
                if (reverse % 2 == 0) {
                    toRet = toRet * -1;
                }

                return toRet;
            });

            var sortedOutput = [];
            ng.forEach(groupsTopValue, function (topValue) {
                ng.forEach(groupsKeyAndTopValue[topValue], function (keyForTopValue) {
                    var obj = {};
                    obj[keyForTopValue] = sortedGroups[keyForTopValue];
                    sortedOutput.push(obj);
                });
            });

            return sortedOutput;
        };
    }]);
