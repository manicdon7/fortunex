import React, { useState, useEffect } from "react";
import { FaTwitter, FaShareAlt } from "react-icons/fa";
import sha256 from "crypto-js/sha256";
import { TailSpin } from "react-loader-spinner";
import html2canvas from "html2canvas";
import './index.css'

const App = () => {
  const [username, setUsername] = useState("");
  const [fortune, setFortune] = useState("");
  const [category, setCategory] = useState("Professional Life");
  const [loading, setLoading] = useState(false);

  // Easter eggs and fun facts
  const easterEggs = [
    "Did you know? Honey never spoils.",
    "Fun fact: A flock of crows is called a murder.",
    "Easter egg: You found a hidden gem, congrats!",
    "The fortune teller is taking a break. Here’s a fun fact instead!"
  ];

  // Fortune categories
  const fortunes = {
    "Love Life": [
      "Love is the greatest refreshment in life.",
      "You will meet someone who will change your life forever.",
      "A heart that loves is always young.",
      "Your soulmate is closer than you think.",
      "Love is the only force capable of transforming an enemy into a friend.",
      "Love is not finding someone to live with, it's finding someone you can't live without.",
      "True love begins when nothing is looked for in return.",
      "Where there is love, there is life.",
      "Love is composed of a single soul inhabiting two bodies.",
      "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
      "You will soon be surrounded by good friends and laughter.",
      "Love will fill your life with moments of joy.",
      "Your charm will catch someone's eye today.",
      "Patience and understanding will lead to happiness in love.",
      "A new romantic chapter is about to begin in your life.",
      "You are deserving of a love that is unconditional and pure.",
      "Love brings a new opportunity for adventure.",
      "You will soon experience a beautiful romantic connection.",
      "Love is a journey, and you are about to embark on a wonderful one.",
      "The path to love is filled with surprises, be open to them.",
      "True love is rare, cherish it when you find it.",
      "Romance is in the air, let your heart lead the way.",
      "You will find peace in the arms of someone special.",
      "A moment of love will fill your heart with happiness.",
      "Love is around the corner, waiting for you to discover it."
    ],
    "Professional Life": [
      "Hard work beats talent when talent doesn't work hard.",
      "You are one decision away from a different professional life.",
      "A strong positive attitude will create more miracles than any wonder drug.",
      "Opportunities don't happen, you create them.",
      "Don't wait for opportunity, create it.",
      "Success is the result of preparation, hard work, and learning from failure.",
      "Believe in yourself, and the rest will follow.",
      "Your dedication will soon be rewarded.",
      "You will make great progress in your career.",
      "Your perseverance will lead to new opportunities.",
      "A new professional venture is on the horizon.",
      "You will overcome obstacles with creativity and determination.",
      "Great things never come from comfort zones.",
      "You will achieve success through hard work and dedication.",
      "The future belongs to those who prepare for it today.",
      "You are building a strong foundation for a successful future.",
      "Your ideas will lead to professional breakthroughs.",
      "You are capable of achieving more than you ever imagined.",
      "Leadership is not about being in charge, it's about taking care of those in your charge.",
      "Your hard work and discipline will soon pay off.",
      "An unexpected career opportunity will arise soon.",
      "Believe in the process, success takes time.",
      "You will soon receive recognition for your efforts.",
      "New skills will unlock doors in your professional life.",
      "Success comes to those who stay consistent and determined."
    ],
    "Friendship": [
      "Friends are the family you choose.",
      "A true friend is one soul in two bodies.",
      "Friendship is the only cement that will ever hold the world together.",
      "Your best friend will surprise you soon with good news.",
      "In the end, we will remember not the words of our enemies, but the silence of our friends.",
      "True friendship is never serene.",
      "A good friend knows all your stories; a best friend helped you write them.",
      "The most valuable gift you can receive is an honest friend.",
      "Friends make the world a better place to live in.",
      "Friendship doubles our joy and divides our grief.",
      "Your friends appreciate you more than you know.",
      "Cherish the people who make you laugh and lift you up.",
      "The bond of friendship grows stronger over time.",
      "A friend is one who knows you and loves you just the same.",
      "The road to a friend’s house is never long.",
      "Friendship improves happiness and abates misery.",
      "You will soon reconnect with a dear friend.",
      "A friend’s loyalty will never fade, even in the toughest times.",
      "Your friendships will stand the test of time.",
      "You are surrounded by friends who value your kindness.",
      "True friends are always together in spirit.",
      "You will make new friends who share your passions.",
      "Your friendship circle will expand with new connections.",
      "A friend's kind words will lift your spirits.",
      "Friendship is a sheltering tree, offering comfort and support."
    ],
    "Motivation": [
      "Success is not the key to happiness. Happiness is the key to success!",
      "Believe you can and you're halfway there.",
      "Today is your day, shine bright!",
      "The only limit to our realization of tomorrow is our doubts of today.",
      "Don’t watch the clock; do what it does. Keep going.",
      "The harder you work for something, the greater you'll feel when you achieve it.",
      "You are capable of amazing things.",
      "Don't stop when you're tired. Stop when you're done.",
      "Small progress is still progress.",
      "You are stronger than you think.",
      "It always seems impossible until it’s done.",
      "Success is walking from failure to failure with no loss of enthusiasm.",
      "Focus on your goals, not your fears.",
      "Do something today that your future self will thank you for.",
      "Push yourself, because no one else is going to do it for you.",
      "The key to success is to start before you are ready.",
      "Failure is not the opposite of success; it's part of success.",
      "Dream big, work hard, stay focused, and surround yourself with good people.",
      "You are one step closer to your goal.",
      "Success is a journey, not a destination.",
      "Mistakes are proof that you are trying.",
      "Don’t quit. Suffer now and live the rest of your life as a champion.",
      "Great things never come from comfort zones.",
      "Your journey is just beginning, stay motivated.",
      "Believe in yourself and all that you are."
    ],
    "Humor": [
      "Life is short. Smile while you still have teeth!",
      "If you think nobody cares if you’re alive, try missing a few payments.",
      "I’m not arguing, I’m just explaining why I’m right.",
      "Common sense is like deodorant. The people who need it most never use it.",
      "I'm on a seafood diet. I see food and I eat it.",
      "I'm not lazy, I'm on energy-saving mode.",
      "Why don't skeletons fight each other? They don't have the guts.",
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      "I have a clean conscience — I haven't used it once.",
      "Age is just a number. In your case, a really high one.",
      "I’m on a whiskey diet. I’ve lost three days already.",
      "If you think education is expensive, try ignorance.",
      "Why don't scientists trust atoms? Because they make up everything!",
      "I'm reading a book about anti-gravity. It's impossible to put down.",
      "I used to play piano by ear, but now I use my hands.",
      "Some people are like clouds—when they disappear, it's a beautiful day.",
      "I’m not lazy. I’m just very relaxed.",
      "I'd like to give a big shout-out to all the sidewalks for keeping me off the streets.",
      "Behind every great man is a woman rolling her eyes.",
      "I don't trust stairs. They're always up to something.",
      "I'm on a diet. I eat healthy...during the commercials.",
      "Why was the math book sad? Because it had too many problems.",
      "You don't have to be crazy to hang out with me. I'll train you.",
      "I'm not great at the advice. Can I interest you in a sarcastic comment?",
      "You will meet someone who will annoy you for the rest of your life. They're called friends."
    ],
    "Mystery": [
      "Today holds an unexpected surprise for you...",
      "Your lucky numbers: 4, 8, 15, 16, 23, 42.",
      "A twist of fate awaits you—be ready.",
      "Something you have been seeking is closer than you think.",
      "An unexpected opportunity will soon present itself.",
      "The answers you seek are already within you.",
      "The universe has a plan for you—trust the process.",
      "Look for the signs, they will guide you to your destiny.",
      "The unknown can lead to the greatest discoveries.",
      "Your intuition will lead you to something wonderful.",
      "A mystery in your life will soon be revealed.",
      "Keep an open mind—something extraordinary is on the way.",
      "You will uncover a hidden talent that surprises you.",
      "Destiny has chosen this moment for a revelation in your life.",
      "The truth will reveal itself when you least expect it.",
      "A chance encounter will change the course of your life.",
      "Pay attention to the coincidences—they are not accidental.",
      "The stars are aligning in your favor for a big reveal.",
      "You are about to enter a new chapter filled with wonder.",
      "Your curiosity will lead you to an exciting discovery.",
      "A forgotten memory will resurface and guide you forward.",
      "You are part of a bigger picture, soon to be unveiled.",
      "Someone from your past holds a secret that will be revealed soon.",
      "The universe works in mysterious ways—prepare for something magical.",
      "An enigma will soon be unraveled, bringing clarity to your life."
    ]
  };
  
  // Occasionally trigger easter egg
  const getFixedFortune = () => {
    if (!username) {
      alert("Please enter your Twitter handle or name.");
      return;
    }
    // 20% chance of an easter egg instead of fortune
    if (Math.random() < 0.2) {
      const randomEgg = easterEggs[Math.floor(Math.random() * easterEggs.length)];
      return `Hey ${username}, ${randomEgg}`;
    }

    const hash = sha256(username).toString();
    const hashValue = parseInt(hash.substring(0, 8), 16);
    const fortuneIndex = hashValue % fortunes[category].length;
    return `Hey ${username}, ${fortunes[category][fortuneIndex]}`;
  };

  const generateFortune = () => {
    if (!username) return;

    setLoading(true);
    setTimeout(() => {
      const selectedFortune = getFixedFortune();
      setFortune(selectedFortune);
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time for the animation
  };

  const downloadImage = () => {
    const fortuneElement = document.getElementById("fortune-card");
    html2canvas(fortuneElement).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${username}-fortune.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const tweetFortune = () => {
    const tweetText = encodeURIComponent(fortune);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&hashtags=FortuneTweet,${category}`;
    window.open(tweetUrl, "_blank");
  };

  const shareFortune = () => {
    const message = `I got this message from Fortune Guide - X: ${fortune}`;
    const dmText = encodeURIComponent(message);
    const dmUrl = `https://twitter.com/messages/compose?text=${dmText}`;
    window.open(dmUrl, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6 text-white scroll-container">
      <h1 className="lg:text-4xl text-2xl font-extrabold text-center lg:mb-32 mb-20 animate-fadeIn font-fortune" id="fortunetitle">✨Fortune Guide - X✨</h1>
      <input
        id="fortune"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your Twitter handle or name"
        className="border-2 border-white bg-transparent text-white rounded-lg p-3 w-full max-w-xs mb-4 placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
      />
      
      <select
        id="fortune"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border-2 border-white bg-gray-400 text-white rounded-lg p-3 w-full max-w-xs mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
      >
        <option value="Love Life">Love Life</option>
        <option value="Professional Life">Professional Life</option>
        <option value="Friendship">Friendship</option>
        <option value="Motivation">Motivation</option>
        <option value="Humor">Humor</option>
        <option value="Mystery">Mystery</option>
      </select>
      <button
        id="fortune"
        onClick={generateFortune}
        className="bg-indigo-600 text-white font-fortunebold font-bold py-3 px-6 rounded-lg mb-4 hover:bg-indigo-500 transition-all"
      >
        Message For You
      </button>

      {loading && (
        <div className="mb-6">
          <TailSpin color="#FFF" height={50} width={50} />
        </div>
      )}

      {fortune && !loading && (
        <>
          <div id="fortune-card" className="text-xl text-center mb-6 bg-white text-black p-4 rounded-lg shadow-lg animate-fadeIn">
            <p>{fortune}</p>
          </div>
          
          <div className="flex space-x-4">
            <button
              id="fortune"
              onClick={downloadImage}
              className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-400 transition-all"
            >
              Download Image
            </button>

            <button
              id="fortune"
              onClick={tweetFortune}
              className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg flex items-center hover:bg-green-400 transition-all"
            >
              <FaTwitter className="mr-2" /> Tweet Fortune
            </button>

            <button
              id="fortune"
              onClick={shareFortune}
              className="bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg flex items-center hover:bg-yellow-400 transition-all"
            >
              <FaShareAlt className="mr-2" /> Share Fortune
            </button>
          </div>
        </>
      )}
      <div className="mt-10 text-center">
        <p className="text-white text-lg" id="fortune">
          Enjoyed your fortune? Invite a friend to discover theirs too!
        </p>
        <button
          id="fortune"
          onClick={shareFortune}
          className="bg-pink-500 text-white font-bold py-2 px-6 rounded-lg mt-4 hover:bg-pink-400 transition-all"
        >
          Share with a Friend
        </button>
      </div>
    </div>
  );
};

export default App;
