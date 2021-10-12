 //This worker will be sending email to us
 const queue = require('../config/kue');
 const commentsMailer = require('../mailers/comments_mailer');
 //Every worker has an process function ,which is runned whenever a new task is been added into the queue

                //name of queue   //what it needs to do + comment/data
 queue.process('emails',function(job,done){         //Here this will be the comment
     console.log('emails worker is processing  job',job.data)
     //The below line was been put into the queue
     commentsMailer.newComment(job.data);

     done();
 });

  