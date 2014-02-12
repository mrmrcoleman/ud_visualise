/* global d3 */
(function() {

    "use strict";

    var api_key = getURLParameter("index");
    if (api_key === null) {
        api_key = "";
    }

    //Data
    var indexes={
        "SP500": "http://www.quandl.com/api/v1/datasets/YAHOO/INDEX_GSPC.csv?" + api_key + "&trim_start=1950-01-03&trim_end=2014-01-29&sort_order=desc",
        "Nasdaq": "http://www.quandl.com/api/v1/datasets/YAHOO/INDEX_IXIC.csv?" + api_key + "&trim_start=1971-02-05&trim_end=2014-01-29&sort_order=desc",
        "FTSE": "http://www.quandl.com/api/v1/datasets/YAHOO/INDEX_FTSE.csv?" + api_key + "&trim_start=2000-01-01&trim_end=2014-01-28&sort_order=desc",
        "AEX": "http://www.quandl.com/api/v1/datasets/YAHOO/INDEX_AEX.csv?" + api_key + "&trim_start=1992-10-12&trim_end=2014-01-29&sort_order=desc",
        "DAX": "http://www.quandl.com/api/v1/datasets/YAHOO/INDEX_GDAXI.csv?" + api_key + "&trim_start=1990-11-26&trim_end=2014-01-29&sort_order=desc",
        "RDSB": "http://www.quandl.com/api/v1/datasets/GOOG/LON_RDSB.csv?" + api_key + "&trim_start=2000-01-01&trim_end=2014-01-30&sort_order=desc", 
        "HSBA": "http://www.quandl.com/api/v1/datasets/GOOG/LON_HSBA.csv?" + api_key + "&trim_start=2000-01-01&trim_end=2014-01-30&sort_order=desc", 
        "BATS": "http://www.quandl.com/api/v1/datasets/GOOG/LON_BATS.csv?" + api_key + "&trim_start=2000-01-01&trim_end=2014-01-30&sort_order=desc", 
        "VOD": "http://www.quandl.com/api/v1/datasets/GOOG/LON_VOD.csv?" + api_key + "&trim_start=2000-01-01&trim_end=2014-01-30&sort_order=desc", 
        "GSK": "http://www.quandl.com/api/v1/datasets/GOOG/LON_GSK.csv?" + api_key + "&trim_start=2000-01-01&trim_end=2014-01-30&sort_order=desc" 
    };

    //Setup
    var margin = {top: 20, right: 50, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;


    //Main bit of program


    var stock2 = "FTSE";
    var stock1 = getURLParameter("index");

    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    loadIndexData(indexes[stock1],
            function(data) {

                x.domain(d3.extent(data, function(d) { return d.Date;}));

                var svg = createSVG();
                addXAxis(svg, x);
                addSymbols(svg, stock1, stock2);

                var ext = addLine(data, svg, x, y, "new-line");
                y.domain(ext);
                addLeftAxis(y, svg);
                loadIndexData(indexes[stock2],
                    function (data2) {
                        var ext = addLine(data2, svg, x, y);

                        y.domain(ext);
                        addRightAxis(y, width, svg);
                    });
            });


    //The functions that do shit

    function getURLParameter(name) {

        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    }

    var parseDate = d3.time.format("%Y-%m-%d").parse;

    function loadIndexData(url, callback) {

        d3.csv(url, function (error, csv) {

            if (error) {
                return console.warn(error);
            }
            var ret = csv;
            ret.forEach(function(d) {
                d.Date = parseDate(d.Date);
                d.Close = +d.Close; //force to number
            });
            callback(ret);

        }); 
    }


    function addLeftAxis(axisScale, svg) {
        var yAxis = d3.svg.axis()
            .scale(axisScale)
            .orient("left");

        svg.append("g")
            .attr("class", "y laxis axis")
            .call(yAxis);
    }

    function addRightAxis(axisScale, width, svg) {

        var yAxis = d3.svg.axis()
            .scale(axisScale)
            .orient("right");

        svg.append("g")
            .attr("class", "y raxis axis")
            .attr("transform", "translate(" + width + ",0)")
            .call(yAxis);
    }

    function createSVG () {

        return d3.select("#chart").html("").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("id", "svg-group")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }

    function addSymbols(svg, stock1, stock2) {

        svg.append("text")
            .attr("x", 36)
            .attr("y", height - 6)
            .style("text-anchor", "end")
            .attr("class", "symbol1")
            .text(stock1);

        svg.append("text")
            .attr("x", width - 6)
            .attr("y", height - 6)
            .style("text-anchor", "end")
            .attr("class", "symbol2")
            .text(stock2);
    }


    function addXAxis(svg, x) {

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
    }

    /*
     * Adds line for data and returns extent.
     */
    function addLine(ldata, svg, x, y) {

        //Optional style argument
        var style = "line";
        if (arguments[4]) {
            style = arguments[4];
        }

        var line_ext = d3.extent(ldata, function(d) { return d.Close; });
        y.domain(line_ext);

        var line = d3.svg.line()
            .x(function(d) { return x(d.Date); })
            .y(function(d) {  
                return y((d.Close)); 
            });

        svg.append("path")
            .datum(ldata)
            .attr("class", style)
            .attr("d", line);

        //For next axis
        return line_ext;
    }

})();
