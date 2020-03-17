const Board = require('../models/Board');

module.exports = {
    async index(req, res) {
        const boards = await Board.find();

        return res.json(boards)
    },

    async store(req, res) {
        const { name } = req.body;

        board = await Board.create({ name });

        return res.json(board);
    }
}