/* __AUTHORS__JavaScript by Calvin LaDue, Dylan Osborn, and Seka Major */
//begin script when window loads
window.onload = setMap();

//set up choropleth map
function setMap(){

    //map frame dimensions
    var width = 1100,
        height = 700;

    //create new svg container for the map
    var map = d3.select("body")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

    var projection = d3.geoRobinson()
        .scale(200)
        .translate([width / 2, height / 2]);

    var path = d3.geoPath()
        .projection(projection);

    //use d3.queue to parallelize asynchronous data loading
    d3.queue()
        //.defer(d3.csv, "data/unitsData.csv") //load attributes from csv
        .defer(d3.json, "data/ne_50m_admin_0_countries_lakes.topojson") //load background spatial data
        .defer(d3.csv, "data/SPI.csv") //load attributes from csv
        //.defer(d3.json, "data/FranceProvinces.topojson") //load choropleth spatial data
        .await(callback);
        function callback(error, world, csvData){
            //translate europe TopoJSON
            var wholeWorld = topojson.feature(world, world.objects.ne_50m_admin_0_countries_lakes);
            //add Europe countries to map
            var world = map.append("path")
              .datum(wholeWorld)
              .attr("class", "countries")
              .attr("d", path);
            var countries = map.selectAll(".countries")
              .data(worldCountries)
              .enter()
              .append("path")
              .attr("class", function(d){
                return "countries " + d.properties.Country;
    })
              .attr("d", path);

            //examine the results
            //console.log(ne_50m_admin_0_countries_lakes);

        };
};
