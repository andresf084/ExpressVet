const express = require('express'),
router =  express.Router(),
petMaster = require('../controllers/pets.controllers')

router.post('/', petMaster.create)
router.get('/', petMaster.list)
router.delete('/:_id', petMaster.delete)
router.put('/', petMaster.update)
router.post('/search', petMaster.search)

module.exports = router