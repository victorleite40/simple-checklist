const express = require('express'); 

const BoardController = require('./controllers/BoardController');
const ItemController = require('./controllers/ItemController');

const routes = express.Router();

routes.get('/boards', BoardController.index);
routes.post('/boards', BoardController.store);
routes.delete('/boards', BoardController.destroy);

routes.get('/boards/:board_id', ItemController.index);
routes.post('/boards/:board_id', ItemController.store);
routes.put('/boards/:board_id', ItemController.update);
routes.delete('/boards/:board_id', ItemController.destroy);

module.exports = routes;