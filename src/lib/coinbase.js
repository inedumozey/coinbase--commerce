const axios = require("axios");
const UserClass = require('../services/user/userClass');
const AccountClass = require('../services/account/accountClass')
const url = "https://api.coinbase.com/v2"

class Coinbase {
  constructor({accessToken, version="2022-06-10"}){
    this.user = new UserClass(accessToken, version, url)
    this.account = new AccountClass(accessToken, version, url)
  }
}

module.exports = Coinbase;