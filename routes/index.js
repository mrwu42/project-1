const path = require("path");
const router = require("express").Router();

router.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

router.use('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/survey.html'));
});

router.use('/directions', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/directions.html'));
});

module.exports = router;