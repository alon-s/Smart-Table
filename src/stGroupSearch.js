ng.module('smart-table')
    .filter('stSearchGroup', [ '$filter', function ($filter) {
        var baseFilter = $filter('filter');

        function filterGroup(groupInput, predicate){
            var filtered = ng.copy(groupInput);
            for (var key in filtered){
                if(key.indexOf(predicate) == -1){
                    filtered[key] = baseFilter(filtered[key], predicate);
                }
            }
        }

        return function(input, predicate){
            var filtered = [];
            if(predicate){
                ng.forEach(input, function(group){
                    filtered.push(filterGroup(group, predicate));
                });

                return filtered;
            } else {
                return input;
            }
        };
    }]);
