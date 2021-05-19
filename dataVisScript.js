/* 
Cian Hogan, Web Development Module Project
Population Chart Generator
Generates a horizontal bar chart for population numbers.
Uses d3js and pulls info from CSV file
*/

// Variables to store User input
var chartSize
var transDuration
var styleTheme

// Style variables
var bcgColor = "white"
var innerColor = "RGBA(99,131,170,1)"
var txtColor = "black"


// Define function
function populationChart(){

// get user inoput from customization options
    chartSize = document.getElementById("sizeInput").value;
    transDuration = document.getElementById("transitionInput").value;
    styleTheme = document.getElementById("styleInput").value;

// if dark theme chosen change style variabes
    if (styleTheme == "dark"){
        bcgColor = "black";
        innerColor = "RGBA(245,238,238,1)";
        txtColor = "white";
    }
    else{ // else return to origial colors
        bcgColor = "white";
        innerColor = "RGBA(99,131,170,1)";
        txtColor = "black";
    }


// Removes any current charts from the page before creating a new one
d3.select("#myDiv").selectAll("*").remove();

// uses d3 to access csv file
d3.csv("..\\csv-files\\populations.csv").then(function(data){
console.log(data);

// Pulls the year to create from user input dropdown element
var chartYear = document.getElementById("years").value

// height of each bar
var binHeight = chartSize/6 

// scale for width
    var x = d3.scaleLinear()
        .domain([0, 70])
        .range([0, ((chartSize/4)*3)]);

   

    // Height and Width of SVG
    var height = chartSize;
    var width = chartSize;


// container variable for generating new SVG in the div element
let svgContainer = d3.select("#myDiv").append("svg")
    .attr("width", chartSize)
    .attr("height", chartSize);

// var to generate each rectanlge in bar chart in the SVG
let myRectangle = svgContainer.selectAll("rect")
    .data(data); // uses the data pulled from CSV

myRectangle.enter()
    .append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", bcgColor);

// Add rectangle for each entry in the data
// uses anonymous functions to position the rect on y axis and calculate width
myRectangle.enter()
    .append("rect")
    .attr("x", chartSize/5)
    .attr("y", function(d, i){
        return 50 + ((i*binHeight)+5);
    } )
    .transition()
    .duration(transDuration)
    .attr("x", chartSize/5)
    .attr("y", function(d, i){
        return 50 + ((i*binHeight)+5);
    } )
    .attr("width", function(d){
        return x(Number(d[chartYear]));
    })
    .attr("height", binHeight)
    .attr("fill", innerColor);

// adding rect to highlight label text against bcg
myRectangle.enter()
    .append("rect")
    .attr("width", chartSize/6+40)
    .attr("height", 20)
    .attr("x", chartSize/3-10)
    .attr("y", function(d, i){
        return chartSize/6.5 + (i*binHeight)+2})
    .attr("fill", bcgColor);


// variable to generate text based labels
let myLabel = svgContainer.selectAll("text")
    .data(data);

// Add label for size of population
myLabel.enter()
    .append("text")
    .attr("x", chartSize/3-10)
    .attr("y", function(d, i){
        return chartSize/6.5 + ((i*binHeight))+20})
    .text(function(d){
        return d[chartYear] +"m";
    })
    .attr("fill", txtColor)
    .attr("text-shadow", bcgColor);

// Add label for country name
myLabel.enter()
    .append("text")
    .attr("x", chartSize/2.5+10)
    .attr("y", function(d, i){
        return chartSize/6.5 + ((i*binHeight))+20})
    .text(function(d){
       return d.Country;
    })
    .attr("fill", txtColor)
    .attr("text-shadow", bcgColor);

// variable to generate images for the SVG
var myimgs = svgContainer.selectAll("img")
    .data(data);

// add the images based on image file paths in CSV 
myimgs.enter()
    .append("svg:image")
    .attr('width', binHeight)
    .attr('height', binHeight)
    .attr("x", 0)
    .attr("y", function(d, i){
        return 45 + ((i*binHeight)+5)})
    .attr("xlink:href", function(d){
        return d.image;
    });
})};


// Our array dataset for our second function

