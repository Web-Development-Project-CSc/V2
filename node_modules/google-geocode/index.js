var http = require('https');

var apiKey = undefined;
var url = 'https://maps.googleapis.com/maps/api/geocode/json?key=';


function setApiKey(key) {
    apiKey = key;
}

function generateUrl(address) {
    return url + apiKey + '&address=' + address;
}

function getGeocode(address, success, error) {
    var link = generateUrl(address)
    //console.log("link " + link);
    var data = '';
    http.get(link, function(res) {
        //console.log("Response: " + res.statusCode);
        res.on('data', function(d) {
            data += d;
        });
        res.on('end', function(d) {
            //data += d;
            //console.log('data ' + data);
            success(data);
        });

    }).on('error', function(e) {
        //console.log("Error " + e.message);
        error(e.message);
    });
}


module.exports = {
    setApiKey: function(key) {
        setApiKey(key);
    },
    getGeocode: function(address, success, error) {
        getGeocode(address, success, error);
    }
};
