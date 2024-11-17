const { Router } = require('express');
const router = Router();

const {
  storeFavorite,
  listFavorite,
  deleteFavorite
} = require('../controllers/favoriteController');

/**
  @swagger
* /store/favorite:
*  post:
*   summary:  Salva uma notícia favorita
*   responses:
*    200:
*     description: Sucesso!
*     content:
*      application/json:
*       schema:
*        type: array
*        items:
*         type: object
*/
router.post('/store/favorite', storeFavorite);

/**
  @swagger
* /favorite/list:
*  get:
*   summary:  Busca notícias favoritadas
*   responses:
*    200:
*     description: Sucesso!
*     content:
*      application/json:
*       schema:
*        type: array
*        items:
*         type: object
*/
router.get('/favorite/list/:id', listFavorite);

  /**
  @swagger
* /user/delete:
*  delete:
*   summary:  Deleta uma notícia favoritada
*   responses:
*    200:
*     description:
*     content:
*      application/json:
*       schema:
*        type: array
*        items:
*         type: object
*/
  
router.delete('/favorite/delete', deleteFavorite);

module.exports = router;