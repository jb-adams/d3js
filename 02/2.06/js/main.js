/*
* main.js
* Mastering data visualization with D3.js
* 2.6 - Selections and data joins
*/

// data join, we create an svg object from each object in an array
var data = [25, 20, 10, 12, 15];

var svg = d3.select("#chart-area")
              .append("svg")
                .attr("width", 400)
                .attr("height", 400);

// create a circle from each element in the data array
var circles = svg.selectAll("circle")
                    .data(data);

// use the enter method to render the shapes
// for an attribute, we can use an anonymous function instead of a
// hardcoded value
// the first argument represents an item in the array
// the second argument represents its index in the array
circles.enter()
          .append("circle")
            .attr("cx", function(d, i) {
              console.log(`Item: ${d}, Index: ${i}`);
              return (i * 50) + 25;
            })
            .attr("cy", 200)
            .attr("r", function(d) {
              console.log(`Item: ${d}`);
              return d;
            })
            .attr("fill", "red");
