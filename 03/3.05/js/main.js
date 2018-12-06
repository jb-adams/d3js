/*
* main.js
* Mastering data visualization with D3.js
* 3.5 - Ordinal Scales
*/

var svg = d3.select("#chart-area")
              .append("svg")
                .attr("height", 400)
                .attr("width", 1000);

// logarithmic data
var data = [
  [new Date(2000, 2, 5), "ASIA"],
  [new Date(2000, 7, 27), "AFRICA"],
  [new Date(2000, 11, 11), "EUROPE"],
  [new Date(2000, 10, 31), "NORTH AMERICA"]
];

var x = d3.scaleTime()
          .domain([new Date(2000, 0, 1),
                   new Date(2001, 0, 1)])
          .range([0, 400]);

// ordinal scale for categorical data
var color = d3.scaleOrdinal()
              .domain(["AFRICA", "ASIA", "EUROPE", "NORTH AMERICA"])
              .range(["RED", "ORANGE", "BLUE", "GREEN"])

var circles = svg.selectAll("circle")
               .data(data)
               .enter()
               .append("circle")
                .attr("cy", 100)
                .attr("r", 25)
                .attr("fill", function(d, i) {
                  return color(d[1]);
                })
                .attr("cx", function(d, i) {
                  return x(d[0]);
                });
