const express = require('express'),
router =  express.Router(),
meetingMaster = require('../controllers/meetings.controllers')
const {buildSearch} = require('../middleware/buildSearch.mw')

router.post('/', meetingMaster.create)
router.get('/', meetingMaster.list)
router.delete('/:_id', meetingMaster.delete)
router.put('/', meetingMaster.update)
router.post('/search', buildSearch, meetingMaster.search)
router.get('/cntActv', meetingMaster.CountActive)
router.get('/cntRsrv', meetingMaster.CountReserve)
router.get('/cntCmplt', meetingMaster.CountComplete)
router.post('/searchRsrvs', meetingMaster.SearchReserve)
router.put('/cancel', meetingMaster.Cancel)

module.exports = router