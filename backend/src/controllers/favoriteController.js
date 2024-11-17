const connection = require('../config/db');

async function storeFavorite(request, response) {

    const params = Array(
        request.body.idUsuario,
        request.body.titulo,
        request.body.link,
        request.body.imagem_url,
        request.body.autor
    );

    const query = 'INSERT INTO favoritos(id_usuario, titulo, link, imagem_url, autor) VALUES(?, ?, ?, ?, ?);'; //post

    // Executa a ação no banco e valida os retornos para o client que realizou a solicitação
    connection.query(query, params, (err, results) => {
        try {
            if (results) {
                response
                    .status(201)
                    .json({
                        success: true,
                        message: `Sucesso! Usuário cadastrado.`,
                        data: results
                    });
            } else {
                console.log(err)
                response
                    .status(400)
                    .json({
                        success: false,
                        message: `Não foi possível realizar o cadastro. Verifique os dados informados`,
                        query: err.sql,
                        sqlMessage: err.sqlMessage
                    });
            }
        } catch (e) { // Caso aconteça algum erro na execução
            response.status(400).json({
                success: false,
                message: "Ocorreu um erro. Não foi possível cadastrar usuário!",
                query: err.sql,
                sqlMessage: err.sqlMessage
            });
        }
    });
}

async function listFavorite(request, response) {
    // console.log(request.params);

    const id_usuario = request.params.id;

    const query = "SELECT * FROM favoritos WHERE id_usuario = ?";

    connection.query(query, [id_usuario], (err, results) => {
        if (err) {
            console.error(err); // Log do erro para depuração
            return response.status(500).json({
                success: false,
                message: "Ops, deu problema!",
                data: err
            });
        }

        if (results.length > 0) {
            response.status(200).json({
                success: true,
                message: "Sucesso!",
                data: results
            });
        } else {
            response.status(404).json({
                success: false,
                message: "Nenhum favorito encontrado para este usuário.",
                data: []
            });
        }
    });
}

async function deleteFavorite(request, response) {
    const { idUsuario, link } = request.body;

    const query = "DELETE FROM favoritos WHERE id_usuario = ? AND link = ?";

    connection.query(query, [idUsuario, link], (err, results) => {
        if (err) {
            console.error(err);
            return response.status(500).json({
                success: false,
                message: "Erro ao tentar desfavoritar a notícia.",
                data: err
            });
        }

        if (results.affectedRows > 0) {
            response.status(200).json({
                success: true,
                message: "Notícia desfavoritada com sucesso!"
            });
        } else {
            response.status(404).json({
                success: false,
                message: "Favorito não encontrado."
            });
        }
    });
}


module.exports = {
    storeFavorite,
    listFavorite,
    deleteFavorite
}