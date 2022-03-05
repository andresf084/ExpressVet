const express = require('express'),
router =  express.Router(),
userMaster = require('../controllers/users.controllers')

router.post('/login', userMaster.login)
router.post('/', userMaster.create)
router.get('/', userMaster.list)
router.delete('/:_id', userMaster.delete)
router.put('/', userMaster.update)
router.post('/search', userMaster.search)

module.exports = router