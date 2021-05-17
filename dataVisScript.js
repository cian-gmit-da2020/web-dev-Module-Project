var chartYear
var newData

function genChart(){

d3.select("#myDiv").selectAll("*").remove();

d3.csv("..\\csv-files\\populations.csv").then(function(data){
console.log(data);

newData = data;

chartYear = document.getElementById("years").value

var height = 80 
            
let svgContainer = d3.select("#myDiv").append("svg")
    .attr("width", 800)
    .attr("height", 800);

let myRectangle = svgContainer.selectAll("rect")
    .data(data);

myRectangle.enter()
    .append("rect")
    .attr("x", 100)
    .attr("y", function(d, i){
        return 50 + (i*85);
    } )
    .transition()
    .duration(500)
    .attr("x", 100)
    .attr("y", function(d, i){
        return 50 + (i*85);
    } )
    .attr("width", function(d){
        return Number(d[chartYear])*10;
    })
    .attr("height", height)
    .attr("fill", "RGBA(99,131,170,1)");


let myLabel = svgContainer.selectAll("text")
    .data(data);

myLabel.enter()
    .append("text")
    .attr("x", 160)
    .attr("y", function(d, i){
        return 90 + (i*85)})
    .text(function(d){
        return d[chartYear] +"m";
    })
    .attr("fill", "black");

myLabel.enter()
    .append("text")
    .attr("x", 220)
    .attr("y", function(d, i){
        return 90 + (i*85)})
    .text(function(d){
       return d.Country;
    });

var myimgs = svgContainer.selectAll("img")
    .data(data);

myimgs.enter()
    .append("svg:image")
    .attr('width', 80)
    .attr('height', 80)
    .attr("x", 0)
    .attr("y", function(d, i){
        return 45 + (i*85)})
    .attr("xlink:href", function(d){
        return d.image;
    });
})};