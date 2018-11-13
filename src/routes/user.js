var express = require('express');
var router = express.Router();
const userService = require('../contexts/users/services/user');

router.get('/:username',async function(req, res) {
    var retorno = await userService.getUser(req.params);
    res.send(retorno)
});

router.post('/new', async (req, res) => {
    var retorno = await userService.newUser(req.body);
    if(retorno.status) {
        res.redirect('/');
    }
    else
        console.log(retorno);
      
});

module.exports = app => app.use('/user', router);