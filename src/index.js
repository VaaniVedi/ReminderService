const express = require('express')
const bodyParser = require('body-parser')
const cron= require("node-cron");
const {PORT} = require('./config/serverConfig')

const {createChannel} = require('./utils/messageQueue')

const {sendBasicEmail} = require('./services/email-service')
const TicketController = require('./controller/ticket-controller')

const jobs = require('./utils/job')

const setupAndStartServer =async ()=>{
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))

    //const channel = await createChannel()

    app.post('/api/v1/tickets',TicketController.create)

    app.listen(PORT, ()=>{
        console.log(`Server started at port ${PORT}`);
        jobs();
        
        sendBasicEmail(
            'support@admin.com',
            'workwithvanichaturvedi@gmail.com',
            'This is a testing email',
            'Hey, how are you , I hope you like the support'
        )
    });
}

setupAndStartServer();