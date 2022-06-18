* coinbase

** OAuth authentication


```
    const utils = {
        SECURE_RANDOM: ()=>crypto.randomBytes(8).toString('hex'),
        CLIENT_ID: 'dc43672f0ccf25577de3b408fc14ae131742009c04c2496664cf3ac9ad9cf5de',
        CLIENT_SECRET: '56f4f2c76a030033b5781eb816e84bb10a4d90b0d8217e87c08e86f3e734b0cc',
        REDIRECT_URL: 'http://localhost:8000/coinbase/api/callback',
        SCOPE: '"wallet:accounts:read wallet:transactions:request wallet:transactions:transfer wallet:transactions:read wallet:transactions:send"',
        CODE: '979d5f156d69da86fb4363d7754e04c16f8cb74bf62d98327032534eba618df6',
        REFRESH_TOKEN: '41ac625d21f07c5508a2266f95f694fdfe68c9a388187e8052c02d2fee73b7b9',
        ACCESS_TOKEN: '9346872d4e29b76f27dc68eeb23621e4313c7ffbe07d929a2724b609b91cf16e',
    }

    const link = `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=dc43672f0ccf25577de3b408fc14ae131742009c04c2496664cf3ac9ad9cf5de&redirect_uri=http://localhost:8000/coinbase/api/callback&state=ggdf63gd4i76xM&meta[send_limit_amount]=1&meta[send_limit_currency]=USD&meta[send_limit_period]=day&scope=wallet:accounts:read,wallet:transactions:request,wallet:transactions:transfer,wallet:transactions:read,wallet:transactions:send`



const url = `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${utils.CLIENT_ID}&redirect_uri=${utils.REDIRECT_URL}&state=${utils.SECURE_RANDOM()}M&scope=${utils.SCOPE}`
```


```
    const Coinbase = require('@mozeyinedu/coinbase');
    const coinbase = new Coinbase({accessToken})

    require('dotenv').config()
    const accessToken = process.env.ACCESSTOKEN;

    async function run(){
        try{
            // get current user (current user is the user whose accesstoken is used)
            const res1 = await coinbase.user.getCurrentUser();

            // get current user oauth
            //const res2 = await coinbase.user.getCurrentUserOauth();

            // get any user whose user_id is provided
            //const res3 = await coinbase.user.getSelectedUser({user_id: '9da7a204-544e-5fd1-9a12-61176c5d4cd8'});

            // get the oauth of any user whose user_id is provided
            //const res4 = await coinbase.user.getSelectedUserOauth({user_id: '9da7a204-544e-5fd1-9a12-61176c5d4cd8'});

            //get all accounts of the current user
            //const res5 = await coinbase.account.getAccounts();

            //get a selected account of the current uses
            //const res6 = await coinbase.account.getAccount({account_id: '824afca5-6497-5a7e-a3e7-8b8cec1d22fa'});

            // get all wallet addresses of a selected account
            //const res7 = await coinbase.account.getWalletAddresses({account_id: '824afca5-6497-5a7e-a3e7-8b8cec1d22fa'});

            // get the selected wallet addresse (using the address_id) of a selected account (note: a wallet can has more than one wallet addresses, hence this will you to select only the wallet address whose address_id is provided)
            //const res8 = await coinbase.account.getSelectedWalletAddresse({account_id: '824afca5-6497-5a7e-a3e7-8b8cec1d22fa', address_id: "e1332f73-a490-5440-9cce-6c0488ad926d"});

            // list all transactions
            //const res9 = await coinbase.account.getTransactions({account_id: '824afca5-6497-5a7e-a3e7-8b8cec1d22fa'});

            // list a transactions
            //const res10 = await coinbase.account.getTransaction({account_id: '824afca5-6497-5a7e-a3e7-8b8cec1d22fa', transaction_id: "e1332f73-a490-5440-9cce-6c0488ad926d"});

            //send coins to other wallet outside of coinbase
            // provide the account_id of this user (user sending the coins, the owner of the accesstoken)
            // provide the receiving's wallet address e.g {to:  EGHkndcugkgjkjj5fgfgR}
            // provide the amount in string e.g {amount: 0.1}
            // provide the currency of the account e.g {currency: BTC}
            // const res12 = await coinbase.account.send({account_id: '5f10e9e5-02a0-526a-a24a-7fa53a2b8fe1', address_id: "e1332f73-a490-5440-9cce-6c0488ad926d", amount: '0.1', currency: 'BTC'});

            console.log(res1)
        }
        catch(err){
            console.log(err.message);
        }
    }

    run()

```