import VideoCard from "./VideoCard";

function VideoList({
  videos,
  saveVideo,
  removeVideo,
  isFavorite
}) {

  return (

    <div className="videos-container">

    <div className="videos-container">

      {videos.map((video) => (

        <VideoCard
          key={video.videoId}
          video={video}
          saveVideo={saveVideo}
          removeVideo={removeVideo}
          isFavorite={isFavorite}
        />

      ))}

</div>
    </div>
  )
}

export default VideoList;
