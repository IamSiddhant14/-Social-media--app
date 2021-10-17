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
    jwt_secret: 'codeial'



}

const production = {
    name: 'production'
}


module.exports = devlopment