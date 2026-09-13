const User = require("../models/User");

const shopItems = [
  {
    id: 1,
    name: "Warrior Badge",
    description: "A badge for completing difficult challenges.",
    price: 100,
    type: "Badge",
  },
  {
    id: 2,
    name: "Mystic Theme",
    description: "Unlock a mysterious new visual theme.",
    price: 150,
    type: "Theme",
  },
  {
    id: 3,
    name: "Golden Crown",
    description: "A prestigious crown for your inventory.",
    price: 250,
    type: "Cosmetic",
  },
  {
    id: 4,
    name: "XP Booster",
    description: "A special reward item for your collection.",
    price: 200,
    type: "Reward",
  },
];

const getShopItems = (req, res) => {
  res.status(200).json({ items: shopItems });
};

const buyShopItem = async (req, res, next) => {
  try {
    const item = shopItems.find((shopItem) => shopItem.id === Number(req.params.id));

    if (!item) {
      return res.status(404).json({ message: "Shop item not found" });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.gold < item.price) {
      return res.status(400).json({ message: "Not enough Gold" });
    }

    user.gold -= item.price;
    user.inventory.push(item);
    await user.save();

    res.status(200).json({
      message: "Item purchased successfully",
      item,
      user: {
        gold: user.gold,
        inventory: user.inventory,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getShopItems, buyShopItem };