var dataArray = {
        "years": [2012, 2014, 2016, 2018, 2020],
        "Ireland": [150000, 150000, 183000, 227000, 240000],
        "England": [177488, 197771, 227337, 245303, 267000],
        "Scotland": [125248, 131664, 149312, 149312, 164000],
        "Wales": [127898, 134879, 144425, 157738, 179000],
        "Northern Ireland": [102858, 107616, 122972, 133496, 148000]
        }

/*
two fucntions used to generate out line plot
one gnerates a single plot while the second plots all lines in one graph
third function used to decide which funciton to use
*/

// Chooser function, depending on user input in dropdown element 
function housePriceChart(){
    var choice = document.getElementById("pickCountry").value;
    
    if (choice == "all"){
        genAllChart(); // Generate multiple line plot
    }
    else{
        genCountryChart(); // Generate single line plot
    }
}


// Variable to associate a color with country so that we have consistent marking
var countryColorList = {'Ireland':"green", 'England':"black", 
    'Scotland':"blue", 'Wales':"red", "Northern Ireland":"orange"};
// List of the countries
var countryList = ['Ireland', 'England', 'Scotland', 'Wales', "Northern Ireland"];
// list of colors used
var colorList = ["green", "black", "blue", "red" ,"orange"];

/*
Generates a single line plot based on the user selection in input element
*/            
function genCountryChart(){
// removes any previous charts from div
    d3.select("#myDiv").selectAll("*").remove();

// get user inputs for customization inputs
    chartSize = document.getElementById("sizeInput").value;
    transDuration = document.getElementById("transitionInput").value;
    styleTheme = document.getElementById("styleInput").value;

// if dark is chosen change style variables
    if (styleTheme == "dark"){
        bcgColor = "black";
        innerColor = "RGBA(245,238,238,1)";
        txtColor = "white";
        countryColorList.England = "white";
    } // else return to origial colors
    else{
        bcgColor = "white";
        innerColor = "RGBA(99,131,170,1)";
        txtColor = "black";
        countryColorList.England = "black";
    }

// variables for transform attribute
    var t1 = chartSize/8
    var t2 = chartSize - t1

// Variable to store user choice from dropdown
    var choice = document.getElementById("pickCountry").value;

// Max and min values used in scales
    var maxYear = d3.max(dataArray["years"]);
    var minYear = d3.min(dataArray["years"]);
    var maxPrice = 300000;

// Height and Width of SVG
    var height = chartSize;
    var width = chartSize;

// array to store data once it's been formatted
    var data = []
// counter variable i
    var i;
// format data to usable structure with for loop
    for (i=0; i < dataArray["years"].length; i++){
        var temp = {year:dataArray["years"][i], price:dataArray[choice][i]};
        data.push(temp);                    
    }

// create X and Y scales using d3.scaleLinear
    var y = d3.scaleLinear()
        .domain([50000, maxPrice])
        .range([((chartSize/4)*3), 0]);

    var x = d3.scaleLinear()
        .domain([minYear, maxYear])
        .range([0, ((chartSize/4)*3)]);

// create X and Y axis variables from scales, tick format removes commas from x ticks
    var yAxis = d3.axisLeft(y);
    var xAxis = d3.axisBottom(x).tickFormat(d3.format("d"));

// create a variable for generating SVG in div
    var mySvg = d3.select("#myDiv")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
// Add a blank rect to use for BG color
    mySvg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", bcgColor);

// variable for generating group element in SVG
    var chartGroup = mySvg.append("g");

// Using d3.line method to create line generator
// applying scale variables to the data with anonymous funcitons
    var line = d3.line()
        .x(function(d){
            return x(d.year); 
        })
        .y(function(d){
            return y(d.price);  
        });

// append path element to the group to create line
    chartGroup.append("path")
        .transition()
        .duration(transDuration)
        .attr("d", line(data))
        .attr("transform", "translate("+t1+","+t1+")")
        .attr('stroke', countryColorList[choice])
        .attr("fill", "none");

// Adding our X and y axis
    chartGroup.append("g")
        .attr("transform", "translate("+t1+","+t2+")")
        .call(xAxis)
        .attr("color", txtColor); 
    chartGroup.append("g")
        .attr("transform", "translate("+t1+","+t1+")")
        .call(yAxis)
        .attr("color", txtColor);;

// chart title variable
    var chartTitle = choice+" Average House prices 2012-2020"

// adding chart title
    document.getElementById("chartTitleDiv").innerHTML = chartTitle;
    document.getElementById("chartTitleDiv").style.display = "inline";
}

