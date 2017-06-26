$.getJSON('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function(data){
	var dataset = data.data;	

var svgWidth = 800;
var svgHeight = 500;
var padding = 40;
var barPadding = 2;


// Define the x scale
var mindate = new Date(1947,0,1),
    maxdate = new Date(2015,06,01);
            
var xScale = d3.scaleTime()
	      		.domain([mindate, maxdate])    
				.range([padding, svgWidth - padding * 2]);   
		    
// yScale
var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, (d) => d[1])])
               .range([svgHeight - padding, padding]); 


// Create svg
var svg = d3.select("body")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", (d)=> xScale(Date.parse(d[0])))
   .attr("y", (d)=> yScale(d[1]))
   .attr("width", svgWidth / dataset.length - barPadding)
   .attr("height", (d)=> (svgHeight - padding - yScale(d[1])))
   .attr("fill", "red");

// Create X axis
var xAxis = d3.axisBottom(xScale)
              .ticks(12);

svg.append("g")
               .attr("class","axis")
               .attr("transform", "translate(0," + (svgHeight - padding) + ")")
               .call(xAxis);

//Create Y axis
var yAxis = d3.axisLeft(yScale)
                .ticks(10);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

});

								

