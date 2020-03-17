const express = require('express'); 
const multer = require('multer'); 

const BoardController = require('./controllers/BoardController');
const ItemController = require('./controllers/ItemController');

const routes = express.Router();

routes.get('/boards', BoardController.index);
routes.post('/boards', BoardController.store);

routes.get('/boards/:board_id', ItemController.index);
routes.post('/boards/:board_id', ItemController.store);

routes.get('/', (req, res) => {
    return res.json({ "app": "Olá Mundo" });
}); 

module.exports = routes;