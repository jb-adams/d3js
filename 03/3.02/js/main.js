/*
* main.js
* Mastering data visualization with D3.js
* 3.2 - Linear Scales
*/

var svg = d3.select("#chart-area")
              .append("svg")
                .attr("height", 400)
                .attr("width", 1000);

d3.json("data/buildings.json").then(function(data) {
  data.forEach(function(d) {
      d.height = +d.height;
  })

  /* linear scale
  * defined with "d3.scaleLinear" method
  * takes an input domain min and max
  * and an output range min max
  */
  var y = d3.scaleLinear()
            .domain([0, 828])
            .range([0, 400])

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
                    console.log(d.height);
                    return y(d.height); // we use the "y" linear scale here
                  });

}).catch(function(error) {
  console.log("Encountered an error: " + error);
});
