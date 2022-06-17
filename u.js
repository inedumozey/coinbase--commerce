const Coinbase = require('./src/index');
require('dotenv').config()

const coinbase = new Coinbase({
    access_token: '6c326c67d51b599e6cd0308f8748b8ce59e8d8bd51fdf4396fb06c683b36f21e',
    refresh_token: '304a87bb930666b54c69b26864abe254095a2d62f3e8f3567f1c5fa72b7d9c05',
    client_secret: '56f4f2c76a030033b5781eb816e84bb10a4d90b0d8217e87c08e86f3e734b0cc',
    client_id: 'dc43672f0ccf25577de3b408fc14ae131742009c04c2496664cf3ac9ad9cf5de',
})


async function run(){
    try{
        const res = await coinbase.setTokens()
        console.log(res)
    }
    catch(err){
        console.log(err)
    }

}

run()