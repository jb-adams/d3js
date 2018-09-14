/*
* main.js
* Mastering data visualization with D3.js
* 2.8 - Activity: Your first visualization!
*/

var svg = d3.select("#chart-area")
              .append("svg")
                .attr("height", 1000)
                .attr("width", 1000);

d3.json("data/buildings.json").then(function(data) {
  data.forEach(function(d) {
      d.height = +d.height;
  })

  var rects = svg.selectAll("rect").data(data);

  rects.enter()
          .append("rect")
            .attr("y", 10)
            .attr("width", 40)
            .attr("fill", "grey")
            .attr("x", function(d, i) {
              return (i * 50) + 10;
            })
            .attr("height", function(d, i) {
              console.log(d.height);
              return d.height;
            });

}).catch(function(error) {
  console.log("Encountered an error: " + error);
});
