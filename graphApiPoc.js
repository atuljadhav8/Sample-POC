const APP_ID = 'e17f5078-1ad6-40e5-b298-b563c9fb2362';
const APP_SECERET = 'q-4~gR7f1_71udu.EH23-vtZl3gMBbN~7Z';
const TOKEN_ENDPOINT ='https://login.microsoftonline.com/0cc98c56-35f3-4b1f-bef1-73cd49c3260f/oauth2/v2.0/token';
const MS_GRAPH_SCOPE = 'https://graph.microsoft.com/.default';

const axios = require('axios');
const qs = require('qs');
const request = require("request");

const postData = {
  client_id: APP_ID,
  scope: MS_GRAPH_SCOPE,
  client_secret: APP_SECERET,
  grant_type: 'client_credentials'
};

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

let token = '';

axios
  .post(TOKEN_ENDPOINT, qs.stringify(postData))
  .then(response => {
     console.log('log 1') 
    console.log(response.data.access_token);
    testGraphAPI(response.data.access_token);
  })
  .catch(error => {
    console.log('error')  
    console.log(error);
  });

  function testGraphAPI(accessToken) {
    request.get({
        url:"https://graph.windows.net/0cc98c56-35f3-4b1f-bef1-73cd49c3260f/users?api-version=2.0",
        headers: {
          "Authorization": accessToken
        }
    }, function(err, response, body) {
        console.log(body);
    });
}
