function VideoCard({
  video,
  saveVideo,
  removeVideo,
  isFavorite
}) {

return (

    <div className="card">

        <img
            src={video.thumbnail}
            alt={video.title}
        />

        <div className="card-content">

            <h2>
                {video.title}
            </h2>

            <div className="buttons">

                <a

                    href={
                        "https://www.youtube.com/watch?v="
                        + video.videoId
                    }

                    target="_blank"

                    className="watch-btn"

                >

                    Watch

                </a>

                {

                    isFavorite

                    ?

                    <button

                        onClick={() =>

                            removeVideo(
                                video.videoId
                            )

                        }

                    >

                        Remove

                    </button>

                    :

                    <button

                        onClick={() =>

                            saveVideo(video)

                        }

                    >

                        Save

                    </button>

                }

            </div>

        </div>

    </div>

);
}

export default VideoCard;