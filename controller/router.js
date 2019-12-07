const path = require('path');
const Router = require('router');
const router = Router();

router.use(function(req, res) {
     res.sendFile(path.join(__dirname, "../view/build/index.html"));
});

module.exports = router;