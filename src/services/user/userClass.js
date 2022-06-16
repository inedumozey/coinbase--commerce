const axios = require('axios')

class UserClass {
    constructor(accessToken, version, url){
        this.accessToken = accessToken
        this.version = version
        this.url = url
    }

    options = function(){
        return {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
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