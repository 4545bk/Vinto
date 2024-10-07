// src/components/YoutubeTask.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: { url: string };
    };
  };
}

const YoutubeTask: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0); // State for points

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDLyXuEigGN9Q_PJXhdC6pu96kVbhIaY5g&channelId=UCWgz2F9B_hjflAKp8TdIekw&order=date&part=snippet&type=video&maxResults=8`
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
    
    // Load points from local storage on component mount
    const storedPoints = localStorage.getItem('points');
    if (storedPoints) {
      setPoints(Number(storedPoints));
    }
  }, []);

  const handleVideoClick = (videoId: string) => {
    setSelectedVideoId(videoId);
    addPoints(100); // Add points when the video is clicked
  };

  const addPoints = (amount: number) => {
    setPoints(prevPoints => {
      const newPoints = prevPoints + amount;
      localStorage.setItem('points', newPoints.toString()); // Save new points to local storage
      return newPoints;
    });
  };

  const closePlayer = () => {
    setSelectedVideoId(null);
  };

  return (
    <div className="youtube-task-container mt-4 px-4">
      <h2 className="text-xl text-white mb-4">Latest Videos</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="bg-[#272a2f] rounded-lg p-2 cursor-pointer"
            onClick={() => handleVideoClick(video.id.videoId)}
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full h-auto rounded-md"
            />
            <h3 className="text-sm text-white mt-2">{video.snippet.title}</h3>
          </div>
        ))}
      </div>

      {selectedVideoId && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="relative w-full max-w-3xl p-4">
            <button
              className="absolute top-2 right-2 text-white text-xl"
              onClick={closePlayer}
            >
              &times;
            </button>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${selectedVideoId}`}
              title="YouTube Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="mt-4 text-white">Points: {points}</div> {/* Display points */}
    </div>
  );
};

export default YoutubeTask;
