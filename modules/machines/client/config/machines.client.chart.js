(function () {
  'use strict';

  angular
    .module('machine', ['chart.js'])
    .config(chartConfig);

  chartConfig.$inject = ['ChartJsProvider'];

  function chartConfig(ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#FF5252', '#FF8A80'],
      responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: false
    });
  }
}());
