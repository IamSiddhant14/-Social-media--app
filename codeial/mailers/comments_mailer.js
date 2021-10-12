const nodeMailer = require("../config/nodemailer");

//This is another way of exporting

exports.newComment= (comment) =>{
    console.log('inside newComment mailer')

    let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs')
    nodeMailer.transporter.sendMail({

        from: 'codeialdevlopers@gmail.com',
        //Sending the mail to the person who have commented
        to: comment.user.email,
        subject: "New Comment published",
        html: htmlString

    },(err,info)=>{
       if(err){
           console.log('Error in sending mail',err);
           return;
       }
       console.log('Message sent ',info);
       return
    });
 
}

