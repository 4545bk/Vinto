import React, { useState, useEffect } from 'react';
import './App.css';
 import { binanceLogo, dailyCipher, dailyCombo, dailyReward, dollarCoin, mainCharacter } from './images';
import Info from './icons/Info';
import Settings from './icons/Settings';
import Youtube from './icons/Youtube';
import Friends from './icons/Friends';
import Coins from './icons/Coins';
import { Routes, Route, useNavigate } from 'react-router-dom';

import YoutubeTask from './components/YoutubeTask';
import FriendsModal from './components/FriendsModal';

import neba from '../src/icons/icons8-won-64 (1).png'

 
const App: React.FC = () => {
  const [showFriendsModal, setShowFriendsModal] = useState(false);

  const levelNames = [
    "Bronze",    // From 0 to 4999 coins
    "Silver",    // From 5000 coins to 24,999 coins
    "Gold",      // From 25,000 coins to 99,999 coins
    "Platinum",  // From 100,000 coins to 999,999 coins
    "Diamond",   // From 1,000,000 coins to 2,000,000 coins
    "Epic",      // From 2,000,000 coins to 10,000,000 coins
    "Legendary", // From 10,000,000 coins to 50,000,000 coins
    "Master",    // From 50,000,000 coins to 100,000,000 coins
    "GrandMaster", // From 100,000,000 coins to 1,000,000,000 coins
    "Lord"       // From 1,000,000,000 coins to ∞
  ];

  const levelMinPoints = [
    2000000000,        // Bronze
    5000000000,     // Silver
    7000000000,    // Gold
    10000000000,   // Platinum
    12000000000,  // Diamond
    15000000000,  // Epic
    18000000000, // Legendary
    21000000000, // Master
    24000000000,// GrandMaster
    27000000000//  
  ];

  const [levelIndex, setLevelIndex] = useState(6);
  const [points, setPoints] = useState(2457035420);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  
  
  const pointsToAdd = 26;
  const profitPerHour = 126420;

  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("");
  const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState("");
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState("");

  const navigate = useNavigate(); // useNavigate for programmatic navigation


  const calculateTimeLeft = (targetHour: number) => {
    const now = new Date();
    const target = new Date(now);
    target.setUTCHours(targetHour, 0, 0, 0);

    if (now.getUTCHours() >= targetHour) {
      target.setUTCDate(target.getUTCDate() + 1);
    }

    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}`;
  };

  useEffect(() => {
    const updateCountdowns = () => {
      setDailyRewardTimeLeft(calculateTimeLeft(0));
      setDailyCipherTimeLeft(calculateTimeLeft(19));
      setDailyComboTimeLeft(calculateTimeLeft(12));
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load points and levelIndex from local storage on component mount
    const storedPoints = localStorage.getItem('points');
    const storedLevelIndex = localStorage.getItem('levelIndex');

    if (storedPoints) {
      setPoints(Number(storedPoints));
      console.log("Loaded points from localStorage:", storedPoints);
    } else {
      console.log("No points found in localStorage.");
    }
    if (storedLevelIndex) {
      setLevelIndex(Number(storedLevelIndex));
      console.log("Loaded levelIndex from localStorage:", storedLevelIndex);
    } else {
      console.log("No levelIndex found in localStorage.");
    }
  }, []);

  useEffect(() => {
    // Save points and levelIndex to local storage whenever they change
    localStorage.setItem('points', points.toString());
    localStorage.setItem('levelIndex', levelIndex.toString());
    console.log("Saved points to localStorage:", points);
    console.log("Saved levelIndex to localStorage:", levelIndex);
  }, [points, levelIndex]);





  
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = '';
    }, 100);

    setPoints(points + pointsToAdd);
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  };

  useEffect(() => {
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
      setLevelIndex(levelIndex + 1);
    } else if (points < currentLevelMin && levelIndex > 0) {
      setLevelIndex(levelIndex - 1);
    }
  }, [points, levelIndex, levelMinPoints, levelNames.length]);

  const formatProfitPerHour = (profit: number) => {
    if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
    if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
    if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
    return `+${profit}`;
  };

  useEffect(() => {
    const pointsPerSecond = Math.floor(profitPerHour / 3600);
    const interval = setInterval(() => {
      setPoints(prevPoints => prevPoints + pointsPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [profitPerHour]);

  

  
  


  return (
    <div className="bg-black flex justify-center">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <div className="px-4 z-10">
          <div className="flex items-center space-x-2 pt-4">
            <div className="p-1 rounded-lg bg-[#315eac]">
               <img src={neba} px-3></img>
            </div>
            <div>
              <p className="text-lg">Vinto Coin (Win coin)</p>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4 mt-2">
            <div className="flex items-center w-1/2">
              <div className="w-full">
                <div className="flex justify-between">
                  <p className="text-sm">{levelNames[levelIndex]}</p>
                  <p className="text-sm">{levelIndex + 1} <span className="text-[#ffffff]">/ {levelNames.length}</span></p>
                </div>
                <div className="flex items-center mt-1 border-2 border-[#ffffff] rounded-full">
                  <div className="w-full h-2 bg-[#ffffff]/[0.6] rounded-full">
                    <div className="progress-gradient h-2 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">
              <img src={binanceLogo} alt="Exchange" className="w-8 h-8" />
              <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
              <div className="flex-1 text-center">

                <p className="text-xs text-[#85827d] font-medium">Profit per hour</p>
                <div className="flex items-center justify-center space-x-1">
                  <img src={dollarCoin} alt="Dollar Coin" className="w-[18px] h-[18px]" />
                  <p className="text-sm">{formatProfitPerHour(profitPerHour)}</p>
                  <Info size={20} className="text-[#43433b]" />
                </div>
              </div>
              <div className="h-[2px] w-[209px] bg-[#43433b] mx-20"></div>
              <Settings className="text-black" />
            </div>
          </div>
        </div>

        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[408px] relative top-glow z-0">
          <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#7d1717] rounded-t-[46px]">
            <div className="px-4 mt-6 flex justify-between gap-2">
              <div className="bg-[#0f1150d1] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={dailyReward} alt="Daily Reward" className="mx-auto w-12 h-12" />
                <p className="text-[21px] text-center text-white mt-1">Start</p>
                <p className="text-[0px] font-thin text-center text-gray-400 mt-2">{dailyRewardTimeLeft}</p>
              </div>
              <div className="bg-[#0f1150d1] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={dailyCipher} alt="Daily Cipher" className="mx-auto w-12 h-12" />
                <p className="text-[21px] text-center text-white mt-1">Play</p>
                <p className="text-[0px] font-medium text-center text-gray-400 mt-2">{dailyCipherTimeLeft}</p>
              </div>
              <div className="bg-[#0f1150d1] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={dailyCombo} alt="Daily Combo" className="mx-auto w-12 h-12" />
                <p className="text-[21px] text-center text-white mt-1">Win</p>
                <p className="text-[0px] font-medium text-center text-gray-400 mt-2">{dailyComboTimeLeft}</p>
              </div>
            </div>

            <div className="px-4 mt-4 flex justify-center">
              <div className="px-4 py-2 flex items-center space-x-2">
                <img src={dollarCoin} alt="Dollar Coin" className="w-10 h-10" />
                <p className="text-4xl text-white">{points.toLocaleString()}</p>
               </div>
            </div>

            <div className="px-4 mt-4 flex justify-center">
              <div
                className="w-80 h-80 p-4 rounded-full circle-outer"
                onClick={handleCardClick}
              >
                <div className="w-full h-full rounded-full circle-inner">
                  <img src={mainCharacter} alt="Main Character" className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fixed div */}
      {/* Bottom fixed div */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs border border-[#ffddc1] shadow-lg shadow-[#ffddc1]/40">
      <div
  className="text-center text-[#BA3537] w-1/5 cursor-pointer hover:border-2 hover:border-[#BA3537] transition-transform duration-300 transform hover:scale-105 hover:shadow-md hover:shadow-[#BA3537]/50 rounded-xl p-2"
  onClick={() => navigate('/youtube-task')} // Navigate to YoutubeTask when the YouTube icon is clicked
>
  <Youtube size={20} className="w-16 h-10 mx-auto pt-1" />
  <p className="mt-1 text-[#FFFFFF] pb-5">Task</p>
</div>

 
<div
  className="text-center text-[#BA3537] w-1/5 cursor-pointer hover:border-2 hover:border-[#85827d] transition-transform duration-300 transform hover:scale-105 hover:shadow-md hover:shadow-[#85827d]/50 rounded-xl p-2"
  onClick={() => setShowFriendsModal(true)} // Open the FriendsModal
>
  <Friends className="w-8 h-8 mx-auto" />
  <p className="mt-1 text-[#FFFFFF]">Friends</p>
</div>

 
   <div className="text-center text-[#BA3537] w-1/5 hover:border-2 hover:border-[#85827d] transition-transform duration-300 transform hover:scale-105 hover:shadow-md hover:shadow-[#85827d]/50 rounded-xl p-2">
     <Coins className="w-8 h-8 mx-auto" />
     <p className="mt-1 text-[#FFFFFF]">Earn</p>
   </div>
 </div>
    <Routes>
       <Route path="/youtube-task" element={<YoutubeTask />} /> {/* Add this for the YouTube task page */}
 
    </Routes>


      {clicks.map((click) => (
        <div
          key={click.id}
          className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float 1s ease-out`
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          {pointsToAdd}
        </div>
      ))}
      {showFriendsModal && (
  <FriendsModal onClose={() => setShowFriendsModal(false)} />
)}

      
    </div>
  );
};

export default App;


