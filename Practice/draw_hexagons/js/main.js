/*
* main.js
* Mastering data visualization with D3.js
* 3.2 - Practice Drawing Hexagons
*/

var svg = d3.select("#chart-area")
              .append("svg")
                .attr("height", 400)
                .attr("width", 1000);

/* formula for hexagon points
*/
var horizontalSquareDistRatio = 0.25;
var verticalSquareDistRatio = 1 - horizontalSquareDistRatio;
var sideLength = 10;
var diagHorizontalDistance = Math.sqrt( (Math.pow(sideLength, 2) * horizontalSquareDistRatio) );
var hd = diagHorizontalDistance;
var diagVerticalDistance = Math.sqrt( (Math.pow(sideLength, 2) * verticalSquareDistRatio) );
var vd = diagVerticalDistance;

var totalHorizontalDistance = (2 * sideLength) + (2 * hd);
var totalVerticalDistance = vd;
var oddEvenHorizontalOffset = sideLength + hd;


// shape rendering properties
var xOffset = 10;
var yOffset = 10;
var cellsPerRow = 10;

// create d3 ordinal scale for colors
var color = d3.scaleOrdinal()
  .domain(["Burj Khalifa", "Shanghai Tower", "Abraj Al-Bait Clock Tower", "Ping An Finance Centre", "Lotte World Tower"])
  .range(["#66c2a5", "#fc8d62", "#8da0cb", "#66c2a5", "#fc8d62"])

var pointTemplates = [
  [xOffset, yOffset],
  [xOffset + sideLength, yOffset],
  [xOffset + sideLength + hd, yOffset + vd],
  [xOffset + sideLength, yOffset + vd + vd],
  [xOffset, yOffset + vd + vd],
  [xOffset - hd, yOffset + vd]
]

d3.json("data/buildings.json").then(function(data) {
  data.forEach(function(d) {
      d.height = +d.height;
  })



  // var pointString = `${points[0]} ${points[1]} ${points[2]} ${points[3]} ${points[4]} ${points[5]}`;
  // var pointString = "66.67,200.00 133.33,315.47 266.67,315.47 333.33,200.00 266.67,84.53 133.33,84.53";
  // var pointString = "10,10 15,18.66 25,18.66 30,10 25,1.34 15,1.34";

  var polys = svg.selectAll("polygon")
                 .data(data)
                 .enter()
                 .append("polygon")
                  .attr("points", function(d, i) {
                    var col = i % cellsPerRow;
                    var row = parseInt(i / cellsPerRow);
                    var useOffset = oddEvenHorizontalOffset * (row % 2);

                    var points = [];
                    pointTemplates.forEach(function(pointTemplate) {
                      points.push([
                        pointTemplate[0] + (totalHorizontalDistance * col) + useOffset,
                        pointTemplate[1] + (totalVerticalDistance * (parseInt(i / cellsPerRow)))
                      ])
                    });

                    var pointStrings = points.map(p => p[0] + "," + p[1]);
                    var pointString = pointStrings.join(" ");

                    return pointString;
                  })
                  .attr("fill", function(d, i) {
                    return color(d.name);
                  });

}).catch(function(error) {
  console.log("Encountered an error: " + error);
});
