const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const PORT = 7777;

const MESSAGES_PATH = 'messages.txt';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;

    if (pathname === '/message-add') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const postData = querystring.parse(body);
            const message = postData.message;

            fs.appendFile(MESSAGES_PATH, message + '\n', err => {
                if (err) throw err;
            });

            res.end('Message saved');
        });
    }

    if (pathname === '/message-get') {
        fs.readFile(MESSAGES_PATH, 'utf8', (err, data) => {
            if (err) throw err;

            res.end(data);
        });
    }
});

server.listen(PORT);