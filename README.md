* coinbase

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