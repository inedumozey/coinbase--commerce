const cors = require('cors');
const ejs = require('ejs');
const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
require('dotenv').config();
const { Client, resources, Webhook } = require('coinbase-commerce-node');

const API_KEY = process.env.CB_API_KEY
const WEBHOOK_SECRET = process.env.CC_WEBHOCK_SECRET
const DOMAIN = process.env.CC_DOMAIN

Client.init(API_KEY);
const {Charge} = resources;

app.use(morgan('dev'))
app.use(cors())
app.set('view engine', 'ejs');
app.use(express.json({
    verify: (req, res, buf)=>{
        req.rawBody = buf
    }
}))


app.get('/home', async (req, res)=>{
    try{
        res.send('home')
    }
    catch(err){
        if(err.response){
            res.send(JSON.stringify(err.response.data))
        }else{
            res.send(JSON.stringify(err))
        }
    }
})

app.get('/create-charge', async (req, res)=>{
    try{
        const chargeData = {
            name: "Smart Investment",
           description: "Trade with DrMo",
           local_price: {
             amount: "0.1",
             currency: "USD"
           },
           pricing_type: "fixed_price",
           metadata: {
             customer_id: "hxg54r4_id",
             customer_name: "John Doe"
           },
           redirect_url: `${DOMAIN}/chargeCompleted`,
           cancel_url: `${DOMAIN}/chargeCanceled`
        }
        const charge = await Charge.create(chargeData)
        res.send(charge)
    
        // res.render('index', {data: {name: 'moses'}})
    }
    catch(err){
        if(err.response){
            res.send(JSON.stringify(err.response.data))
        }else{
            res.send(JSON.stringify(err))
        }
    }
})

app.get('/chargeCompleted', (req, res)=>{
    res.send('charge completed')
})

app.get('/chargeCanceled', (req, res)=>{
    res.send('charge canceled')
})

app.post('/payment-handler', (req, res)=>{
    try{

        const rawBody = req.rawBody;
        const signature = req.headers['x-cc-webhook-signature'];
        const webhookSecret = WEBHOOK_SECRET
        const event = Webhook.verifyEventBody(rawBody, signature, webhookSecret);

        if(event.type === 'charge:created') {
            console.log({
                id: event.data.id,
                customer_id: event.data.metadata.customer_id,
                code: event.data.code,
                created_at: event.data.created_at,
                amount: event.data.pricing.local.amount,
                currency: event.data.pricing.local.currency,
                status: 'charge created'

            })
        }
        if(event.type === 'charge:pending') {
            console.log({
                id: event.data.id,
                customer_id: event.data.metadata.customer_id,
                code: event.data.code,
                created_at: event.data.created_at,
                amount: event.data.pricing.local.amount,
                currency: event.data.pricing.local.currency,
                status: 'charge pending'
    
            })
        }
        if(event.type === 'charge:confirmed') {
            console.log({
                id: event.data.id,
                customer_id: event.data.metadata.customer_id,
                code: event.data.code,
                created_at: event.data.created_at,
                amount: event.data.pricing.local.amount,
                currency: event.data.pricing.local.currency,
                status: 'charge confirmed'

            })
        }
        if(event.type === 'charge:failed') {
            console.log({
                id: event.data.id,
                customer_id: event.data.metadata.customer_id,
                code: event.data.code,
                created_at: event.data.created_at,
                amount: event.data.pricing.local.amount,
                currency: event.data.pricing.local.currency,
                status: 'charge failed'

            })
        }

    }
    catch(err){
        console.log(err)
    }
})

// PNVTXWEW
// DPVLZT7X
// AYR483AA
// 9WVPWWFV

app.listen(5000, ()=>{
    console.log('server conn at 5000')
})
