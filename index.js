const express = require('express'),
    app = express(),
    port = 3000,
    logger = require('./logger')
   // bluebird = require('bluebird');


let employeeMap = new Map();
   

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/',(req,res) => {
    return res.status(200).send({message:'Welcome to employee management'});
})


app.post('/employee',(req,res) => {
   // return bluebird.try(function () {
        const {firstName, lastName, age, sex, phone} = req.body;

        if (!firstName || !lastName || !age || !sex || !phone) {
            return res.status(400).send({message:'Bad request'});
        }

        const employeeRecord = employeeMap.get(phone)

        if (employeeRecord) {
            return res.status(200).send('A record with the phone Number already exists.please try to update it')
        }

        employeeMap.set(phone, req.body)

        return res.status(200).send({message: 'A new record successfully created', details: employeeMap.get(phone)});
   // })
})


app.get('/employee/:property',(req,res) => {
   // return bluebird.try(function () {
        const {property} = req.params,
            {value} = req.query;

        if (!property || !value) {
            return res.status(400).send('Bad request');
        }

        if (property.toLowerCase() === 'phone') {
            const record = employeeMap.get(value);
            if (record) {
                return res.status(200).send({message: 'A record is successfully retrieved', details: record})
            } else {
                return res.status(200).send({message: 'No record is present'})
            }
        }

        const employees = [...employeeMap.values()];

        const filteredEmployee = employees.filter(item => {
            return item[property] === value;
        })

        if (filteredEmployee.length) {
            return res.status(200).send({message: 'A record is successfully retrieved', details: filteredEmployee[0]})
        } else {
            return res.status(200).send({message: 'No record is present'})
        }
   // })
    
})




const server = app.listen(port,() => {
    logger.debug(`server has started on ${port}`);
})

module.exports = {
    app,
    server
};