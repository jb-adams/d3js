/*
* main.js
* Mastering data visualization with D3.js
* 3.7 - D3 Min, Max, Extent
*/

var svg = d3.select("#chart-area")
              .append("svg")
                .attr("height", 1000)
                .attr("width", 1000);

var data = [
  { grade: "A", value: 4 },
  { grade: "B", value: 3 },
  { grade: "C", value: 2 }
];

// max a y scale based on min and max values of data
var y = d3.scaleLinear()
          .domain([
            d3.min(data, function(d) {return d.value; }),
            d3.max(data, function(d) {return d.value; })
          ])
          .range([0, 400]);

// max a y scale based on the extent of the data
var y = d3.scaleLinear()
          .domain([d3.extent(data, function(d){ return d.value; })])
          .range([0, 400]);

// max an x scale based on a map function of the grade attribute
var x = d3.scaleBand()
          .domain( data.map(function(d){ return d.grade; }))
          .range([0, 400])
          .paddingInner(0.3)
          .paddingOuter(0.3);
