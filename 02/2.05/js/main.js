/*
* main.js
* Mastering data visualization with D3.js
* 2.5 - Activity: Adding SVGs to the screen
*/

var svg = d3.select("#chart-area")
            .append("svg")
              .attr("width", 500)
              .attr("height", 400)

var line = svg.append("line")
                .attr("x1", 10)
                .attr("y1", 10)
                .attr("x2", 300)
                .attr("y2", 40)
                .attr("stroke", "red")
                .attr("stroke-width", 5)

var rect = svg.append("rect")
                      .attr("x", 10)
                      .attr("y", 50)
                      .attr("width", 150)
                      .attr("height", 300)
                      .attr("fill", "orange")

var ellipse = svg.append("ellipse")
                    .attr("cx", 350)
                    .attr("cy", 200)
                    .attr("rx", 75)
                    .attr("ry", 150)
                    .attr("fill", "purple")
