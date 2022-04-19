const router = require("express").Router();

const { Friend, User } = require("../../db/models");
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
  try {
    // TODO: make this a union query to use index on both user ids
    const friendships = await Friend.findAll({
      where: {
        [Op.or]: [{ user_one_id: req.user.id }, { user_two_id: req.user.id }],
      },
    });
    res.json(friendships);
  } catch (error) {
    next(error);
  }
});

// send friend request
router.post("/", async (req, res, next) => {
  const { userId } = req.body;
  try {
    const friendship = await Friend.create({
      user_one_id: req.user.id,
      user_two_id: userId,
      status: "PENDING",
    });

    res.json(friendship);
  } catch (error) {
    next(error);
  }
});

// confirm friend request
router.put("/:friendshipId", async (req, res, next) => {
  const { friendshipId } = req.body;

  try {
    let friendship = await Friend.findByPk(friendshipId, {
      // user responding to friend request will always be user id 2
      where: {
        user_two_id: req.user.id,
      },
    });
    if (friendship) {
      friendship.status = "ACCEPTED";
      await friendship.save();
      res.json(friendship);
    } else {
      const error = new Error("friendship not found");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

// deny friend request
router.delete("/:friendshipId", async (req, res, next) => {
  const { friendshipId } = req.body;

  try {
    let friendship = await Friend.findByPk(friendshipId, {
      // user responding to friend request will always be user id 2
      where: {
        user_two_id: req.user.id,
      },
    });
    if (friendship) {
      await friendship.destroy();
      res.sendStatus(200);
    } else {
      const error = new Error("friendship not found");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

// username search
router.get("/search", async (req, res, next) => {
  console.log("DID WE GET HERE");
  let { username } = req.query;
  username = username.toLowerCase();
  try {
    const user = await User.findOne({
      where: {
        username_lowercase: username,
      },
      attributes: ["id", "username"],
    });

    if (!user) {
      const error = new Error("user not found");
      error.status = 404;
      throw error;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
