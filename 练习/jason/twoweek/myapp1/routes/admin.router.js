var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/usermanger', function(req, res, next) {
    res.render('admin', { title: '用户管理' });
});

module.exports = router;
