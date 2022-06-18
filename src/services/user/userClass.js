const axios = require('axios');
const path = require('path')
const fs = require('fs')

class UserClass {
    constructor(access_token, version, url){
        this.access_token = access_token
        this.version = version
        this.url = url
    }

    //get accesstoken
    getAccesstoken = function(){
        //get accesstoken
        const accesstoken = fs.existsSync(path.join(process.env.PWD, 'src/lib/access.env')) ? fs.readFileSync(path.join(process.env.PWD, 'src/lib/access.env'), 'utf8') : this.access_token;
        return accesstoken;
    }

    options = function(){
        return {
            headers: {
                'Authorization': `Bearer ${this.getAccesstoken()}`,
                'CB-VERSION': this.version
            }
        }
    }

    // view users
    getCurrentUser = async function(){
        try{
            return await axios.get(`${this.url}/user`, this.options())
        }
        catch(err){
            throw err
        }
    }

    // view users oauth
    getCurrentUserOauth = async function(){
        try{
            return await axios.get(`${this.url}/user/auth`, this.options())
        }
        catch(err){
            throw err
        }
    }

    // get selected user
    getSelectedUser = async function({user_id}){
        try{
            if(!user_id) throw Error("user_id is missing!")
            return await axios.get(`${this.url}/users/${user_id}`, this.options)
        }
        catch(err){
            throw err
        }
    }

    // get selected user
    getSelectedUserOauth = async function({user_id}){
        try{
            if(!user_id) throw Error("user_id is missing!")
            return await axios.get(`${this.url}/users/auth/${user_id}`, this.options)
        }
        catch(err){
            throw err
        }
    }
}

module.exports = UserClass