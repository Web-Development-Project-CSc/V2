require("dotenv").config();
const Accounts = require('../models/accounts');
const qs = require('qs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const geturl = async (req,res) => {
const root = "https://accounts.google.com/o/oauth2/v2/auth"
const client_id = process.env.CLIENT_ID.toString();
const options = {
    response_type: "code",
    client_id: client_id,
    redirect_uri: "https://flavoured.store/google",
    access_type: "offline",
    prompt: "consent",
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ].join(" ")
    }
const qs =  new URLSearchParams(options).toString();
res.redirect(`${root}?${qs}`);
}

const gettoken = async (code)=>{
    const url = "https://oauth2.googleapis.com/token";
    const value = {
        code: code,
        client_id: process.env.CLIENT_ID.toString(),
        client_secret: process.env.CLIENT_SECRET.toString(),
        redirect_uri: "https://flavoured.store/google",
        grant_type: "authorization_code"
    }
    try{
        const res = await axios.post(url,qs.stringify(value),{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        return res.data
    }
    catch(err){
        console.log(err);
    }
}

const handler = async (req,res) => {
    const code = req.query.code.toString();
    try{
        const {id_token , access_token} = await gettoken(code);
        const googleUser = jwt.decode(id_token);
        const user = await Accounts.findOneAndUpdate({
            email: googleUser.email,
            name: googleUser.name,
            password: googleUser.sub,
            role: 'customer'
        },{
            email: googleUser.email,
            name: googleUser.name,
            password: googleUser.sub,
            role: 'customer'
        },{
            upsert: true,
            new: true
        });
        req.session.user = user;
        res.redirect('/user/myprofile');
    }
    catch(err){
        console.log(err);
        res.redirect('/user/login?message="Could not sign in with google"');
    }

}
module.exports = {geturl,handler};