/*
* main.js
* Mastering data visualization with D3.js
* 3.3 - Logarithmic Scales
*/

var svg = d3.select("#chart-area")
              .append("svg")
                .attr("height", 400)
                .attr("width", 1000);

// logarithmic data
var data = [500, 5000, 50000, 500000];

/* logarithmic scale
* defined with "d3.scaleLog" method
* takes an input domain min and max
* and an output range min max
* and a base value
*/
var y = d3.scaleLog()
          .domain([300, 150000])
          .range([0, 400])
          .base(10);

var rects = svg.selectAll("rect")
               .data(data)
               .enter()
               .append("rect")
                .attr("y", 10)
                .attr("width", 40)
                .attr("fill", "grey")
                .attr("x", function(d, i) {
                  return (i * 50) + 10;
                })
                .attr("height", function(d, i) {
                  console.log(y(d));
                  return y(d);
                });
