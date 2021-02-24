const request = require('request');

const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZWR1YXJkb2hlcm5hbmRleiIsImEiOiJjanV4dTZ1b3owYmdmNGFwaW92M2V6b3FtIn0.2UGPXBebL5ScCvyC1ISTUQ&limit=1`
    
    request({url, json: true}, (error, response) => {

       if (error) {
           callback('unable to connect to weather service', undefined)
       } 
       else if (response.body.features.length === 0) {
           callback('Unable to find location. Try another search', undefined);
       }
       else {

        const { features } = response.body;

        const data = features.map((data) => data.center);
        
           callback(undefined, {
               latitude:  data[0][1],
               longitude: data[0][0],
               location: response.body.features[0].place_name,
           })
       }
    });

}

module.exports = geocode;