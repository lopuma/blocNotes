const router = require('express').Router();
const { indexget, notesget } = require('../controller/index.controller')

router.get('/', indexget);
router.get('/notes', notesget);

module.exports = router;