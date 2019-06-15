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

var popScale = d3.scaleLinear()
								 .domain([0, 5000000])
								 .range([5, 25]);

var color = d3.scaleOrdinal()
								.domain(["europe", "asia", "americas", "africa"])
								.range(["#8dd3c7", "#ffffb3", "#bebada", "#fb8072",
 												"#80b1d3", "#fdb462"]);

// hardcoded legend
var continents = ["europe", "asia", "americas", "africa"];
var legend = pGroup.append("g")
									 .attr("transform", "translate(" + (pWidth - 10) +
								 				 "," + (pHeight-125) + ")");

continents.forEach(function(continent, i) {
	var legendRow = legend.append("g")
												.attr("transform", "translate(0, " + (i * 20) + ")");
	legendRow.append("rect")
						.attr("width", 10)
						.attr("height", 10)
						.attr("fill", color(continent));

	legendRow.append("text")
						.attr("x", -10)
						.attr("y", 10)
						.attr("text-anchor", "end")
						.style("text-transform", "capitalize")
						.text(continent);
});

// tooltip
var tip = d3.tip().attr('class', 'd3-tip')
									.html(function(d) {
										var text = "<strong>Country:</strong> <span style='color:red'>" + d.country + "</span><br>";
										text += "<strong>Continent:</strong> <span style='color:red;text-transform:capitalize'>" + d.continent + "</span><br>";
										text += "<strong>Life Expectancy:</strong> <span style='color:red'>" + d3.format(".2f")(d.life_exp) + "</span><br>";
										text += "<strong>GDP Per Capita:</strong> <span style='color:red'>" + d3.format("$,.0f")(d.income) + "</span><br>";
										text += "<strong>Population:</strong> <span style='color:red'>" + d3.format(",.0f")(d.population) + "</span><br>";
										return text;
									});
pGroup.call(tip);

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
							.on("mouseover", tip.show)
							.on("mouseout", tip.hide)
							.merge(circles)
								.attr("cy", function(country) {
									return y(+country["life_exp"]);
								})
								.attr("cx", function(country) {
									var val = +country["income"];
									return x(val);
								})
								.attr("r", function(country) {
									var population = +country["population"];
									var area = popScale(population);
									console.log("population: " + population + ", area: " + area);
									var rSquared = area / Math.PI;
									var r = Math.sqrt(rSquared);
									return r;
								})

}
