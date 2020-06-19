module.exports = (app) => {
    app.get('/', function (req, resp) {
        resp.send(`
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
            </head>
            <body>
                <h1>Casa do Código</h1>
            </body>
        </html>`
        );
    });

    app.get('/livros', function (req, resp) {
        resp.marko(
            require('../views/livros/Lista/lista.marko')
        );
    });
}