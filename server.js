const http = require('http');

const servidor = http.createServer(function (req, resp) {
    let html = '';
    if (req.url == '/') {
        html = `
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
            </head>
            <body>
                <h1>Casa do Código</h1>
            </body>
        </html>`;
    }
    else if (req.url == '/livros') {
        html = `
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
            </head>
            <body>
                <h1>Listagem de livros</h1> 
            </body>
        </html>`
    }

    resp.end(html);
});
servidor.listen(3000);
