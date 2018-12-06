/*
* main.js
* Mastering data visualization with D3.js
* 3.8 - Margins and groups
*/

var margin = { left:100, right:10, top:10, bottom:100};
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var svg = d3.select("#chart-area")
              .append("svg")
                .attr("height", height + margin.top + margin.bottom)
                .attr("width", width + margin.left + margin.right);

var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + ", "
                  + margin.top + ")")

d3.json("data/buildings.json").then(function(data) {
  data.forEach(function(d) {
      d.height = +d.height;
  })

  var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) {return d.height; } )])
            .range([0, 400]);

  var x = d3.scaleBand()
            .domain(data.map(function(d) {return d.name; }))
            .range([0, 400])
            .paddingInner(0.2)
            .paddingOuter(0.2);

  var rects = g.selectAll("rect")
                 .data(data)
                 .enter()
                  .append("rect")
                    .attr("y", 0)
                    .attr("fill", "grey")
                    .attr("width", x.bandwidth)
                    .attr("x", function(d, i) {
                      return x(d.name);
                    })
                    .attr("height", function(d, i) {
                      return y(d.height);
                    });

}).catch(function(error) {
  console.log("Encountered an error: " + error);
});
