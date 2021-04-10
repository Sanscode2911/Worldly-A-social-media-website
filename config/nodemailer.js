const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    auth : {
        user : 'sanscode2911',
        pass : 'Rising29@'
    }
});


let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers' ,relativePath),
        data,
        function(err,template){
            if(err){console.log("ERROR IN RENDERING TEMPLATE",err);return}

            mailHTML = template;
        }
    )
    return mailHTML;
}



module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}