const Item = require('../models/Item');
const Board = require('../models/Board');

module.exports = {
    async index(req, res) {
        const { board_id } = req.headers;

        const items = await Item.find({ board: board_id });

        return res.json(items);
    },

    async store(req, res) {
        const { board_id } = req.headers;
        const { task } = req.body;

        const board = await Board.findById(board_id);

        if (!board) {
            return res.status(400).json({ error: 'Board not found.' })
        }

        const item = await Item.create({
            done: false,
            task: task,
            board: board_id
        });

        return res.json(item);
    }
}