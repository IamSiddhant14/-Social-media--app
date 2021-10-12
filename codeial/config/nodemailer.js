const nodemailer = require ('nodemailer');
const ejs = require('ejs');
const path = require('path');
//This defines the config using which we are gone send emails
let transporter = nodemailer.createTransport({
    service: 'gmail',
    //This smtp is providin us the service to send email to our required user,therfore its the gmail mailing server
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    //stablishing the identity from where the email will be coming ,this is to trcak your activity my gmail
    auth: {
        user: 'codeialdevlopers@gmail.com',
        pass:'123abc@@'
    }

}) ;
//This defines the file which is gone be sent in the mail which is defined in the repective position
                            //Path from where this function is called
let renderTemplate = (data, relativePath) =>{
    // all the html which is going to be sent in that mail
    let mailHtml;
    ejs.renderFile(
         path.join(__dirname,'../views/mailers',relativePath),
         data,        //template is composition of path and data
         function(err,template){
             if(err){
                 console.log('error in rendering template');
                 return;
                }

                 mailHtml = template;
             
         }
    )

    return mailHtml ;

}


module.exports ={
    transporter : transporter,
    renderTemplate : renderTemplate
}