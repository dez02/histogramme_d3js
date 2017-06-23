$.getJSON('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function(data){
	var dataset = data.data;
	console.log(data.data);
	

var svgWidth = 800;
var svgHeight = 500;
var padding = 40;

var xScale = d3.scaleLinear()
               .domain([0, d3.max(dataset,(d) => d[0])])
               .range([padding, svgWidth - padding * 2]);

var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, (d) => d[1])])
               .range([svgHeight - padding, padding]); 

var rScale = d3.scaleLinear()
              .domain([0, d3.max(dataset,(d)=> d[1])])
              .range([2,5]);

// Create svg
var svg = d3.select("body")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("cx", (d)=> xScale(d[0]))
   .attr("cy", (d)=> yScale(d[1]))
   .attr("r", (d)=> rScale(d[1]));

    // Create X axis
var xAxis = d3.axisBottom(xScale)
              // .ticks(5);

svg.append("g")
               .attr("class","axis")
               .attr("transform", "translate(0," + (svgHeight - padding) + ")")
               .call(xAxis);



	
});

								

