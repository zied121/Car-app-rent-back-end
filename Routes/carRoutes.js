const express = require('express');
const isAuth = require('../Middleware/isauth')
const router = express.Router();
const {
    addCar,
    FindCar,
    UpdateCar,
    DeleteCar

} = require("../Controllers/carController");

router.post("/car", isAuth, addCar);
router.get("/car", isAuth, FindCar);
/*router.put("/car/:id", UpdateCar);
router.delete("/car/:id", DeleteCar);*/
module.exports = router;