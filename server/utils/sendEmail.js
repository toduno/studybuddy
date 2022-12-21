const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


module.exports = async(email, subject, link) => {
    try {
        const createTransporter = async () => {
            const oauth2Client = new OAuth2(
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
                "https://developers.google.com/oauthplayground"
                );
            
                oauth2Client.setCredentials({
                refresh_token: process.env.REFRESH_TOKEN
            });
        
            const accessToken = await new Promise((resolve, reject) => {
                oauth2Client.getAccessToken((err, token) => {
                    try {
                        resolve(token);

                    } catch (error) {
                        reject("Failed to create access token :(");
                    }  
                });
            });
        
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: process.env.EMAIL,
                    accessToken,
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN
                }
            });
        
            return transporter;
        };
        
        
        const sendEmail = async (emailOptions) => {
            let emailTransporter = await createTransporter();
            await emailTransporter.sendMail(emailOptions);
        };
        
        sendEmail({
            subject: subject,
            text: link,
            to: email,
            from: process.env.EMAIL
        });

        console.log('Email sent successfully!')

    } catch (error) {
        console.log(error, "Email not sent")
    }
}





