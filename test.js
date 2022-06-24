const Coinbase = require('./src/index');
require('dotenv').config()

const coinbase = new Coinbase({
    env: 'prod',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    refresh_token: process.env.REFRESH_TOKEN,
})

async function run(){
    try{

        await coinbase.init()
        const res = await coinbase.account.send({account_id: "", wallet_address: '', amount: 50, currency: 'LTC', token: ''})
        console.log(res.data)
    }
    catch(err){
        if(err.response){
            console.log(err.response.data)
        }else{
            console.log(err.message)
        }
    }
}

run()
