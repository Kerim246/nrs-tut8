const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.method == 'GET') {
        fs.readFile('gradovi.csv', (err, data) => {
            if (err) return console.error(err);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            let spisak = data.toString().split("\n");
            res.write('<table>');
            res.write('<tr><th>Gradovi:</th>');
            for (let i = 0; i < spisak.length - 1; i++) {
                res.write('<tr><td>' + spisak[i] + '</td>');
                //    res.write(spisak[i]);
                res.write('</tr>');
            }
            res.write('</table>');
            // res.end(JSON.stringify(niz + "\n"));  // Konvertovanje objekta u string 
        });
    }
}).listen(8080);