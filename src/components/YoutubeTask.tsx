import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Api_Key = "AIzaSyDLyXuEigGN9Q_PJXhdC6pu96kVbhIaY5g";

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
  const [points, setPoints] = useState<number>(0);
  const [vpnEnabled, setVpnEnabled] = useState<boolean>(false); // VPN state

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=${Api_Key}&channelId=UCWgz2F9B_hjflAKp8TdIekw&order=date&part=snippet&type=video&maxResults=8`
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();

    // Load points from localStorage when the component mounts
    const storedPoints = localStorage.getItem('points');
    if (storedPoints) {
      setPoints(Number(storedPoints));
    }
  }, []);

  const addPoints = (amount: number) => {
    setPoints((prevPoints) => {
      const newPoints = prevPoints + amount;
      localStorage.setItem('points', newPoints.toString());
      return newPoints;
    });
  };

  const handleVideoClick = (videoId: string) => {
    if (!vpnEnabled) {
      alert('Please enable VPN to watch this video.');
      return;
    }
    setSelectedVideoId(videoId);
    addPoints(100); // Add points for each video click
  };

  const closePlayer = () => {
    setSelectedVideoId(null);
  };

  // Toggle VPN functionality
  const toggleVpn = () => {
    setVpnEnabled((prev) => !prev);
    alert(vpnEnabled ? 'VPN disabled.' : 'VPN enabled! You can now watch videos securely.');
  };

  return (
    <div className="youtube-task-container">
      {/* Header */}
      <header className="bg-[#1c1f24] text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vinto Coin</h1>
        <nav className="flex items-center gap-6">
          <a href="/" className="text-white hover:text-gray-400">Home</a>
          <a href="#tasks" className="text-white hover:text-gray-400">Tasks</a>
          <button 
            className={`px-4 py-2 rounded ${vpnEnabled ? 'bg-green-600' : 'bg-red-600'} text-white`}
            onClick={toggleVpn}
          >
            {vpnEnabled ? 'VPN Enabled' : 'Enable VPN'}
          </button>
        </nav>
      </header>

      {/* Video Task Section */}
      <div className="mt-4 px-4">
        <h2 className="text-xl text-white mb-4">Latest Videos</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              className="bg-[#272a2f] rounded-lg p-3 cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => handleVideoClick(video.id.videoId)}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-auto rounded-md"
              />
              <h3 className="text-sm text-white mt-2 line-clamp-2">{video.snippet.title}</h3>
            </div>
          ))}
        </div>

        {selectedVideoId && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center transition-opacity duration-300 ease-in-out">
            <div className="relative w-full max-w-3xl p-4 bg-[#1c1f24] rounded-lg shadow-lg">
              <button
                className="absolute top-2 right-2 text-white text-2xl hover:text-gray-400 transition-colors"
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

        <div className="mt-6 text-white text-lg">Your Points: <span className="font-bold">{points}</span></div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1c1f24] text-white py-4 px-6 mt-8">
        <div className="flex justify-between items-center">
          <p>&copy; 2024 Vinto Coin. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-400">Terms of Service</a>
            <p>{vpnEnabled ? 'VPN is Active' : 'VPN is Disabled'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default YoutubeTask;
