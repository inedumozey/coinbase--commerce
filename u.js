const Coinbase = require('./src/index');
require('dotenv').config()

const coinbase = new Coinbase({
    access_token: '1e1c95d06200c9a9ced4695ac3e4d4e7c484c19cd7bcccd8d514358b215aa4a3',
    refresh_token: '2475d521bc0cda7562975ef34c71983ef7dac236dc6114b2d3f2f1939c82d020',
    client_secret: '56f4f2c76a030033b5781eb816e84bb10a4d90b0d8217e87c08e86f3e734b0cc',
    client_id: 'dc43672f0ccf25577de3b408fc14ae131742009c04c2496664cf3ac9ad9cf5de',
})


async function run(){
    try{
        await coinbase.setTokens()
        // const res1 = await coinbase.user.getCurrentUser()
        const res = await coinbase.account.getAccount({account_id: '9532b23d-83e5-5e16-8833-fdc6f434d1ef'})
        // for(let data of res.data.data){
        //     if(data.balance.currency === 'LTC'){
        //         console.log(data)
        //     }
        // }
        console.log(res.data)
    }
    catch(err){
        console.log(err)
    }

}

run()