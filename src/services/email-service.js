const TicketRepository = require('../repository/ticket-repository');
const sender = require('../config/emailConfig');

const repo = new TicketRepository();

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

const fetchPendingEmails = async (timestamp) => {
    try {
        //const repo = new TicketRepository();
        const repsonse = await repo.get({status: "PENDING"}) ;
        return repsonse
    } catch (error) {
        console.log(error)
    }
}

const updateTicket = async (ticketId, data) =>{
    try {
        const response = await repo.update(ticketId,data);
        return response;
    } catch (error) {
        console.log(error)
    }
}

const createNotification = async (data) => {
    try {
        const response = await repo.create(data);
        //console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket
}

/**
 * If we set up our SMTP server as:
 * SMTP(sender) => a@b.com
 * reciever-> d@e.com
 * 
 * from: support@noti.com  //reciever will see from tag as this if we configure the SMTP(sender) as 'from'
 */