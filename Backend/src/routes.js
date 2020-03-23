const express = require('express'); 

const BoardController = require('./controllers/BoardController');
const ItemController = require('./controllers/ItemController');
const SessionsController = require('./controllers/SessionsController');

const routes = express.Router();

routes.post('/signin', SessionsController.signin);
routes.post('/login', SessionsController.login);

routes.get('/boards', BoardController.index);
routes.post('/boards', BoardController.store);
routes.delete('/boards', BoardController.destroy);

routes.get('/boards/:board_id/name', BoardController.indexName);

routes.get('/boards/:board_id', ItemController.index);
routes.post('/boards/:board_id', ItemController.store);
routes.put('/boards/:board_id', ItemController.update);
routes.delete('/boards/:board_id', ItemController.destroy);

module.exports = routes;