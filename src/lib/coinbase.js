const axios = require("axios");
const UserClass = require('../services/user/userClass');
const AccountClass = require('../services/account/accountClass')
const url = "https://api.coinbase.com/v2";
const fs = require('fs')
const path = require('path')

class Coinbase {
  constructor({access_token, refresh_token, client_secret, client_id, version="2022-06-10", env, environment}){
    this.user = access_token && client_secret &&client_id ? new UserClass(access_token, version, url, env, environment) : ''
    
    this.account = access_token && client_secret &&client_id ? new AccountClass(access_token, version, url, env, environment) : ''   
    
    this.version = version,
    this.client_id = client_id,
    this.client_secret = client_secret
    this.refresh_token = refresh_token
    this.access_token = access_token
    this.env = env
    this.environment = environment
  }

  // get the refresh token and save it to file system (ref.env)
  generateTokens = async function(refreshtoken){
    const data = {
        grant_type: "refresh_token",
        client_id: this.client_id,
        client_secret: this.client_secret,
        refresh_token: refreshtoken,
    };
    try{
        const res = await axios.post('https://api.coinbase.com/oauth/token', data);

        //save the refreshToken in file system (create temp file in the root directory and write the refreshToken to it)
        fs.writeFileSync(path.join(process.env.PWD, '/refresh.env'), res.data.refresh_token)
        fs.writeFileSync(path.join(process.env.PWD, '/access.env'), res.data.access_token)
        return res.data.access_token
    }
    catch(err){
        throw err
    }
  }

  init = async function(){
    
    try{
       // these should only be provided either on production or development environment
      if(!this.access_token) throw Error('access_token is not defined');
      if(!this.client_id) throw Error('client_id is not defined');
      if(!this.client_secret) throw Error('client_secret is not defined');

      // resfreshtoken should only be provided on production environment
      if(this.env=="production" || this.env=="prod" || this.environment=="production" || this.environment=="prod"){
        if(!this.refresh_token) throw Error('refresh_token is not defined');
        
      }

      // only read and create access.env and refresh.env files on production environemtn
      if(this.env=="production" || this.env=="prod" || this.environment=="production" || this.environment=="prod"){
        const refreshtoken = await fs.existsSync(path.join(process.env.PWD, '/refresh.env')) ? await fs.readFileSync(path.join(process.env.PWD, '/refresh.env'), 'utf8') : this.refresh_token;

        await this.generateTokens(refreshtoken)
      }
     
    }
    catch(err){
      throw err
    } 
  }

  exchangeRate = async function({currency}){
    if(!currency) throw Error('currency is undefined');

    try{
      const res = await axios.get(`https://api.coinbase.com/v2/exchange-rates?currency=${currency}`);
      return res
    }
    catch(err){
      throw err 
    }
  }
}

module.exports = Coinbase;