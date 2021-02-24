const request = require('request');

const forecast =  (longitude, latitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=43905140a9d23b4d1a6ea952853fe4e0&query=${longitude}, ${latitude}&units=f`
    
    request({ url, json: true }, (error, response) => {
        
        const {temperature, feelslike} = response.body.current;
    
        if (error) {
            callback('unable to connect to weather service', undefined);
        }
        else if (response.body.error) {
            callback('Unable to find location', undefined);
        }
        else {
            callback(undefined, {
                temperature,
                feelslike,
                region: response.body.location.region
            });
        }
    });
}


module.exports = forecast;
    