/*
Generates a multiple line plot based on the user selection in input element
*/ 

function genAllChart(){
// removes any previous charts from div
    d3.select("#myDiv").selectAll("*").remove();

// Get user input for adjustable features
    chartSize = document.getElementById("sizeInput").value;
    transDuration = document.getElementById("transitionInput").value;
    styleTheme = document.getElementById("styleInput").value;

// if style set to dark change the color variables
    if (styleTheme == "dark"){
        bcgColor = "black";
        innerColor = "RGBA(245,238,238,1)";
        txtColor = "white";
        colorList[1] = "white";
    } // else return to origial colors
    else{
        bcgColor = "white";
        innerColor = "RGBA(99,131,170,1)";
        txtColor = "black";
        colorList[1] = "black";
    }

// var for transform attribute
    var t1 = chartSize/8
    var t2 = chartSize - t1

// Max and min values used in scales
    var maxYear = d3.max(dataArray["years"]);
    var minYear = d3.min(dataArray["years"]);
    var maxPrice = 300000;
// Height and Width of SVG
    var height = chartSize;
    var width = chartSize;

// create X and Y scales using d3.scaleLinear
    var y = d3.scaleLinear()
        .domain([50000, maxPrice])
        .range([((chartSize/4)*3), 0]);

    var x = d3.scaleLinear()
        .domain([minYear, maxYear])
        .range([0, ((chartSize/4)*3)]);

// create X and Y axis variables from scales, tick format removes commas from x ticks
    var yAxis = d3.axisLeft(y);
    var xAxis = d3.axisBottom(x).tickFormat(d3.format("d"));

// create a variable for generating SVG in div
    var mySvg = d3.select("#myDiv")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

// Add a blank rect to use for BG color
    mySvg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", bcgColor);

// variable for generating group element in SVG
    var chartGroup = mySvg.append("g");

// Using d3.line method to create line generator
    var line = d3.line()
            .x(function(d){
                return x(d.year); 
            })
            .y(function(d){
                return y(d.price);  
            });

// Counter var i
    var i;
// For loop to loop through our list of counties
    for (i=0; i < countryList.length; i++){
// Temp data storage variable
        var data = [];
// new counter j
        var j;
// format data to usable structure with for loop, selecting each country in the loop
        for (j=0; j < dataArray["years"].length; j++){
            var temp = {year:dataArray["years"][j], price:dataArray[countryList[i]][j]};
            data.push(temp);

// append path element to the group to create line
            chartGroup.append("path")
                .attr("d", line(data))
                .transition()
                .duration(transDuration)
                .attr("d", line(data))
                .attr("transform", "translate("+t1+","+t1+")")
                .attr('stroke', colorList[i])
                .attr("fill", "none");                    
    }}

// Add X and Y axis
    chartGroup.append("g")
        .attr("transform", "translate("+t1+","+t2+")")
        .call(xAxis)
        .attr("color", txtColor); 
    chartGroup.append("g")
        .attr("transform", "translate("+t1+","+t1+")")
        .call(yAxis)
        .attr("color", txtColor);

// new counter K
    var k;

// for loop to generate labels for legend
    for (k=0; k < countryList.length; k++){

// append a small circle to show color of entry
// shifting the position per loop
        chartGroup.append("circle")
            .attr("x", chartSize)
            .attr("y", chartSize)
            .transition()
            .duration(transDuration)
            .attr("cx", chartSize/4-10)
            .attr("cy", chartSize/8+(20*k))
            .attr("r", 6)
            .style("fill", colorList[k]);

// append country name to the right of the circle
        chartGroup.append("text")
            .attr("x", chartSize)
            .attr("y", chartSize)
            .transition()
            .duration(transDuration)
            .attr("x", chartSize/4)
            .attr("y", chartSize/8+(20*k))
            .text(countryList[k])
            .style("font-size", "15px")
            .attr("alignment-baseline","middle")
            .attr("fill", txtColor);

        }

// Chart Title Variable
    var chartTitle = "UK and Ireland Average House prices 2012-2020"
// Add Chart Title
    document.getElementById("chartTitleDiv").innerHTML = chartTitle;
    document.getElementById("chartTitleDiv").style.display = "inline";

  }