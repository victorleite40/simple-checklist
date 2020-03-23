const User = require('../models/User');

const bcrypt = require('bcrypt');

module.exports = {
    async signin(req, res) {
        const { email } = req.body;
        const { username } = req.body;
        const { password } = req.body;

        user = await User.create({
           email: email,
           username: username,
           password: bcrypt.hashSync(password, 10)
        });

        return res.json(user);
    },

    async login(req, res) {
        const { email } = req.body;
        const { password } = req.body;

        User.findOne({ email: email }).then( function(user) {
            if (!user) {
                res.redirect('/login');
            } else {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result) {
                        res.redirect('/:username');
                    } else {
                        res.redirect('/login');
                    }
                });
            }
        });
        
    }

}