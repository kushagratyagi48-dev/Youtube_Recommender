const Favorite =
    require("../models/Favorite");

const SearchHistory =
    require("../models/SearchHistory");

const {
    searchYouTubeVideos
} = require("../services/youtubeService");


async function getVideos(req, res) {

    console.log("getVideos called");

    let search = req.query.search;

    await SearchHistory.create({

    userId: req.userId,
    searchTerm: search

});

    try {

        let videos =
    await searchYouTubeVideos(search);

let formattedVideos =
    videos.map((video) => ({

        videoId:
            video.id.videoId,

        title:
            video.snippet.title,

        thumbnail:
            video.snippet
                .thumbnails
                .medium
                .url

    }));
console.log(formattedVideos);
res.json(formattedVideos);

    }

    catch (error) {

    console.log(error);

        res.status(500).json({
            message: "Error fetching videos"
        });

    }
}
async function getRecommendations(req, res) {

    try {

        let searches =
            await SearchHistory.find({

                userId: req.userId

            });

        if (searches.length === 0) {

            return res.json([]);
        }

        let favorites =
            await Favorite.find({

                userId: req.userId

            });

        let searchCounts = {};

        searches.forEach((item, index) => {

            let term =
                item.searchTerm.toLowerCase();

            let weight =
                index + 1;

            if (searchCounts[term]) {

                searchCounts[term] +=
                    weight;

            }

            else {

                searchCounts[term] =
                    weight;

            }

        });

        const ignoredWords = [

            "video",
            "official",
            "highlights",
            "watch",
            "episode",
            "trailer",
            "full",
            "live",
            "music"

        ];

        favorites.forEach((item) => {

            let words =
                item.title
                    .toLowerCase()
                    .split(" ");

            words.forEach((word) => {

                if (

                    word.length < 4 ||

                    ignoredWords.includes(word)

                ) {

                    return;
                }

                if (favoriteCounts[word]) {

    favoriteCounts[word] += 5;

}

else {

    favoriteCounts[word] = 5;

}

            });

        });

        console.log(searchCounts);

        let sortedTopics =

            Object.entries(searchCounts)

                .sort(

                    (a, b) => b[1] - a[1]

                );

        let topTopics = [];

for (let item of sortedTopics) {

    let topic = item[0];

    let alreadySimilar =
        topTopics.some((existing) =>

            existing.includes(topic) ||

            topic.includes(existing)

        );

    if (!alreadySimilar) {

        topTopics.push(topic);

    }

    if (topTopics.length === 3) {

        break;

    }

}

        console.log(topTopics);

        let allVideos = [];

        let addedVideoIds =
    new Set();

for (let topic of topTopics) {

    let videos =
        await searchYouTubeVideos(
            topic
        );
        videos = videos.slice(0, 4);

    videos.forEach((video) => {

    let id =
        video.id.videoId;

    if (

        !addedVideoIds.has(id)

    ) {

        addedVideoIds.add(id);

        allVideos.push(video);

    }

});

}

allVideos.sort(() =>
    Math.random() - 0.5
);

        let formattedVideos =
            allVideos.map((video) => ({

                videoId:
                    video.id.videoId,

                title:
                    video.snippet.title,

                thumbnail:
                    video.snippet
                        .thumbnails
                        .medium
                        .url

            }));

        res.json(formattedVideos);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Error fetching recommendations"

        });

    }
}
async function deleteFavorite(req, res) {

    try {

        const videoId =
            req.params.videoId;

        await Favorite.deleteOne({

            userId: req.userId,

            videoId

        });

        res.json({

            message:
                "Favorite deleted"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Error deleting favorite"

        });

    }
}

async function saveFavorite(req, res) {

    try {

        const {

            videoId,
            title,
            thumbnail

        } = req.body;

        const existingFavorite =
            await Favorite.findOne({

                userId: req.userId,

                videoId

            });

        if (existingFavorite) {

            return res.json({

                message:
                    "Already Saved"

            });

        }

        const favorite =
            await Favorite.create({

                userId: req.userId,

                videoId,

                title,

                thumbnail

            });

        res.json(favorite);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Error saving favorite"

        });

    }

}

async function getFavorites(req, res) {

    try {

        const favorites =
            await Favorite.find({

                userId: req.userId

            });

        res.json(favorites);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Error fetching favorites"

        });

    }

}

async function getHistory(req, res) {

    try {

        const history =
            await SearchHistory.find({

                userId: req.userId

            }).sort({

                createdAt: -1

            });

        res.json(history);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Error fetching history"

        });

    }

}

module.exports = {

    getVideos,
    getRecommendations,
    saveFavorite,
    getFavorites,
    getHistory,
    deleteFavorite

};