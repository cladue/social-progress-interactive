//begin script when window loads
window.onload = setMap();

//set up choropleth map
function setMap(){
    //map frame dimensions
    var width = 1100,
        height = 600;

    //create new svg container for the map
    var map = d3.select("body")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

    //create Albers equal area conic projection centered on France
    var projection = d3.geoRobinson();

    var path = d3.geoPath()
        .projection(projection);

    //use d3.queue to parallelize asynchronous data loading
    d3.queue()
        .defer(d3.csv, "data/SPI_Data.csv") //load attributes from csv
        .defer(d3.json, "data/countries.topojson") //load background spatial data
        .await(callback);

    function callback(error, csvData, world){
        //translate TopoJSON
        var worldCountries = topojson.feature(world, world.objects.collection).features;

        //add countries to map
        var countries = map.selectAll(".countries")
            .data(worldCountries)
            .enter()
            .append("path")
            .attr("class", function(d){
              return "countries " + d.properties.adm0_a3;
            })
            .attr("d", path);
    };
};
