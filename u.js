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