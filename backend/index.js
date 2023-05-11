const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const pug = require('pug');
const _ = require('lodash');
const path = require('path');

const {Donor} = require('./models/donor');
const { log } = require('console');
const {initializePayment, verifyPayment} = require('./config/paystack')(request);

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public/')));
app.set('view engine', pug);

app.get('/',(req, res) => {
    res.render('index.pug');
});

app.post('/paystack/pay', (req, res) => {
    const form = _.pick(req.body,[
        'amount',
        'email',
        'full_name',
        'regno',
        'phone',
        'course',
        'level'
    ]);
    form.metadata = {
        full_name : form.full_name,
        regno: form.regno,
        phone: form.phone,
        course: form.course,
        level: form.level
    }
    form.amount *= 100;
    form.subaccount = 'ACCT_o92krz6yfv87xjf';
    
    initializePayment(form, (error, body)=>{
        if(error){
            //handle errors
            console.log(error);
            return res.redirect('/error')
            return;
        }
        response = JSON.parse(body);
        res.redirect(response.data.authorization_url)
    });
});

app.get('/paystack/callback', (req,res) => {
    const ref = req.query.reference;
    verifyPayment(ref, (error,body)=>{
        if(error){
            //handle errors appropriately
            console.log(error)
            return res.redirect('/error');
        }
        response = JSON.parse(body);        

        const data = _.at(response.data, [
            'reference',
            'amount',
            'customer.email',
            'metadata.full_name',
            'metadata.regno',
            'metadata.phone',
            'metadata.course',
            'metadata.level'
        ]);

        [
            reference,
            amount,
            email,
            full_name,
            regno,
            phone,
            course,
            level
        ] =  data;
        
        newDonor = {
            reference,
            amount,
            email,
            full_name,
            regno,
            phone,
            course,
            level
        }

        const donor = new Donor(newDonor)

        donor.save().then((donor)=>{
            if(!donor){
                return res.redirect('/error');
            }
            res.redirect('/receipt/'+donor._id);
        }).catch((e)=>{
            res.redirect('/error');
        })
    })
});

app.get('/receipt/:id', (req, res)=>{
    const id = req.params.id;
    Donor.findById(id).then((donor)=>{
        if(!donor){
            res.redirect('/error')
        }
        res.render('success.pug',{donor});
    }).catch((e)=>{
        res.redirect('/error')
    })
})

app.post('/add', (req,res)=>{

})

app.get('/error', (req, res)=>{
    res.render('error.pug');
})


const donor = new Donor({
    full_name: "Almuhandis",
    email: "Almuhandis.com",
    amount: 200,
    reference: "dst5srsqfts",
    regno: "nas/ste/19/1023",
    level: "400",
    course: "software",
    phone: "0373663662"
})

donor.save((err,res) => {
    if(!err){
        console.log("Success")
    }else{
        console.log(err)
    }
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});
