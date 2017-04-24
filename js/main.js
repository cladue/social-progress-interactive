/* __AUTHORS__JavaScript by Calvin LaDue, Dylan Osborn, and Seka Major */
//begin script when window loads
window.onload = setMap();

//set up choropleth map
function setMap(){
    //use d3.queue to parallelize asynchronous data loading
    d3.queue()
        //.defer(d3.csv, "data/unitsData.csv") //load attributes from csv
        .defer(d3.json, "data/ne_50m_admin_0_countries_lakes.topojson") //load background spatial data
        //.defer(d3.json, "data/FranceProvinces.topojson") //load choropleth spatial data
        .await(callback);
        function callback(error, csvData, world){
            //translate europe TopoJSON
            var wholeWorld = topojson.feature(world, world.objects.ne_50m_admin_0_countries_lakes);


            //examine the results
            console.log(ne_50m_admin_0_countries_lakes);

        };
};
