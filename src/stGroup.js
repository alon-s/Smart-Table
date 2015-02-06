ng.module('smart-table')
    .directive('stGroup', function () {
        return {
            restrict: 'E',
            templateUrl: 'stGroup.html',
            scope: {
                groupedData: '=',
                columns: '='
            },
            link: function (scope, element, attrs, ctrl) {
                scope.getKey = function (keyValue) {
                    return Object.keys(keyValue)[0];
                };
            }
        };
    });
