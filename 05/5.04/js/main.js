/*
*    main.js
*    Mastering Data Visualization with D3.js
*    5.4 - The D3 Update Pattern
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

var xAxisGroup = g.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0, " + height + ")");

var yAxisGroup = g.append("g")
                    .attr("class", "y axis");

// X Scale
var x = d3.scaleBand()
          .range([0, width])
          .paddingInner(0.2)
          .paddingOuter(0.2);

// Y Scale
var y = d3.scaleLinear()
          .range([height, 0]);

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

    /* A d3 looping interval function. The function is run continuously with
     * a delay of the second argument in ms
     */
    d3.interval(function() {
      update(data);
    }, 1000);
    update(data);

}).catch(function(error) {
  console.log("Error encountered: " + error);
});

/*
 * Update function, executes within the interval loop to continuously update
 * what is displayed
 */
function update(data) {
  x.domain(data.map(function(d) {return d.month; } ))
  y.domain([0, d3.max(data, function(d) {return d.revenue; } )])

  // X Axis
  var xAxisCall = d3.axisBottom(x);
  xAxisGroup.call(xAxisCall)
            .selectAll("text")
              .attr("y", "10")
              .attr("x", "-5")
              .attr("text-anchor", "middle")
              .attr("font-size", "15px");

  // Y Axis
  var yAxisCall = d3.axisLeft(y)
                    .ticks(11)
                    .tickFormat(function(d) {
                      return "$"+d
                    });
  yAxisGroup.call(yAxisCall)
            .selectAll("text")
              .attr("font-size", "15px");

  // JOIN new data with old elements
  var rects = g.selectAll("rect")
               .data(data);

  // EXIT old elements not present in new data
  rects.exit().remove();

  // UPDATE old elements present in new data
  rects
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

  // ENTER new elements present in new data
  rects.enter()
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
}
