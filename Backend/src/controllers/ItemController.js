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
    },

    async update(req, res, next) {
        const { item_id } = req.headers;

        const item = await Item.findById({ _id: item_id });

        Item.findByIdAndUpdate({ _id: item_id }, { done: !item.done }).then(function(){
            Item.findOne({ _id: item_id }).then(function(item){
                res.send(item);
            });
        }).catch(next);
    },

    async destroy(req, res, next){
        const { item_id } = req.headers;

        Item.findByIdAndRemove({ _id: item_id }).then(function(item){
            res.send(item);
        }).catch(next);
    }
        
}