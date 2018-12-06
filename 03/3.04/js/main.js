/*
* main.js
* Mastering data visualization with D3.js
* 3.4 - Time Scales
*/

var svg = d3.select("#chart-area")
              .append("svg")
                .attr("height", 400)
                .attr("width", 1000);

// logarithmic data
var data = [
  new Date(2000, 2, 5),
  new Date(2000, 7, 27),
  new Date(2000, 11, 11),
  new Date(2000, 10, 31),
];

/* time scale
* defined with "d3.scaleTime" method
* takes an input domain min and max date
* and an output range min max pixel
*/
var x = d3.scaleTime()
          .domain([new Date(2000, 0, 1),
                   new Date(2001, 0, 1)])
          .range([0, 400]);

var circles = svg.selectAll("circle")
               .data(data)
               .enter()
               .append("circle")
                .attr("cy", 100)
                .attr("r", 25)
                .attr("fill", "red")
                .attr("cx", function(d, i) {
                  return x(d);
                });
