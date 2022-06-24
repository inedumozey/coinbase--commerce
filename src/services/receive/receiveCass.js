const axios = require('axios');
const path = require('path')
const fs = require('fs');
const url = 'https://api.commerce.coinbase.com'

class ReceiveClass {
    constructor(api_key, e_version){
        this.api_key = api_key
        this.e_version = e_version
    }

    //validate
    validate = function(){
        if(!this.api_key) throw Error('api_key is undefined!')
    }

    // set axios header
    options = function(){
        return {
            headers: {
                "Content-Type": "application/json",
                "X-CC-Api-Key": this.api_key,
                "X-CC-Version": this.e_version,
            }
        }
    }

    // create charge
    createCharge = async function(){
        try{
            this.validate()
            const data = {
                name: "The Human Fund",
                description: "Money For People",
                pricing_type: "no_price"
              }
            return await axios.post(`${url}/charges`, data, this.options())
        }
        catch(err){
            throw err
        }
    }

    // receive payment
    receivePayment = async function(){
        try{
            this.validate()
            const data = {

            }
            return await axios.post(`${url}/charges`, data, this.options())
        }
        catch(err){
            throw err
        }
    }
}

module.exports = ReceiveClass