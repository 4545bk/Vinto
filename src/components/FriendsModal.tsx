import React from 'react';

interface FriendsModalProps {
  onClose: () => void;
}

const FriendsModal: React.FC<FriendsModalProps> = ({ onClose }) => {
  const shareLink = `${window.location.origin}/invite`; // Dynamic link

  const handleShareTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareLink)}`;
    window.open(telegramUrl, '_blank');
  };

  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareLink)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareCopy = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4 w-4/5 md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Share with Friends!</h2>
        <p className="mb-4">Invite your friends to get a Reward</p>
        <div className="flex flex-col space-y-2">
          <button 
            onClick={handleShareTelegram} 
            className="bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Share on Telegram
          </button>
          <button 
            onClick={handleShareWhatsApp} 
            className="bg-green-500 text-white text-center py-2 rounded-lg hover:bg-green-600 transition"
          >
            Share on WhatsApp
          </button>
          <button 
            onClick={handleShareCopy} 
            className="bg-gray-500 text-white text-center py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Copy Link
          </button>
          <button 
            onClick={onClose} 
            className="bg-gray-500 text-white text-center py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendsModal;
