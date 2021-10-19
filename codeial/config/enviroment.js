//Defining the settings for morgan
//since we will be writing to the file system
const fs = require('fs');
//we would also require rotating file system so as to put thr over size file data into another file
const rfs = require('rotating-file-stream');
const path = require('path');
//where the log will be stored
const logDirectory = path.join(__dirname, '../production_logs');
//finding whether production log already exist or should it be created
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

                                          //filename
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});



//This will tell use the user agent from ehich the request is coming

const devlopment = {
    name: 'devlopment',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        //This smtp is providin us the service to send email to our required user,therfore its the gmail mailing server
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        //stablishing the identity from where the email will be coming ,this is to trcak your activity my gmail
        auth: {
            user: 'codeialdevlopers@gmail.com',
            pass: '123abc@@'
        }

    },
    google_client_id: '1039705527746-fn7vt4vis3kip4990ldj5j5dq2052v0f.apps.googleusercontent.com',
    google_client_secret: 'ow-s0Ska-sAtrTvUheoQ8P4M',
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev', // stream of logs
        options: { stream: accessLogStream }
    }

}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        //This smtp is providin us the service to send email to our required user,therfore its the gmail mailing server
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        //stablishing the identity from where the email will be coming ,this is to trcak your activity my gmail
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }

    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    }
}

//The correct path will be exported accordingly
//If not defined then devlopment or else what ever it is defined

module.exports = eval(process.env.CODEIAL_ENVIROMENT) == undefined ? devlopment : eval(process.env.CODEIAL_ENVIROMENT);