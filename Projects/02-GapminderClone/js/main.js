/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

// define margins, plot height and width, svg canvas height and width
var margin = {top:100, right:10, bottom:200, left: 100};
var pWidth = 1000 - margin.left - margin.right;
var pHeight = 750 - margin.top - margin.bottom;
var svg = d3.select("#chart-area")
						.append("svg")
							.attr("width", pWidth + margin.left + margin.right)
							.attr("height", pHeight + margin.top + margin.bottom);

var t = d3.transition().duration(500); // transition between years

// Plot Groups
var pGroup = svg.append("g")
									.attr("transform", "translate(" + margin.left + ", "
									+ margin.top + ")" )

var xAxisGroup = pGroup.append("g")
												.attr("class", "x axis")
												.attr("transform", "translate(0, " + pHeight + ")" );

var yAxisGroup = pGroup.append("g")
												.attr("class", "y axis");

// X and Y scales
var x = d3.scaleLog()
					.domain([40, 400000])
					.range([0, pWidth])
					.base(10);

var y = d3.scaleLinear()
					.domain([0, 90])
					.range([pHeight, 0]);

var color = d3.scaleOrdinal()
								.domain(["europe", "asia", "americas", "africa"])
								.range(["#8dd3c7", "#ffffb3", "#bebada", "#fb8072",
 												"#80b1d3", "#fdb462"])

// var color = d3.scaleOrdinal()
//  								.range(["RED", "BLUE", "ORANGE", "GREEN"])

d3.json("data/data.json").then(function(allData){
	//X Axis Call
	var xAxisCall = d3.axisBottom(x)
											.tickValues([400, 4000, 40000])
											.tickFormat(function(tick) {
												return "$" + tick;
											})
	xAxisGroup.call(xAxisCall)
						.selectAll("text")
							.attr("font-size", "15px");

	var yAxisCall = d3.axisLeft(y);
	yAxisGroup.call(yAxisCall);

	var yearIdx = 0;
	d3.interval(function() {
		var yearData = allData[yearIdx]
		update(yearData);
		yearIdx += 1;
		if (yearIdx == allData.length) {
			yearIdx = 0;
		}
	}, 100)
})

function update(yearData) {
	// JOIN new data
	var year = yearData["year"];
	console.log(year);
	var countries = yearData["countries"];
	var circles = pGroup.selectAll("circle")
										 .data(countries, function(country) {
											 return country["country"];
										 });

	 // EXIT old elements
	 circles.exit().remove()

	 // ENTER new elements
	 circles.enter()
	 					.append("circle")
							.attr("fill", function(country) {
								return color(country["continent"]);
							})
							.merge(circles)
								.attr("cy", function(country) {
									return y(+country["life_exp"]);
								})
								.attr("cx", function(country) {
									var val = +country["income"];
									return x(val);
								})
								.attr("r", function(country) {
									var population = +country["population"]
									var areaFactor = 10000;
									var area = population / areaFactor
									var rSquared = area / Math.PI;
									var r = Math.sqrt(rSquared);
									return r;
								})

}
