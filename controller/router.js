const http = require('http');
const path = require('path');
const Router = require('router');
const router = Router();

router.use(function(req, res) {
     res.sendFile(path.join(__dirname, "view/public/index.html"));
});

module.exports = router;