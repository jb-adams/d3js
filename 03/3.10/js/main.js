/*
* main.js
* Mastering data visualization with D3.js
* 3.10 - Axes and Labels
*/

var margin = { left:100, right:10, top:10, bottom:200};
var width = 600 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var svg = d3.select("#chart-area")
              .append("svg")
                .attr("height", height + margin.top + margin.bottom)
                .attr("width", width + margin.left + margin.right);

var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + ", "
                  + margin.top + ")")

// X Label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", width / 2)
  .attr("y", height + 140)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("The world's tallest buildings");

// Y Label
g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (height / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Height (m)");

d3.json("data/buildings.json").then(function(data) {
  data.forEach(function(d) {
      d.height = +d.height;
  })

  var x = d3.scaleBand()
            .domain(data.map(function(d) {return d.name; }))
            .range([0, width])
            .paddingInner(0.2)
            .paddingOuter(0.2);

  var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) {return d.height; } )])
            .range([height, 0]);
  console.log(data);

  var xAxisCall = d3.axisBottom(x);
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxisCall)
    .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)");

  var yAxisCall = d3.axisLeft(y)
                    .ticks(3)
                    .tickFormat(function(d) {
                      return d + "m";
                    });
  g.append("g")
    .attr("class", "y-axis")
    .call(yAxisCall);

  var rects = g.selectAll("rect")
                 .data(data)
                 .enter()
                  .append("rect")
                    .attr("y", function(d) {
                      return y(d.height);
                    })
                    .attr("fill", "grey")
                    .attr("width", x.bandwidth)
                    .attr("x", function(d, i) {
                      return x(d.name);
                    })
                    .attr("height", function(d, i) {
                      return height - y(d.height);
                    });

}).catch(function(error) {
  console.log("Encountered an error: " + error);
});
