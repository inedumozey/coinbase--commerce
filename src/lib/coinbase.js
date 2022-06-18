const axios = require("axios");
const UserClass = require('../services/user/userClass');
const AccountClass = require('../services/account/accountClass')
const url = "https://api.coinbase.com/v2";
const fs = require('fs')
const path = require('path')

class Coinbase {
  constructor({access_token, refresh_token, client_secret, client_id, version="2022-06-10"}){
    this.user = (refresh_token && access_token && client_secret && client_id) ? new UserClass(access_token, version, url) : ''
    this.account = (refresh_token && access_token && client_secret && client_id) ? new AccountClass(access_token, version, url) : ''

    this.client_id = client_id,
    this.client_secret = client_secret
    this.refresh_token = refresh_token
    this.access_token = access_token
  }

  // get the refresh token and save it to file system (ref.env)
  generateTokens = async function(refreshtoken){
    const data = {
        grant_type: "refresh_token",
        client_id: "dc43672f0ccf25577de3b408fc14ae131742009c04c2496664cf3ac9ad9cf5de",
        client_secret: "56f4f2c76a030033b5781eb816e84bb10a4d90b0d8217e87c08e86f3e734b0cc",
        refresh_token: refreshtoken,
    };
    
    try{
        const res = await axios.post('https://api.coinbase.com/oauth/token', data);
        //save the refreshToken in file system (create temp file in the root directory and write the refreshToken to it)
        fs.writeFileSync(path.join(__dirname, '/refresh.env'), res.data.refresh_token)
        fs.writeFileSync(path.join(__dirname, '/access.env'), res.data.access_token)
        return res.data.access_token
    }
    catch(err){
        throw err
    }
  }

  setTokens= async function(){
    
    try{
      if(!this.access_token) throw Error('access_token is not defined');
      if(!this.refresh_token) throw Error('refresh_token is not defined');
      if(!this.client_id) throw Error('client_id is not defined');
      if(!this.client_secret) throw Error('client_secret is not defined');

      const refreshtoken = await fs.existsSync(path.join(__dirname, '/refresh.env')) ? await fs.readFileSync(path.join(__dirname, '/refresh.env'), 'utf8') : this.refresh_token;

      await this.generateTokens(refreshtoken);
     
    }
    catch(err){
      throw err
    } 
  }
}

module.exports = Coinbase;