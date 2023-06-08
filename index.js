const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { clearScreenDown } = require('readline');
const app = express();
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
app.use(bodyParser.urlencoded({extended: true}));

app.get('/login', (req, res) => {
    console.log('login')
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
})
app.post('/login', (req, res) => {
    console.log('username posted successfully')
    res.redirect('/')
})

app.get('/', (req, res) => {
    fs.readFile( 'message.txt', (err,data) => {
        console.log(data);
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <p>${data}</p>
            <form action="/" method="post" onsubmit="document.querySelector('#username').value = localStorage.getItem('username')">
                <label for="message">Message</label>
                <input type="text" name="message" id="message">
                <input type="hidden" name="username" id="username">
                <button>send</button>
            </form>
    
    
        </body>
        </html>`);
    })
    
});

app.post('/', (req,res) => {
    console.log(req.body);
    fs.appendFile(path.join(__dirname, 'message.txt'), `${req.body.username} : ${req.body.message}`,()=>console.log(req.body.message));
    console.log("message send");
    res.redirect('/');

});



app.listen(3000);



// const express = require('express');
// const fs = require('fs');
// const app = express();
// const port = 3000;
// app.use(bodyParser.urlencoded({extended: true}));


// // Serve the login form
// app.get('/login', (req, res) => {
//   res.send(`
//     <html>
//       <body>
//         <h1>Login</h1>
//         <form action="/login" method="post">
//           <label for="username">Username:</label>
//           <input type="text" id="username" name="username">
//           <button type="submit">Submit</button>
//         </form>
//       </body>
//     </html>
//   `);
// });

// // Handle login form submission
// app.post('/login', (req, res) => {
//   const { username } = req.body;
  
//   // Store username in browser's local storage
//   res.setHeader('Set-Cookie', `username=${username}`);

  
//   // Redirect user to the send message form
//   res.redirect('/');
// });

// // Serve the send message form
// app.get('/', (req, res) => {
//   res.send(`
//     <html>
//       <body>
//         <h1>Send Message</h1>
//         <form action="/" method="post">
//           <label for="message">Message:</label>
//           <input type="text" id="message" name="message">
//           <button type="submit">Send</button>
//         </form>
//       </body>
//     </html>
//   `);
// });

// // Handle send message form submission
// app.post('/', (req, res) => {
//   const { message } = req.body;
//   const username = req.cookies.username;
  
//   // Store username and message in a file
//   fs.appendFile('messages.txt', `"${username}": "${message}"\n`, (err) => {
//     if (err) {
//       console.error(err);
//       res.sendStatus(500);
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

// // Read and display the messages from the file
// app.get('/messages', (req, res) => {
//   fs.readFile('messages.txt', 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       res.sendStatus(500);
//     } else {
//       const messages = JSON.parse(`{${data}}`);
//       res.send(messages);
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
