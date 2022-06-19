const axios = require('axios')
const ccxt = require('ccxt');
const express = require('express');
const cors = require('cors');
const app = express()
const url = 'https://api.coinbase.com/v2'

const accesstoken = '93cae5797c0556253feb48b12d39eb0100ae4f8d0285f17eb457b187d6ebd03b'

app.use(cors());
app.get('/',  async(req, res)=>{
    res.send('bhg')
})

app.get('/accounts', async(req, res)=>{
    const config = {
        method: 'get',
        url: 'https://api.coinbase.com/v2/accounts/',
        headers: {
            'Authorization': `Bearer ${accesstoken}`
        }
    };

    try{
        const response = await axios(config)
        res.send({response: response.data})
    }
    catch(err){
        console.log(err.message)
    }
})


app.listen(4000, ()=>console.log("server connected"))