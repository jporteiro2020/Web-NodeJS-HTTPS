const express = require('express');
const router = express.Router();

router.get('/nosotros', (request, response) => {
    response.render('../views/nosotros');
});

router.get('/contacto', (request, response) => {
    response.render('../views/contacto');
});

module.exports = router;