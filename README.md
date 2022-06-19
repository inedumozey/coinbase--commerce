* coinbase

** OAuth authentication
const eth = '29bbe990-3775-5dbb-9585-b91d4f434e49

02e821b5f0751c0520ff4b1ab3115e811ca21ba0ffb2f888a129ee702fd8764b

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

    const link = `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=e78ae807bbfcdeeab7a3c10566bb5fb36388ca6149ea303dd3e6d9ea33cb012a&redirect_uri=http://localhost:4000/api/cb&state=ghjjjbte443tr&meta[send_limit_amount]=1&meta[send_limit_currency]=USD&meta[send_limit_period]=day&scope=wallet:accounts:read,wallet:transactions:request,wallet:transactions:transfer,wallet:transactions:read,wallet:transactions:send`

generate new access token and new refresh token with unexpired code
{
    "grant_type": "authorization_code",
    "client_id": "942023ff44c8f25416655f01b88ce8f2cd5b64b1c42508a0f194b039c3406a3e",
    "client_secret": "da5b41a0bdd65cd45566be3d75bf7857e5bae8a70da997d427b235b6d3eb8319",
    "code": "c2896fc0552e0adf80c17a0514b2a4f682604b7c3aeb24e28602b773fb0d2ede",
    "redirect_uri": "http://localhost:4000/api/coinbase/cb"
}

generate new access token with unexpired refresh token
{
    "grant_type": "refresh_token",
    "client_id": "942023ff44c8f25416655f01b88ce8f2cd5b64b1c42508a0f194b039c3406a3e",
    "client_secret": "da5b41a0bdd65cd45566be3d75bf7857e5bae8a70da997d427b235b6d3eb8319",
    "refresh_token": "55ae7eb8039e4c4e5d82083b290f813651ec7c43a2284474027c451fe9dd2eff"
}

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


* Send coin

```
    const Coinbase = require('./src/index');

const coinbase = new Coinbase({
    env: 'dev',
    client_id: '942023ff44c8f25416655f01b88ce8f2cd5b64b1c42508a0f194b039c3406a3e',
    client_secret: 'da5b41a0bdd65cd45566be3d75bf7857e5bae8a70da997d427b235b6d3eb8319',
    access_token: '556c239b4ec9e07a4d8fbd2c1ae2747be4399b96f187b8b29bc7c1dea69d4dba',
    refresh_token: '',
})


async function sendCoin({wallet_address, amount, currency, token}){
    try{
        await coinbase.init()
    
        const res = await coinbase.account.getAccounts({limit: 10})
        res.data.data.map(async data=>{
            try{
                
                if(data.name.includes(currency)){
                    console.log(data.balance)
                    const ltc = await coinbase.account.send({account_id: data.id, wallet_address, amount, currency, token})
    
                    //send notifications
                    const notif = await coinbase.account.getTransaction({account_id: data.id});
                    
                    const response =  {
                        send: sendRes,
                        notification: notif
                    }

                    console.log(response)
                }
            }
            catch(err){
                if(err.response){
                    console.log(err.response.data)
                }else{
                    console.log(err.message)
                }
            }
        })

       

    }
    catch(err){
        if(err.response){
            console.log(err.response.data)
        }else{
            console.log(err.message)
        }
    }

}

sendCoin({
    wallet_address: 'MEM129jAv4ffNo4pKyccNhiY92VPAJPLGT',
    amount: '0.00025',
    currency: 'LTC',
    token: '6489122'
})
```