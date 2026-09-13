const express = require("express");
const { getShopItems, buyShopItem } = require("../controllers/shopController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.get("/", getShopItems);
router.post("/:id/purchase", buyShopItem);

module.exports = router;
