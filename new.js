var crypto = require('crypto');
const axios = require('axios');
require('dotenv').config()

var apiKey = process.env.CB_ACCESS_KEY;
var apiSecret = process.env.CB_API_SECRET;
const baseUrl = 'https://api.coinbase.com';


//get unix time in seconds
async function time(){
    const res = await axios.get("https://api.coinbase.com/v2/time");
    return res.data.data.epoch

}

// set the parameter for the request message
var req = {
    method: 'GET',
    path: '/v2/users',
};
async function run(){
    try{
        const timestamp = await time();

        const message = Math.floor((timestamp))  + req.method + req.path;

        var signature = crypto.createHmac("sha256", apiSecret).update(message).digest("hex");

        const res = await axios.get(`${baseUrl}/v2/accounts`, {
            headers: {
                Accept: 'application/json',
                'CB-ACCESS-SIGN': signature,
                'CB-ACCESS-TIMESTAMP': timestamp,
                'CB-ACCESS-KEY': apiKey,
                'CB-VERSION': '2022-06-10'
            }
        })
        console.log(res)
    }
    catch(err){
        console.log(err)
    }
}
