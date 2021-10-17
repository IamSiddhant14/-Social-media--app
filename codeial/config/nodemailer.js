const nodemailer = require ('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./enviroment');

//This defines the config using which we are gone send emails
let transporter = nodemailer.createTransport(env.smtp) ;
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