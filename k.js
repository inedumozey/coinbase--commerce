const Coinbase = require('./src/index');

const coinbase = new Coinbase({
    "grant_type": "refresh_token",
    "client_id": "dc43672f0ccf25577de3b408fc14ae131742009c04c2496664cf3ac9ad9cf5de",
    "client_secret": "56f4f2c76a030033b5781eb816e84bb10a4d90b0d8217e87c08e86f3e734b0cc",
    "refresh_token": "ab165326647d6b1d9faf359243200dc967db7b70e7b8d8adcdccf81d035cff11"
})

async function g(){
    try{
        await coinbase.setTokens()
    }
    catch(err){
        console.log(err)
    }
}
g()