/*
* main.js
* Mastering data visualization with D3.js
* 2.7 - Loading external data
*/

var svg = d3.select("#chart-area")
              .append("svg")
                .attr("width", 400)
                .attr("height", 400);

d3.json("data/ages.json").then(function(data) {
  console.log(data);

  data.forEach(function(d) {
    d.age = +d.age;
  });

  // create a circle from each element in the data array
  var circles = svg.selectAll("circle")
                      .data(data);

  circles.enter()
            .append("circle")
              .attr("cx", function(d, i) {
                return (i * 50) + 25;
              })
              .attr("cy", 200)
              .attr("r", function(d) {
                return d.age * 2;
              })
              .attr("fill", function(d) {
                if (d.name == "Tony") {
                  return "blue";
                } else {
                  return "red";
                }
              });
}).catch(function(error) {
  console.log(error);
})
