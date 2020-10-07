var MailListener = require("mail-listener5").MailListener;
const fs = require('fs');
let attachments = [];

var mailListener = new MailListener({
  username: "maillistenertesting@gmail.com",
  password: "testing@123",
  host: "imap.gmail.com",
  port: 993, // imap port
  tls: true,
  connTimeout: 5000, // Default by node-imap
  authTimeout: 5000, // Default by node-imap,
  debug: console.log, // Or your custom function with only one incoming argument. Default: null
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  searchFilter: [["FROM", 'atuljadhav881989@gmail.com'], ['SINCE', 'Aug 24, 2020']], // the search filter being used after an IDLE notification has been retrieved
  markSeen: true, // all fetched email will be marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  attachments: true, // download attachments as they are encountered to the project directory
  attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
});

async function execute() {
  return new Promise(async (resolve, reject) => {
    mailListener.start();

    mailListener.on("server:connected", function () {
      console.log("imapConnected");
    });

    mailListener.on("mailbox", function (mailbox) {
      console.log("Total number of mails: ", mailbox.messages.total);
    });

    mailListener.on("server:disconnected", function () {
      console.log("imapDisconnected");
    });

    mailListener.on("error", function (err) {
      console.log(err);
    });

    mailListener.on("headers", function (headers, seqno) {
      console.log(`Email#${seqno} headers: `, headers);
    });

    mailListener.on("body", function (body, seqno) {
      console.log(`Email#${seqno} body: `, body);
    })

    mailListener.on("attachment", function (attachment, path, seqno) {
      console.log(`Email#${seqno} Attachment stored at: `, path);
    });

    let testvalue = await waitFormail(mailListener);

    console.log(`tsererererererereeeer: ${testvalue}`);
  })

}


async function waitFormail(mailListener) {
  return await new Promise((resolve, reject) => {
    mailListener.on("mail", function (mail, seqno) {
      console.log(`Email#${seqno} - entire parsed object: `, mail);
      resolve(mail)
    });

    reject(null)
  })
}

function storeAttachments(attachment) {
  attachments = [...attachments, ...attachment]
  // return attachment;
  return true;
}

execute().then(result => console.log(result)).then(() => console.log)

// it's possible to access imap object from node-imap library for performing additional actions. E.x.
// mailListener.imap.move(:msguids, :mailboxes, function(){})