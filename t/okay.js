const crypto = require('crypto');
const express = require('express');
const axios = require('axios');
const app = express()
const fs = require('fs')
const path = require('path')


const utils = {
    SECURE_RANDOM: ()=>crypto.randomBytes(8).toString('hex'),
    CLIENT_ID: 'dc43672f0ccf25577de3b408fc14ae131742009c04c2496664cf3ac9ad9cf5de',
    CLIENT_SECRET: '56f4f2c76a030033b5781eb816e84bb10a4d90b0d8217e87c08e86f3e734b0cc',
    REDIRECT_URL: 'http://localhost:8000/coinbase/api/callback',
    SCOPE: '"wallet:accounts:read wallet:transactions:request wallet:transactions:transfer wallet:transactions:read wallet:transactions:send"',
    CODE: '979d5f156d69da86fb4363d7754e04c16f8cb74bf62d98327032534eba618df6',
    REFRESH_TOKEN: '41ac625d21f07c5508a2266f95f694fdfe68c9a388187e8052c02d2fee73b7b9',
    ACCESS_TOKEN: '9346872d4e29b76f27dc68eeb23621e4313c7ffbe07d929a2724b609b91cf16e',
}

const link = `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=dc43672f0ccf25577de3b408fc14ae131742009c04c2496664cf3ac9ad9cf5de&redirect_uri=http://localhost:8000/coinbase/api/callback&state=ggdf63gd4i76xM&meta[send_limit_amount]=1&meta[send_limit_currency]=USD&meta[send_limit_period]=day&scope=wallet:accounts:read,wallet:transactions:request,wallet:transactions:transfer,wallet:transactions:read,wallet:transactions:send`


const url = `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${utils.CLIENT_ID}&redirect_uri=${utils.REDIRECT_URL}&state=${utils.SECURE_RANDOM()}M&scope=${utils.SCOPE}`

async function run(){
    try{
        const res = await axios.get(url)
        console.log(res)
    }
    catch(err){
        console.log(err)
    }
}

const data = {
    grant_type: "refresh_token",
    client_id: "dc43672f0ccf25577de3b408fc14ae131742009c04c2496664cf3ac9ad9cf5de",
    client_secret: "56f4f2c76a030033b5781eb816e84bb10a4d90b0d8217e87c08e86f3e734b0cc",
    refresh_token: "3e29df282ad8b53e53fe79f52a6a0d747e2b7fa2cc5da15215b5d20b4c2fd418",
};
const dyn = {
    access_token: "bc5efffc9e609f9c9876f48465a7bb69cea65831c8701a06d13906c9a23498c5"
}

async function h(){

    try{
        const res = await axios.get('https://api.coinbase.com/v2/user', {header: {
            'Authorization': `Bearer ${dyn.access_token}`,
            'CB-VERSION': '2022-06-10'

        }})
        console.log(res.data)
    }

    
    catch(err){
        if(err.response.data.errors[0].message === 'The access token is invalid'){
            // Regenerate new accessToken

            //get the temp file and read refreshToken
              
        }
    }
}



async function regen(ref){
    
    const data = {
        grant_type: "refresh_token",
        client_id: "dc43672f0ccf25577de3b408fc14ae131742009c04c2496664cf3ac9ad9cf5de",
        client_secret: "56f4f2c76a030033b5781eb816e84bb10a4d90b0d8217e87c08e86f3e734b0cc",
        refresh_token: ref,
    };
    
    try{
        const res = await axios.post('https://api.coinbase.com/oauth/token', data);
    //save the refreshToken in file system (create temp file in the root directory and write the refreshToken to it)
    fs.writeFileSync(path.join(__dirname, '/ref.env'), res.data.refresh_token)
    return res.data.access_token
    }
    catch(err){
        console.log(err.response.data)
    }
}