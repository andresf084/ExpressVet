const { Router } = require("express"),
router = Router();

router.use("/meeting", require("../routes/meetings.routes"));
router.use("/pet", require("../routes/pets.routes"));
router.use("/user", require("../routes/users.routes"));

module.exports = router;