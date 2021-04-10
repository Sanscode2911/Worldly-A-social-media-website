const nodeMailer = require ('../config/nodemailer');

//This is another way of exporting method
exports.newComment = (Comment) => {
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({
        from : 'sanscode2911@gmail.com',
        to : comment.user.email,
        subject : 'New Comment Posted!',
        html : htmlString
    },(err,info)=>{
        if(err){
            console.log("Error in sending mail",err);
            return;
        }
        // console.log("Message Sent",info);
        return;
    });
}