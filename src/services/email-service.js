const { clearParserCache } = require('mysql2');
const sender = require('../config/emailConfig');

const sendBasicEmail = async (mailFrom,mailTo,mailSubject,mailBody) => {
    try{
        const response = await sender.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        });
        console.log(response)
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    sendBasicEmail
}

/**
 * If we set up our SMTP server as:
 * SMTP(sender) => a@b.com
 * reciever-> d@e.com
 * 
 * from: support@noti.com  //reciever will see from tag as this if we configure the SMTP(sender) as 'from'
 */