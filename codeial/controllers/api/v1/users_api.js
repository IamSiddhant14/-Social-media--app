//This file is responsible for genrating the json webtoken
//We are sending the data to this file with the help postman


const User = require('../../../models/user');
//Libary reqiured for creating Jsonwebtoken
const jwt = require('jsonwebtoken');
const env= require('../../../config/enviroment');

module.exports.createSession = async function(req,res){

    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422,{
                message : "Invalid username or password"
            })
        }

        return res.json(200,{
            message :"sign in successfull here is your token,please keep it safe",
            data:{          //converting the user to json
                            // This is the part which gets encrpted
                            //we are genrating the jwt
                 token: jwt.sign(user.toJSON(),env.jwt_secret, {expiresIn :'100000'} )
            }
        })
    }catch(err){
        return res.json(500,{
            message: "Internal Server Error"
        })
    }

}


 





