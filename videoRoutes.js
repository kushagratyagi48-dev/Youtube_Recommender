const authMiddleware =
    require(
        "../middleware/authMiddleware"
    );

const express = require("express");

const router = express.Router();

const {

    getVideos,
    getRecommendations,
    saveFavorite,
    getFavorites,
    deleteFavorite,
    getHistory

} = require("../controllers/videoController");

router.get(
    "/",
    authMiddleware,
    getVideos
);

router.get(
    "/recommendations",
    authMiddleware,
    getRecommendations
);

router.post(
    "/favorites",
    authMiddleware,
    saveFavorite
);

router.get(
    "/favorites",
    authMiddleware,
    getFavorites
);

router.delete(
    "/favorites/:videoId",
    authMiddleware,
    deleteFavorite
);
router.get(

    "/history",

    authMiddleware,

    getHistory

);
module.exports = router;
