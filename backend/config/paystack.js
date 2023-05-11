const paystack = (request) => {
    const MySecretKey = 'Bearer sk_live_f169be3d3e2a074033cb34c6c9c92a1f64b0117d';
    // const splitPayment = ACCT_w4xt8qwtfy17psx;
    const initializePayment = (form, mycallback) => {
        const options = {
            url : 'https://paystack.com/pay/mssn-auk',
            headers : {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'    
            },
            form,
            'subaccount' : 'ACCT_3org68z257h2yhu',
            'transaction_charge': 15000
        }
        const callback = (error, response, body) => {
            return mycallback(error, body)
        }
        request.post(options, callback)
    }

    const verifyPayment = (ref, mycallback) => {
        const options = {
            url : 'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref),
            headers : {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'    
            }
        }
        const callback = (error, response, body) => {
            return mycallback(error, body)
        }
        request(options, callback)
    }

    return {initializePayment, verifyPayment};
}

module.exports = paystack;

// const paystack = (request) => {
//     const MySecretKey = 'Bearer sk_live_f169be3d3e2a074033cb34c6c9c92a1f64b0117d';
//     // const splitPayment = ACCT_w4xt8qwtfy17psx;
//     const initializePayment = (form, mycallback) => {
//         const options = {
//             url : 'https://api.paystack.co/transaction/initialize',
//             headers : {
//                 authorization: MySecretKey,
//                 'content-type': 'application/json',
//                 'cache-control': 'no-cache'    
//             },
//             form,
//             'subaccount' : 'ACCT_3org68z257h2yhu',
//             'transaction_charge': 15000
//         }
//         const callback = (error, response, body) => {
//             return mycallback(error, body)
//         }
//         request.post(options, callback)
//     }

//     const verifyPayment = (ref, mycallback) => {
//         const options = {
//             url : 'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref),
//             headers : {
//                 authorization: MySecretKey,
//                 'content-type': 'application/json',
//                 'cache-control': 'no-cache'    
//             }
//         }
//         const callback = (error, response, body) => {
//             return mycallback(error, body)
//         }
//         request(options, callback)
//     }

//     return {initializePayment, verifyPayment};
// }

// module.exports = paystack;