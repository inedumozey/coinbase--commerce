const cors = require('cors');
const express = require('express');
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

// parse rawBody on req object
app.use(express.json({
    verify: (req, res, buf)=>{
        req.rawBody = buf
    }
}))

// create charge
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
    }
    catch(err){
        if(err.response){
            res.send(JSON.stringify(err.response.data))
        }else{
            res.send(JSON.stringify(err))
        }
    }
})

// completed charge redirects here
app.get('/chargeCompleted', (req, res)=>{
    res.send('charge completed')
})

// canceled charge redirects here
app.get('/chargeCanceled', (req, res)=>{
    res.send('charge canceled')
})

// handle webhook
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

// listen the server

app.listen(5000, ()=>{
    console.log('server running in port 5000')
})
