/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

var margin = { top:100, right:10, bottom:200, left:100};
var width = 1000 - margin.left - margin.right;
var height = 750 - margin.top - margin.bottom;

var svg = d3.select("#chart-area")
            .append("svg")
              .attr("height", height + margin.top + margin.bottom)
              .attr("width", width + margin.left + margin.right);

var g = svg.append("g")
            .attr("transform", "translate(" + margin.left
                  + ", " + margin.top + ")");

// X Label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", width / 2)
  .attr("y", height + 75)
  .attr("text-anchor", "middle")
  .attr("font-size", "30px")
  .text("Month")

// Y Label
g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (height / 2))
  .attr("y", - (margin.left / 1.5))
  .attr("text-anchor", "middle")
  .attr("font-size", "30px")
  .attr("transform", "rotate(-90)")
  .text("Revenue")

// Render Data
d3.json("data/revenues.json").then(function(data) {
  data.forEach(function(d) {
    d.revenue = +d.revenue;
    d.profit = +d.profit;
  })

  // X Scale
  var x = d3.scaleBand()
            .domain(data.map(function(d) {return d.month; } ))
            .range([0, width])
            .paddingInner(0.2)
            .paddingOuter(0.2);

  // Y Scale
  var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) {return d.revenue; } )])
            .range([height, 0]);

  var xAxisCall = d3.axisBottom(x);
  g.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxisCall)
    .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "middle")
      .attr("font-size", "15px");

  var yAxisCall = d3.axisLeft(y)
                    .ticks(11)
                    .tickFormat(function(d) {
                      return "$"+d
                    });
  g.append("g")
    .attr("class", "y-axis")
    .call(yAxisCall)
    .selectAll("text")
      .attr("font-size", "15px");

  // Render Bars
  console.log("rects");
  var rects = g.selectAll("rect")
               .data(data)
               .enter()
                  .append("rect")
                    .attr("x", function(d) {
                      return x(d.month);
                    })
                    .attr("y", function(d) {
                      return y(d.revenue);
                    })
                    .attr("width", x.bandwidth)
                    .attr("height", function(d) {
                      return height - y(d.revenue);
                    })
                    .attr("fill", "grey");

}).catch(function(error) {
  console.log("Error encountered: " + error);
});
