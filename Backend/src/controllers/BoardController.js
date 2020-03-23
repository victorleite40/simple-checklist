const Board = require('../models/Board');
const Item = require('../models/Item');

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
        const { user_id } = req.headers;

        board = await Board.create({
            name: name,
            user_id: user_id
        });

        return res.json(board);
    },

    async destroy(req, res, next){
        const { board_id } = req.headers;
        
        const board = await Board.findById({ _id: board_id });

        Board.findByIdAndRemove({ _id: board_id }).catch(next);

        Item.findOneAndRemove({ board: board_id }).catch(next);

        return res.json(board);
    }
}