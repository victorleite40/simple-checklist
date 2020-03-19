const Board = require('../models/Board');

module.exports = {
    async index(req, res) {
        const boards = await Board.find();

        return res.json(boards)
    },

    async indexName(req, res) {
        const { board_id } = req.headers;

        const board = await Board.findById({ _id: board_id });

        return res.json(board.name);
    },

    async store(req, res) {
        const { name } = req.body;

        board = await Board.create({ name });

        return res.json(board);
    },

    async destroy(req, res, next){
        const { board_id } = req.headers;

        Board.findByIdAndRemove({ _id: board_id }).then(function(board){
            res.send(board);
        }).catch(next);
    }
}