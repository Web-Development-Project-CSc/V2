# npm-google-geocode
client to get latitude and longitude by given address/city

## usage
var geocode = require('google-geocode');

geocode.setApiKey('key');
geocode.getGeocode('Berlin', function(data) {
    console.log("data " + data);
  }, function(err) {
    console.log("error " + err);
});
