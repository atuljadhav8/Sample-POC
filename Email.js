'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');
let AWS = require('aws-sdk');
let s3 = new AWS.S3({ region: 'eu-west-1' })

class Email {
    async main() {
        console.log('Host: ', process.env.SMTPHost);
        let transporter = nodemailer.createTransport({
            host: process.env.SMTPHost || 'gb-pb-smtp-v01.emea.travelex.net',
            port: process.env.SMTPPort || 25,
            secure: false
        });
        const config = {
            Bucket: 'tvx-middleware-dev/interfaces/schemas/cnr/fcp',
            Key: 'ABC.xlsx'
        };
        let mailDetails = {
            from: 'atul.jadhav@travelex.com', // sender address
            to: 'atul.jadhav@travelex.com', // list of receivers
            subject: 'Test Email', // Subject line
            text: 'Hello', // plain text body
            attachments:
                {   
                    filename: config.Key,
                    content: Buffer.from(await this.getFile(config), 'base64')
                }
        };
        let info = await transporter.sendMail(mailDetails);
        console.log(JSON.stringify(info));
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    async getFile(config) {
        return new Promise((resolve, reject) => {
            try {
                s3.getObject(config, (err, data) => {
                    if (err) {
                        console.log(err);
                        reject(err)
                    }
                    else {
                        console.log("File Data: ", data);
                        resolve(data.Body);
                    }
                })
            } catch (err) {
                reject(err);
            }
        })
    }
}
new Email().main();
module.exports = Email;