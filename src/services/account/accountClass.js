const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs')
const path = require('path')


const getRandomString =()=>{
    return crypto.randomBytes(8).toString('hex')
}

class AccountClass {
    constructor(access_token, version, url, env, environment){
        this.access_token = access_token
        this.version = version
        this.url = url
        this.env = env
        this.environment = environment
    }

    //get accesstoken
    getAccesstoken = function(){
        //get accesstoken from user or access.env file if on production environment
        if(this.env=="production" || this.env=="prod" || this.environment=="production" || this.environment=="prod"){
            const accesstoken = fs.existsSync(path.join(process.env.PWD, '/access.env')) ? fs.readFileSync(path.join(process.env.PWD, '/access.env'), 'utf8') : this.access_token;
            return accesstoken;
        }
        else{

            // get accesstoken from user
            return this.access_token;
        }
    }

    // set axios header
    options = function(){
        return {
            headers: {
                'Authorization': `Bearer ${this.getAccesstoken()}`,
                'CB-VERSION': this.version
            }
        }
    }
   
    // get all accounts
    getAccounts = async function({limit}){
        try{
            return await axios.get(`${this.url}/accounts/${limit ? `?limit=${limit}` : ''}`, this.options())
        }
        catch(err){
            throw err
        }
    }

    // get an account
    getAccount = async function({account_id}){
        try{
            if(!account_id) throw Error("account_id is missing!")
            return await axios.get(`${this.url}/accounts/${account_id}`, this.options())
        }
        catch(err){
            throw err
        }
    }

    // get an account
    getWalletAddresses = async function({account_id, limit}){
        try{
            if(!account_id) throw Error("account_id is missing!")
            return await axios.get(`${this.url}/accounts/${account_id}/addresses${limit ? `?limit=${limit}` : ''}`, this.options())
        }
        catch(err){
            throw err
        }
    }
    
    // get an account
    getSelectedWalletAddress = async function({account_id, address_id}){
        try{
            if(!account_id) throw Error("account_id is missing!")
            return await axios.get(`${this.url}/accounts/${account_id}/addresses/${address_id}`, this.options())
        }
        catch(err){
            throw err
        }
    }

    // get all transactions
    getTransactions = async function({account_id, limit}){
        try{
            if(!account_id) throw Error("account_id is missing!")
            return await axios.get(`${this.url}/accounts/${account_id}/transactions${limit ? `?limit=${limit}` : ''}`, this.options())
        }
        catch(err){
            throw err
        }
    }

    // get a transactions
    getTransaction = async function({account_id, transaction_id}){
        try{
            if(!account_id) throw Error("account_id is missing!")
            if(!transaction_id) throw Error("transaction_id is missing!")
            return await axios.get(`${this.url}/accounts/${account_id}/transactions/${transaction_id}`, this.options())
        }
        catch(err){
            throw err
        }
    }

    // transfer coins to user's other accounts
    // transfer = async function({account_id, receiving_account_id, amount, currency}){
    //     try{
    //         if(!account_id) throw Error("account_id is missing!")
    //         if(!receiving_account_id) throw Error("receiving_account_id is missing!");
    //         if(!amount) throw Error("amount is missing!");
    //         if(!currency) throw Error("currency is missing!");

    //         const data = {
    //             type: "transfer",
    //             to: receiving_account_id,
    //             amount,
    //             currency,
    //             idem: getRandomString()
    //         }
    //         return await axios.post(`${this.url}/accounts/${account_id}/transactions`, data, this.options())
    //     }
    //     catch(err){
    //         console.log(err.message)
    //     }
    // }

    // get an account
    send = async function({account_id, wallet_address, amount, currency, token}){
        try{
            if(!account_id) throw Error("account_id is missing!")
            if(!wallet_address) throw Error("wallet_address is missing!");
            if(!amount) throw Error("amount is missing!");
            if(!currency) throw Error("currency is missing!");

            const data = {
                type: "send",
                to: wallet_address,
                amount,
                currency,
                idem: getRandomString()
            }

            const option1 = {
                headers: {
                    'Authorization': `Bearer ${this.getAccesstoken()}`,
                    'CB-VERSION': this.version,
                }
            }

            const option2 = {
                headers: {
                    'Authorization': `Bearer ${this.getAccesstoken()}`,
                    'CB-VERSION': this.version,
                    'CB-2FA-TOKEN': token
                }
            }

            const option = token ? option2 : option1
            
            return await axios.post(`${this.url}/accounts/${account_id}/transactions`, data, option);
        }
        catch(err){
            throw err
        }
    }
}

module.exports = AccountClass


// 'https://www.coinbase.com/oauth/authorize?response_type=code&client_id=1532c63424622b6e9c4654e7f97ed40194a1547e114ca1c682f44283f39dfa49&redirect_uri=https%3A%2F%2Fexample.com%2Foauth%2Fcallback&state=134ef5504a94&scope=wallet:user:read,wallet:accounts:read'