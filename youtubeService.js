console.log(process.env.YOUTUBE_API_KEY);

const axios =
require("axios");

async function searchYouTubeVideos(
    search
) {

    const mockVideos = [

        {

            id: {

                videoId: "demo1"

            },

            snippet: {

                title:
                    "Demo Football Video",

                thumbnails: {

                    medium: {

                        url:
"https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"

                    }

                }

            }

        },

        {

            id: {

                videoId: "demo2"

            },

            snippet: {

                title:
                    "Demo Coding Video",

                thumbnails: {

                    medium: {

                        url:
"https://i.ytimg.com/vi/3fumBcKC6RE/hqdefault.jpg"

                    }

                }

            }

        },

        {

            id: {

                videoId: "demo3"

            },

            snippet: {

                title:
                    "Demo Car Video",

                thumbnails: {

                    medium: {

                        url:
"https://i.ytimg.com/vi/oHg5SJYRHA0/hqdefault.jpg"

                    }

                }

            }

        }

    ];

    try {

        let response = await axios.get(

            "https://www.googleapis.com/youtube/v3/search",

            {

                params: {

                    part: "snippet",

                    q: search,

                    type: "video",

                    maxResults: 6,

                    key:
                        process.env
                            .YOUTUBE_API_KEY

                }

            }

        );

        return response.data.items;

    }

    catch (error) {

        console.log(error);

        return mockVideos;

    }

}

module.exports = {

    searchYouTubeVideos

};