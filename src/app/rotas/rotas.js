const LivroDao = require('../infra/livros-dao');
const db = require('../../config/database');

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
        const livroDao = new LivroDao(db);

        livroDao.lista().
            then(livros =>
                resp.marko(
                    require('../views/livros/Lista/lista.marko'),
                    {
                        livros: livros
                    }
                ))
            .catch(erro => console.log(erro));
    });

    app.get('/livros/form', function (req, resp) {
        resp.marko(
            require('../views/livros/form/form.marko'),
            { livro: {} });
    });

    app.get('/livros/form/:id', function (req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.buscarPorId(id)
            .then(livro => {
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    { livro: livro }
                )
            })
            .catch(erro => console.log(erro));
    });

    app.post('/livros', function (req, resp) {
        const livroDao = new LivroDao(db);

        livroDao.adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.put('/livros', function (req, resp) {
        const livroDao = new LivroDao(db);

        livroDao.atualizar(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });


    app.delete('/livros/:id', function (req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.remove(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));
    });
}