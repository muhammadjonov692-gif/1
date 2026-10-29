const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const coinScoreElement = document.getElementById('coinScore');
const levelDisplay = document.getElementById('levelDisplay');
const topCenterTimer = document.getElementById('topCenterTimer');
const timerLabel = document.getElementById('timerLabel');
const shieldSeconds = document.getElementById('shieldSeconds');
const missionDisplay = document.getElementById('missionDisplay');
const missionText = document.getElementById('missionText');
const comboDisplay = document.getElementById('comboDisplay');
const comboText = document.getElementById('comboText');
const missionTimerDisplay = document.getElementById('missionTimerDisplay');
const missionSeconds = document.getElementById('missionSeconds');

const levelBanner = document.getElementById('levelBanner');
const levelBannerTitle = document.getElementById('levelBannerTitle');
const levelBannerText = document.getElementById('levelBannerText');

const homeScreen = document.getElementById('homeScreen');
const topGamePanel = document.getElementById('topGamePanel');
const resumeBtn = document.getElementById('resumeBtn');
const classicModeBtn = document.getElementById('classicModeBtn');
const missionModeBtn = document.getElementById('missionModeBtn');
const infoBtn = document.getElementById('infoBtn');
const shopBtn = document.getElementById('shopBtn');
const skinsBtn = document.getElementById('skinsBtn');
const achievementsBtn = document.getElementById('achievementsBtn');
const homeSettingsBtn = document.getElementById('homeSettingsBtn');
const pauseBtn = document.getElementById('pauseBtn');

const infoModal = document.getElementById('infoModal');
const settingsModal = document.getElementById('settingsModal');
const skinsModal = document.getElementById('skinsModal');
const shopModal = document.getElementById('shopModal');
const achievementsModal = document.getElementById('achievementsModal');
const pauseModal = document.getElementById('pauseModal');

const closeInfo = document.getElementById('closeInfo');
const closeSettings = document.getElementById('closeSettings');
const closeSkins = document.getElementById('closeSkins');
const closeShop = document.getElementById('closeShop');
const closeAchievements = document.getElementById('closeAchievements');

const homeBtn = document.getElementById('homeBtn');
const restartBtn = document.getElementById('restartBtn');
const soundToggleBtn = document.getElementById('soundToggleBtn');
const diffBtns = document.querySelectorAll('.diff-btn');
const langBtns = document.querySelectorAll('.lang-btn');
const skinBtns = document.querySelectorAll('.skin-btn');

const buyGoldBtn = document.getElementById('buyGoldBtn');
const buyRainbowBtn = document.getElementById('buyRainbowBtn');
const buyCyberBtn = document.getElementById('buyCyberBtn');
const buyMatrixBtn = document.getElementById('buyMatrixBtn');
const buyGoldFireBtn = document.getElementById('buyGoldFireBtn');
const buyGalaxyBtn = document.getElementById('buyGalaxyBtn');

const menuGoldBtn = document.getElementById('menuGoldBtn');
const menuRainbowBtn = document.getElementById('menuRainbowBtn');
const menuCyberBtn = document.getElementById('menuCyberBtn');
const menuMatrixBtn = document.getElementById('menuMatrixBtn');
const menuGoldFireBtn = document.getElementById('menuGoldFireBtn');
const menuGalaxyBtn = document.getElementById('menuGalaxyBtn');

const totalCoinsEl = document.getElementById('totalCoins');

const pauseResumeBtn = document.getElementById('pauseResumeBtn');
const pauseRestartBtn = document.getElementById('pauseRestartBtn');
const pauseHomeBtn = document.getElementById('pauseHomeBtn');

let soundEnabled = true;
let currentLang = 'uz';
let currentSkin = 'neon';
let gameMode = 'classic';

let totalCoins = parseInt(localStorage.getItem('snake_coins')) || 0;
let unlockedSkins = JSON.parse(localStorage.getItem('snake_unlocked_skins')) || ['neon', 'fire'];

coinScoreElement.innerText = totalCoins;
totalCoinsEl.innerText = totalCoins;

const skinPrices = {
  gold: { price: 30, btnBuy: buyGoldBtn, btnMenu: menuGoldBtn, nameUz: "⭐ Oltin" },
  rainbow: { price: 50, btnBuy: buyRainbowBtn, btnMenu: menuRainbowBtn, nameUz: "🌈 Kamalak" },
  cyber: { price: 70, btnBuy: buyCyberBtn, btnMenu: menuCyberBtn, nameUz: "💻 Cyberpunk" },
  matrix: { price: 90, btnBuy: buyMatrixBtn, btnMenu: menuMatrixBtn, nameUz: "🟢 Matrix" },
  goldfire: { price: 120, btnBuy: buyGoldFireBtn, btnMenu: menuGoldFireBtn, nameUz: "🔥 Gold Fire" },
  galaxy: { price: 150, btnBuy: buyGalaxyBtn, btnMenu: menuGalaxyBtn, nameUz: "🌌 Galaxy" }
};

function updateShopUI() {
  totalCoinsEl.innerText = totalCoins;
  coinScoreElement.innerText = totalCoins;

  for (let key in skinPrices) {
    let item = skinPrices[key];
    if (unlockedSkins.includes(key)) {
      item.btnBuy.innerText = `${item.nameUz} (Sotib olingan)`;
      item.btnBuy.disabled = true;
      item.btnMenu.disabled = false;
      item.btnMenu.innerText = item.nameUz;
    } else {
      item.btnBuy.innerText = `${item.nameUz} (${item.price} ⭐)`;
      item.btnBuy.disabled = false;
      item.btnMenu.disabled = true;
      item.btnMenu.innerText = `🔒 ${item.nameUz}`;
    }
  }
}
updateShopUI();

function setupBuyHandler(key) {
  let item = skinPrices[key];
  item.btnBuy.onclick = () => {
    if (totalCoins >= item.price) {
      totalCoins -= item.price;
      unlockedSkins.push(key);
      localStorage.setItem('snake_coins', totalCoins);
      localStorage.setItem('snake_unlocked_skins', JSON.stringify(unlockedSkins));
      updateShopUI();
      playSound(1000, 1600, 'sine', 0.2);
    } else {
      alert("Tangalar yetarli emas! Qizil yulduzlarni yig'ing.");
    }
  };
}

for (let key in skinPrices) {
  setupBuyHandler(key);
}

const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const useShadows = !isMobileDevice;

const translations = {
  uz: {
    title: "ILON O'YINI",
    resume: "▶ Davom ettirish",
    classicMode: "🎮 Klassik Rejim",
    missionMode: "⏱️ Missiya Rejimi (60s)",
    shopMenu: "🛒 Do'kon",
    skinsMenu: "🎨 Skinlar",
    achievementsMenu: "🏆 Yutuqlar",
    settingsMenu: "⚙️ Sozlamalar",
    level: "MISSIYA",
    settings: "⚙️ Sozlamalar",
    highScore: "Rekord",
    score: "Achko",
    home: "🏠 Bosh ekran",
    restart: "🔄 Qayta boshlash",
    soundOn: "🔊 Ovoz: Yoqilgan",
    soundOff: "🔇 Ovoz: O'chirilgan",
    languageTitle: "Tilni Tanlash",
    difficultyTitle: "Qiyinlik Darajasi",
    diffEasy: "Oson",
    diffMedium: "O'rtacha",
    diffHard: "Qiyin",
    diffSuper: "☠️ Super Qiyin",
    close: "Yopish",
    skinsTitle: "🎨 Ilon Skinlari",
    achievementsTitle: "🏆 Yutuqlar",
    shield: "🛡️ ZASHITA",
    speed: "⚡ TEZLIK",
    slow: "❄️ SEKIN",
    magnet: "🧲 MAGNIT",
    pauseBtn: "⏸️",
    pauseTitle: "⏸️ PAUZA"
  },
  ru: {
    title: "ИГРА ЗМЕЙКА",
    resume: "▶ Продолжить",
    classicMode: "🎮 Классический режим",
    missionMode: "⏱️ Режим миссий (60с)",
    shopMenu: "🛒 Магазин",
    skinsMenu: "🎨 Скины",
    achievementsMenu: "🏆 Достижения",
    settingsMenu: "⚙️ Настройки",
    level: "МИССИЯ",
    settings: "⚙️ Настройки",
    highScore: "Рекорд",
    score: "Очки",
    home: "🏠 Главная",
    restart: "🔄 Перезапуск",
    soundOn: "🔊 Звук: Вкл",
    soundOff: "🔇 Звук: Выкл",
    languageTitle: "Выберите Язык",
    difficultyTitle: "Уровень Сложности",
    diffEasy: "Легко",
    diffMedium: "Средне",
    diffHard: "Сложно",
    diffSuper: "☠️ Кошмар",
    close: "Закрыть",
    skinsTitle: "🎨 Скины Змейки",
    achievementsTitle: "🏆 Достижения",
    shield: "🛡️ ЩИТ",
    speed: "⚡ СКОРОСТЬ",
    slow: "❄️ ЗАМЕДЛЕНИЕ",
    magnet: "🧲 МАГНИТ",
    pauseBtn: "⏸️",
    pauseTitle: "⏸️ PAUSE"
  },
  en: {
    title: "SNAKE GAME",
    resume: "▶ Resume",
    classicMode: "🎮 Classic Mode",
    missionMode: "⏱️ Mission Mode (60s)",
    shopMenu: "🛒 Shop",
    skinsMenu: "🎨 Skins",
    achievementsMenu: "🏆 Achievements",
    settingsMenu: "⚙️ Settings",
    level: "MISSION",
    settings: "⚙️ Settings",
    highScore: "High Score",
    score: "Score",
    home: "🏠 Home",
    restart: "🔄 Restart",
    soundOn: "🔊 Sound: On",
    soundOff: "🔇 Sound: Off",
    languageTitle: "Select Language",
    difficultyTitle: "Difficulty Level",
    diffEasy: "Easy",
    diffMedium: "Medium",
    diffHard: "Hard",
    diffSuper: "☠️ Nightmare",
    close: "Close",
    skinsTitle: "🎨 Snake Skins",
    achievementsTitle: "🏆 Achievements",
    shield: "🛡️ SHIELD",
    speed: "⚡ SPEED",
    slow: "❄️ SLOW",
    magnet: "🧲 MAGNET",
    pauseBtn: "⏸️",
    pauseTitle: "⏸️ PAUSE"
  }
};

function updateLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      if (key === 'soundOn' || key === 'soundOff') {
        el.innerText = soundEnabled ? t.soundOn : t.soundOff;
      } else {
        el.innerText = t[key];
      }
    }
  });

  const titleEl = document.querySelector('.game-title');
  if (titleEl) titleEl.innerText = t.title;
  checkAchievements();
}

langBtns.forEach(btn => {
  btn.onclick = () => {
    langBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateLanguage(btn.dataset.lang);
  };
});

skinBtns.forEach(btn => {
  btn.onclick = () => {
    if (btn.disabled) return;
    skinBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSkin = btn.dataset.skin;
  };
});

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(freq1, freq2, type = 'sine', duration = 0.1) {
  if (!soundEnabled) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq1, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freq2, audioCtx.currentTime + duration);
  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + duration);
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.start(); osc.stop(audioCtx.currentTime + duration);
}

let isPlaying = false;
let isGameOver = false;

const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
window.addEventListener('mousemove', (e) => {
  mouse.x = Math.max(20, Math.min(canvas.width - 20, e.clientX));
  mouse.y = Math.max(20, Math.min(canvas.height - 20, e.clientY));
});

let difficulty = 'easy'; 
const diffSpeeds = { easy: 0.5, medium: 0.85, hard: 1.4, super: 3.8 };

pauseBtn.onclick = () => {
  if (isPlaying) {
    isPlaying = false;
    pauseModal.classList.remove('hidden');
  }
};

pauseResumeBtn.onclick = () => {
  pauseModal.classList.add('hidden');
  isPlaying = true;
};

pauseRestartBtn.onclick = () => {
  pauseModal.classList.add('hidden');
  resetGame(gameMode);
  isGameOver = false;
  isPlaying = true;
};

pauseHomeBtn.onclick = () => {
  isPlaying = false;
  pauseModal.classList.add('hidden');
  homeScreen.classList.remove('hidden');
  topGamePanel.classList.add('hidden');
  stopMissionTimer();
};

infoBtn.onclick = () => infoModal.classList.remove('hidden');
closeInfo.onclick = () => infoModal.classList.add('hidden');

homeSettingsBtn.onclick = () => settingsModal.classList.remove('hidden');
closeSettings.onclick = () => settingsModal.classList.add('hidden');
shopBtn.onclick = () => { updateShopUI(); shopModal.classList.remove('hidden'); };
closeShop.onclick = () => shopModal.classList.add('hidden');
skinsBtn.onclick = () => skinsModal.classList.remove('hidden');
closeSkins.onclick = () => skinsModal.classList.add('hidden');
achievementsBtn.onclick = () => achievementsModal.classList.remove('hidden');
closeAchievements.onclick = () => achievementsModal.classList.add('hidden');

soundToggleBtn.onclick = () => {
  soundEnabled = !soundEnabled;
  updateLanguage(currentLang);
};

homeBtn.onclick = () => {
  isPlaying = false;
  homeScreen.classList.remove('hidden');
  topGamePanel.classList.add('hidden');
  settingsModal.classList.add('hidden');
  shopModal.classList.add('hidden');
  stopMissionTimer();
};

restartBtn.onclick = () => {
  settingsModal.classList.add('hidden');
  homeScreen.classList.add('hidden');
  topGamePanel.classList.remove('hidden');
  resetGame(gameMode);
  isGameOver = false;
  isPlaying = true;
};

resumeBtn.onclick = () => {
  if (isGameOver) { resetGame(gameMode); isGameOver = false; }
  homeScreen.classList.add('hidden');
  topGamePanel.classList.remove('hidden');
  isPlaying = true;
  if (gameMode === 'mission') startMissionTimer();
};

classicModeBtn.onclick = () => {
  gameMode = 'classic';
  resetGame('classic');
  isGameOver = false;
  homeScreen.classList.add('hidden');
  topGamePanel.classList.remove('hidden');
  missionTimerDisplay.classList.add('hidden');
  missionDisplay.classList.add('hidden');
  stopMissionTimer();
  isPlaying = true;
};

missionModeBtn.onclick = () => {
  gameMode = 'mission';
  resetGame('mission');
  isGameOver = false;
  homeScreen.classList.add('hidden');
  topGamePanel.classList.remove('hidden');
  missionTimerDisplay.classList.remove('hidden');
  missionDisplay.classList.remove('hidden');
  isPlaying = true;
  startMissionTimer();
};

diffBtns.forEach(btn => {
  btn.onclick = () => {
    diffBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    difficulty = btn.dataset.diff;
    settingsModal.classList.add('hidden');
  };
});

// Dinamik Joystik
const dynamicJoystick = document.getElementById('dynamicJoystick');
const joystickStick = document.getElementById('joystickStick');
let activeTouchId = null;
let joystickCenterX = 0;
let joystickCenterY = 0;

window.addEventListener('touchstart', (e) => {
  if (!isPlaying) return;
  if (e.target.closest('button') || e.target.closest('.modal')) return;

  const touch = e.changedTouches[0];
  activeTouchId = touch.identifier;
  joystickCenterX = touch.clientX;
  joystickCenterY = touch.clientY;

  dynamicJoystick.style.left = `${joystickCenterX}px`;
  dynamicJoystick.style.top = `${joystickCenterY}px`;
  dynamicJoystick.classList.remove('hidden');
  joystickStick.style.transform = `translate(0px, 0px)`;
}, { passive: false });

window.addEventListener('touchmove', (e) => {
  if (activeTouchId === null || !isPlaying) return;

  for (let i = 0; i < e.touches.length; i++) {
    const touch = e.touches[i];
    if (touch.identifier === activeTouchId) {
      e.preventDefault();
      let deltaX = touch.clientX - joystickCenterX;
      let deltaY = touch.clientY - joystickCenterY;
      const maxDistance = 35;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance > maxDistance) {
        deltaX = (deltaX / distance) * maxDistance;
        deltaY = (deltaY / distance) * maxDistance;
      }

      joystickStick.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      if(snake && snake.body && snake.body[0]){
        mouse.x = Math.max(30, Math.min(canvas.width - 30, snake.body[0].x + deltaX * 2.2));
        mouse.y = Math.max(30, Math.min(canvas.height - 30, snake.body[0].y + deltaY * 2.2));
      }
      break;
    }
  }
}, { passive: false });

window.addEventListener('touchend', (e) => {
  if (activeTouchId === null) return;
  for (let i = 0; i < e.changedTouches.length; i++) {
    if (e.changedTouches[i].identifier === activeTouchId) {
      activeTouchId = null;
      dynamicJoystick.classList.add('hidden');
      break;
    }
  }
});

const colors = ['#00FFCC', '#FF007F', '#9D00FF', '#00E5FF', '#76FF03', '#FFEA00', '#FF3D00'];

let currentScore = 0;
let highScore = localStorage.getItem('snake_high_score') || 0;

let shieldExpiryTime = 0;
let speedExpiryTime = 0;
let slowExpiryTime = 0;
let magnetExpiryTime = 0;

let lastBonusSpawnTime = Date.now();
let activeBonuses = [];
let particles = [];

let specialCoins = [];
let lastSpecialCoinSpawnTime = Date.now();

let snake = createSnake();
let currentLevel = 1;
let previousLevel = 1;

let comboCount = 0;
let lastFoodEatTime = 0;

let gameStartTime = Date.now();
let spawnedSnakeMilestones = [];

let missionTimeLeft = 60;
let missionInterval = null;
let currentMission = null;
let missionTarget = 0;
let missionCurrentProgress = 0;
let usedMissionTypes = [];

const missionPool = [
  { type: 'eat_count', textUz: 'ta meva yig\'!', textRu: 'фруктов съешь!', textEn: 'fruits to eat!' },
  { type: 'score_gain', textUz: 'ochko to\'pla!', textRu: 'очков набрать!', textEn: 'score to gain!' },
  { type: 'avoid_bombs', textUz: 'soniya davomida portlashdan saqlan!', textRu: 'сек. без взрывов!', textEn: 'secs without bombs!' }
];

function generateMission() {
  if (usedMissionTypes.length >= missionPool.length) {
    usedMissionTypes = [];
  }

  let availableMissions = missionPool.filter(m => !usedMissionTypes.includes(m.type));
  let baseMission = availableMissions[Math.floor(Math.random() * availableMissions.length)];
  usedMissionTypes.push(baseMission.type);

  if (baseMission.type === 'eat_count') {
    missionTarget = 6 + (currentLevel * 2);
    currentMission = { type: 'eat_count', target: missionTarget, desc: `${missionTarget} ${baseMission.textUz}` };
  } else if (baseMission.type === 'score_gain') {
    missionTarget = 15 + (currentLevel * 10);
    currentMission = { type: 'score_gain', target: missionTarget, desc: `${missionTarget} ${baseMission.textUz}` };
  } else if (baseMission.type === 'avoid_bombs') {
    missionTarget = 10 + (currentLevel * 5);
    currentMission = { type: 'avoid_bombs', target: missionTarget, desc: `${missionTarget} ${baseMission.textUz}` };
  }

  missionCurrentProgress = 0;
  updateMissionDisplay();
}

function updateMissionDisplay() {
  if (!currentMission) return;
  missionDisplay.classList.remove('hidden');
  missionText.innerText = `${currentMission.desc} (${missionCurrentProgress}/${missionTarget})`;
}

function startMissionTimer() {
  stopMissionTimer();
  missionTimeLeft = 60;
  missionSeconds.innerText = missionTimeLeft;
  generateMission();

  missionInterval = setInterval(() => {
    if (!isPlaying) return;
    missionTimeLeft--;
    missionSeconds.innerText = missionTimeLeft;

    if (currentMission && currentMission.type === 'avoid_bombs') {
      missionCurrentProgress++;
      updateMissionDisplay();
      if (missionCurrentProgress >= missionTarget) {
        completeMission();
      }
    }

    if (missionTimeLeft <= 0) {
      stopMissionTimer();
      triggerGameOver();
    }
  }, 1000);
}

function stopMissionTimer() {
  if (missionInterval) {
    clearInterval(missionInterval);
    missionInterval = null;
  }
}

function completeMission() {
  stopMissionTimer();
  isPlaying = false;
  playSound(1200, 2000, 'sine', 0.4);
  
  levelBannerTitle.innerText = `${currentLevel}-MISSIYA`;
  levelBannerText.innerText = "MUVAFFAQIYATLI BAJARILDI! 🚀";
  levelBanner.classList.remove('hidden');

  setTimeout(() => {
    levelBanner.classList.add('hidden');
    currentLevel++;
    resetGame('mission');
    isPlaying = true;
    startMissionTimer();
  }, 2000);
}

function triggerGameOver() {
  isPlaying = false;
  isGameOver = true;
  stopMissionTimer();
  playSound(250, 80, 'sawtooth', 0.4);
  
  levelBannerTitle.innerText = "O'YIN TUGADI!";
  levelBannerText.innerText = "Siz mag'lub bo'ldingiz!";
  levelBanner.classList.remove('hidden');

  setTimeout(() => {
    levelBanner.classList.add('hidden');
    homeScreen.classList.remove('hidden');
    topGamePanel.classList.add('hidden');
  }, 1500);
}

let obstacles = [];
function initObstacles() {
  obstacles = [
    { x: canvas.width / 4, y: canvas.height / 3, width: 120, height: 16, vx: 1.5, vy: 0 },
    { x: (canvas.width / 4) * 3, y: (canvas.height / 3) * 2, width: 16, height: 120, vx: 0, vy: 1.2 }
  ];
}

let bossSnake = null;
function checkBossSpawn() {
  if (gameMode === 'classic' && currentScore >= 40 && !bossSnake) {
    let body = [];
    for (let i = 0; i < 20; i++) body.push({ x: 100, y: 100 });
    bossSnake = { body: body, segmentRadius: 22, speed: 1.5 };
  }
}

function createSnake() {
  return { body: [], length: 12, segmentRadius: 13, color: '#00FFCC', speed: 0.045 };
}

function initSnakeBody() {
  snake = createSnake();
  for (let i = 0; i < 12; i++) {
    snake.body.push({ x: canvas.width / 2, y: canvas.height / 2 });
  }
}
initSnakeBody();

let foods = [];
for (let i = 0; i < 5; i++) foods.push(createFood());

function createFood() {
  const margin = 80;
  const x = margin + Math.random() * (canvas.width - margin * 2);
  const y = margin + Math.random() * (canvas.height - margin * 2);
  const color = colors[Math.floor(Math.random() * colors.length)];
  let body = [];
  for (let i = 0; i < 5; i++) body.push({ x: x, y: y });
  return { x: x, y: y, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, radius: 13, color: color, body: body, blinkTimer: Math.floor(Math.random() * 100) };
}

let blackSnakes = [];
function createBlackSnake() {
  const margin = 100;
  const startX = Math.random() < 0.5 ? margin : canvas.width - margin;
  const startY = Math.random() < 0.5 ? margin : canvas.height - margin;
  let body = [];
  for (let i = 0; i < 18; i++) body.push({ x: startX, y: startY });
  return { body: body, segmentRadius: 18, eatenCount: 0 };
}

function spawnBonus() {
  const generalTypes = ['yulduz', 'yulduz', 'zashita', 'zashita', 'bomba', 'tezlik', 'sekin', 'magnit'];
  const sizeTypes = ['kichrayish', 'kattalashish'];
  const margin = 100;
  
  const type1 = generalTypes[Math.floor(Math.random() * generalTypes.length)];
  activeBonuses.push({
    x: margin + Math.random() * (canvas.width - margin * 2),
    y: margin + Math.random() * (canvas.height - margin * 2),
    type: type1, radius: 16, expiryTime: Date.now() + 6000
  });

  const type2 = sizeTypes[Math.floor(Math.random() * sizeTypes.length)];
  activeBonuses.push({
    x: margin + Math.random() * (canvas.width - margin * 2),
    y: margin + Math.random() * (canvas.height - margin * 2),
    type: type2, radius: 16, expiryTime: Date.now() + 6000
  });
}

function createExplosion(x, y, color) {
  if (particles.length > 40) return;
  for (let i = 0; i < 8; i++) {
    particles.push({ x: x, y: y, vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5, radius: Math.random() * 2 + 2, color: color, alpha: 1 });
  }
}

function resetGame(mode) {
  currentScore = 0;
  scoreElement.innerText = currentScore;
  shieldExpiryTime = 0; speedExpiryTime = 0; slowExpiryTime = 0; magnetExpiryTime = 0;
  activeBonuses = []; particles = []; specialCoins = [];
  lastBonusSpawnTime = Date.now();
  lastSpecialCoinSpawnTime = Date.now();
  gameStartTime = Date.now();
  spawnedSnakeMilestones = [];
  
  initSnakeBody();
  mouse.x = canvas.width / 2;
  mouse.y = canvas.height / 2;

  blackSnakes = []; foods = []; bossSnake = null;
  for (let i = 0; i < 5; i++) foods.push(createFood());
  initObstacles();

  if (mode === 'mission') {
    startMissionTimer();
  } else {
    stopMissionTimer();
  }
}

function checkAchievements() {
  const t = translations[currentLang];
  const a1 = document.getElementById('ach1');
  const a2 = document.getElementById('ach2');
  const a3 = document.getElementById('ach3');

  if (a1) a1.innerText = (currentScore >= 10 ? "✅ " : "🔒 ") + t.ach1_text;
  if (a2) a2.innerText = (currentScore >= 50 ? "✅ " : "🔒 ") + t.ach2_text;
  if (a3) a3.innerText = (currentScore >= 100 ? "✅ " : "🔒 ") + t.ach3_text;
}

function animate() {
  const now = Date.now();
  const t = translations[currentLang];

  if (pauseModal.classList.contains('hidden') === false) {
    requestAnimationFrame(animate);
    return;
  }

  if (currentScore > 100000) {
    currentScore = 100000;
  }

  if (gameMode === 'classic') {
    checkBossSpawn();
  }

  if (isPlaying) {
    let elapsedSeconds = Math.floor((now - gameStartTime) / 1000);
    const milestones = [20, 30, 40, 50, 60];

    milestones.forEach(m => {
      if (elapsedSeconds >= m && !spawnedSnakeMilestones.includes(m)) {
        spawnedSnakeMilestones.push(m);
        blackSnakes.push(createBlackSnake());
      }
    });

    if (elapsedSeconds > 60) {
      let intervalCount = Math.floor((elapsedSeconds - 60) / 60);
      let key = `interval_${intervalCount}`;
      if (!spawnedSnakeMilestones.includes(key)) {
        spawnedSnakeMilestones.push(key);
        blackSnakes.push(createBlackSnake());
      }
    }
  }

  let speedMultiplier = 1;
  if (now < speedExpiryTime && isPlaying) speedMultiplier = 1.6;
  if (now < slowExpiryTime && isPlaying) speedMultiplier = 0.6;

  let scoreForSpeed = isPlaying ? currentScore : 0;
  let currentSpeed = (snake.speed + (scoreForSpeed * 0.0004)) * speedMultiplier;
  if (currentSpeed > 0.1) currentSpeed = 0.1;
  if (currentSpeed < 0.02) currentSpeed = 0.02;

  let bgGradientColor = '#0b0b14';
  if (currentLevel === 2) bgGradientColor = '#120b1c';
  else if (currentLevel === 3) bgGradientColor = '#1a0b0b';
  else if (currentLevel >= 4) bgGradientColor = '#05181a';

  if (difficulty === 'super') bgGradientColor = '#05020a';

  levelDisplay.innerHTML = `<span>${t.level}</span>: ${currentLevel}`;

  ctx.fillStyle = bgGradientColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (gameMode === 'mission' && isPlaying) {
    obstacles.forEach(obs => {
      obs.x += obs.vx;
      obs.y += obs.vy;
      if (obs.x < 50 || obs.x > canvas.width - 50 - obs.width) obs.vx *= -1;
      if (obs.y < 50 || obs.y > canvas.height - 50 - obs.height) obs.vy *= -1;
    });

    obstacles.forEach(obs => {
      ctx.fillStyle = '#FF3D00';
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
  }

  ctx.strokeStyle = difficulty === 'super' ? 'rgba(255, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  const gridSize = 60;
  for (let x = 0; x < canvas.width; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
  for (let y = 0; y < canvas.height; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.vx; p.y += p.vy; p.alpha -= 0.04;
    if (p.alpha <= 0) { particles.splice(i, 1); continue; }
    ctx.save(); ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }

  let activeTimerText = ""; let remainingTime = 0;
  if (isPlaying && now < shieldExpiryTime) { activeTimerText = t.shield; remainingTime = Math.ceil((shieldExpiryTime - now) / 1000); }
  else if (isPlaying && now < speedExpiryTime) { activeTimerText = t.speed; remainingTime = Math.ceil((speedExpiryTime - now) / 1000); }
  else if (isPlaying && now < slowExpiryTime) { activeTimerText = t.slow; remainingTime = Math.ceil((slowExpiryTime - now) / 1000); }
  else if (isPlaying && now < magnetExpiryTime) { activeTimerText = t.magnet; remainingTime = Math.ceil((magnetExpiryTime - now) / 1000); }

  if (remainingTime > 0) {
    topCenterTimer.classList.remove('hidden');
    timerLabel.innerText = activeTimerText;
    shieldSeconds.innerText = remainingTime;
  } else {
    topCenterTimer.classList.add('hidden');
  }

  if (isPlaying && now - lastBonusSpawnTime > 5000) {
    spawnBonus();
    lastBonusSpawnTime = now;
  }

  if (isPlaying && now - lastSpecialCoinSpawnTime > 8000) {
    const margin = 80;
    specialCoins.push({
      x: margin + Math.random() * (canvas.width - margin * 2),
      y: margin + Math.random() * (canvas.height - margin * 2),
      radius: 18,
      expiryTime: now + 3000
    });
    lastSpecialCoinSpawnTime = now;
  }

  const head = snake.body[0];
  head.x += (mouse.x - head.x) * currentSpeed;
  head.y += (mouse.y - head.y) * currentSpeed;
  head.x = Math.max(15, Math.min(canvas.width - 15, head.x));
  head.y = Math.max(15, Math.min(canvas.height - 15, head.y));

  for (let i = 1; i < snake.body.length; i++) {
    const prev = snake.body[i - 1]; const curr = snake.body[i];
    curr.x += (prev.x - curr.x) * 0.55; curr.y += (prev.y - curr.y) * 0.55;
  }

  for (let i = specialCoins.length - 1; i >= 0; i--) {
    let sc = specialCoins[i];
    if (now > sc.expiryTime) {
      specialCoins.splice(i, 1);
      continue;
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(sc.x, sc.y, sc.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#FF0000';
    if (useShadows) {
      ctx.shadowColor = '#FF0000';
      ctx.shadowBlur = 15;
    }
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Segoe UI';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⭐', sc.x, sc.y);
    ctx.restore();

    const distToSpecial = Math.hypot(head.x - sc.x, head.y - sc.y);
    if (distToSpecial < snake.segmentRadius + sc.radius) {
      createExplosion(sc.x, sc.y, '#FF0000');
      playSound(1400, 2200, 'triangle', 0.25);
      totalCoins += 5;
      localStorage.setItem('snake_coins', totalCoins);
      updateShopUI();
      specialCoins.splice(i, 1);
    }
  }

  if (gameMode === 'mission' && isPlaying) {
    obstacles.forEach(obs => {
      if (head.x > obs.x && head.x < obs.x + obs.width && head.y > obs.y && head.y < obs.y + obs.height) {
        if (now > shieldExpiryTime) {
          createExplosion(head.x, head.y, '#FF3D00');
          triggerGameOver();
          return;
        }
      }
    });
  }

  if (isPlaying) {
    for (let i = activeBonuses.length - 1; i >= 0; i--) {
      let b = activeBonuses[i];
      if (now > b.expiryTime) { activeBonuses.splice(i, 1); continue; }
      ctx.save(); ctx.beginPath(); ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      let bColor = '#FFD700';
      if (b.type === 'zashita') bColor = '#00FFFF';
      else if (b.type === 'tezlik') bColor = '#FF9900';
      else if (b.type === 'sekin') bColor = '#3399FF';
      else if (b.type === 'bomba') bColor = '#FF0000';
      else if (b.type === 'kichrayish') bColor = '#FF0055';
      else if (b.type === 'kattalashish') bColor = '#00FF55';
      else if (b.type === 'magnit') bColor = '#9D00FF';
      
      ctx.fillStyle = bColor;
      if (useShadows) { ctx.shadowColor = bColor; ctx.shadowBlur = 10; }
      ctx.fill(); ctx.closePath();

      ctx.fillStyle = '#000'; ctx.font = 'bold 12px Segoe UI'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      let symbol = '⭐';
      if (b.type === 'zashita') { symbol = '🛡️'; }
      else if (b.type === 'tezlik') symbol = '⚡';
      else if (b.type === 'sekin') symbol = '❄️';
      else if (b.type === 'bomba') symbol = '💣';
      else if (b.type === 'kichrayish') symbol = '📉';
      else if (b.type === 'kattalashish') symbol = '📈';
      else if (b.type === 'magnit') symbol = '🧲';
      ctx.fillText(symbol, b.x, b.y); ctx.restore();

      const distToBonus = Math.hypot(head.x - b.x, head.y - b.y);
      if (distToBonus < snake.segmentRadius + b.radius) {
        createExplosion(b.x, b.y, bColor);
        playSound(800, 1400, 'triangle', 0.2);
        
        if (b.type === 'yulduz') {
          currentScore += (10 * currentLevel);
        }
        else if (b.type === 'zashita') shieldExpiryTime = now + 8000;
        else if (b.type === 'tezlik') speedExpiryTime = now + 7000;
        else if (b.type === 'sekin') slowExpiryTime = now + 7000;
        else if (b.type === 'magnit') magnetExpiryTime = now + 8000;
        else if (b.type === 'bomba') { 
          currentScore -= 15; 
          if (currentScore < 0) currentScore = 0; 
          playSound(200, 50, 'sawtooth', 0.3); 
        }
        else if (b.type === 'kichrayish') snake.segmentRadius = 4.5;
        else if (b.type === 'kattalashish') snake.segmentRadius = 36;
        
        scoreElement.innerText = currentScore;
        checkAchievements();
        if (currentScore > highScore) { highScore = currentScore; highScoreElement.innerText = highScore; localStorage.setItem('snake_high_score', highScore); }
        activeBonuses.splice(i, 1);
      }
    }
  }

  foods.forEach((food, index) => {
    if (isPlaying && now < magnetExpiryTime) {
      const dist = Math.hypot(head.x - food.x, head.y - food.y);
      if (dist < 250) {
        food.x += (head.x - food.x) * 0.08;
        food.y += (head.y - food.y) * 0.08;
      }
    }

    const distToHead = Math.hypot(head.x - food.x, head.y - food.y);
    let escapeRadius = difficulty === 'super' ? 320 : 160;
    let escapeSpeed = difficulty === 'super' ? 8.5 : 3.5;

    if (distToHead < escapeRadius && !(now < magnetExpiryTime)) {
      const angle = Math.atan2(food.y - head.y, food.x - head.x);
      food.vx = Math.cos(angle) * escapeSpeed; food.vy = Math.sin(angle) * escapeSpeed;
    } else if (!(now < magnetExpiryTime)) {
      food.vx += (Math.random() - 0.5) * 0.2; food.vy += (Math.random() - 0.5) * 0.2;
      food.vx = Math.max(-2, Math.min(2, food.vx)); food.vy = Math.max(-2, Math.min(2, food.vy));
    }

    if (!(now < magnetExpiryTime)) {
      food.x += food.vx; food.y += food.vy;
    }
    const padding = 20;
    if (food.x < padding) { food.x = padding; food.vx = Math.abs(food.vx); }
    if (food.x > canvas.width - padding) { food.x = canvas.width - padding; food.vx = -Math.abs(food.vx); }
    if (food.y < padding) { food.y = padding; food.vy = Math.abs(food.vy); }
    if (food.y > canvas.height - padding) { food.y = canvas.height - padding; food.vy = -Math.abs(food.vy); }

    food.body[0].x = food.x; food.body[0].y = food.y;
    for (let j = 1; j < food.body.length; j++) {
      const p = food.body[j - 1]; const c = food.body[j];
      c.x += (p.x - c.x) * 0.4; c.y += (p.y - c.y) * 0.4;
    }

    if (distToHead < snake.segmentRadius + food.radius) {
      if (isPlaying) {
        playSound(600, 900, 'sine', 0.1);

        let timeSinceLastEat = now - lastFoodEatTime;
        lastFoodEatTime = now;

        if (timeSinceLastEat < 2000) {
          comboCount++;
          if (comboCount > 5) comboCount = 5;
        } else {
          comboCount = 1;
        }

        if (comboCount >= 2) {
          comboDisplay.classList.remove('hidden');
          comboText.innerText = `${comboCount}x COMBO!`;
        } else {
          comboDisplay.classList.add('hidden');
        }

        let pointsEarned = currentLevel * comboCount;
        currentScore += pointsEarned;
        
        if (currentScore > 100000) currentScore = 100000;
        scoreElement.innerText = currentScore;
        checkAchievements();

        if (currentScore > highScore) { highScore = currentScore; highScoreElement.innerText = highScore; localStorage.setItem('snake_high_score', highScore); }

        if (gameMode === 'mission' && currentMission) {
          if (currentMission.type === 'eat_count') {
            missionCurrentProgress++;
            updateMissionDisplay();
            if (missionCurrentProgress >= missionTarget) completeMission();
          } else if (currentMission.type === 'score_gain') {
            missionCurrentProgress += pointsEarned;
            updateMissionDisplay();
            if (missionCurrentProgress >= missionTarget) completeMission();
          }
        }

        if (snake.body.length < 250) {
          snake.length += 2;
          for (let k = 0; k < 2; k++) {
            const last = snake.body[snake.body.length - 1];
            snake.body.push({ x: last.x, y: last.y });
          }
        }
      }
      createExplosion(food.x, food.y, food.color);
      foods[index] = createFood();
    }
  });

  const baseDiffSpeed = diffSpeeds[difficulty];
  const isSuperDark = difficulty === 'super';

  blackSnakes.forEach((bs) => {
    const bHead = bs.body[0];
    const moveAngle = Math.atan2(head.y - bHead.y, head.x - bHead.x);
    let speedMult = 1;
    if (currentLevel === 2) speedMult = 1.3;
    if (currentLevel === 3) speedMult = 1.6; 
    if (currentLevel >= 4) speedMult = 2.0;

    const targetX = head.x + Math.cos(moveAngle + (bs.eatenCount * 0.5)) * 140;
    const targetY = head.y + Math.sin(moveAngle + (bs.eatenCount * 0.5)) * 140;
    const angleToTarget = Math.atan2(targetY - bHead.y, targetX - bHead.x);

    bHead.x += Math.cos(angleToTarget) * (baseDiffSpeed * speedMult);
    bHead.y += Math.sin(angleToTarget) * (baseDiffSpeed * speedMult);

    for (let i = 1; i < bs.body.length; i++) {
      const p = bs.body[i - 1]; const c = bs.body[i];
      c.x += (p.x - c.x) * 0.4; c.y += (p.y - c.y) * 0.4;
    }

    if (isPlaying) {
      for (let i = 0; i < bs.body.length; i++) {
        const dist = Math.hypot(head.x - bs.body[i].x, head.y - bs.body[i].y);
        if (dist < snake.segmentRadius + bs.segmentRadius) {
          if (now > shieldExpiryTime) {
            createExplosion(head.x, head.y, '#FF0000');
            triggerGameOver();
            return;
          }
        }
      }
    }
  });

  if (bossSnake && isPlaying && gameMode === 'classic') {
    const bHead = bossSnake.body[0];
    const bAngle = Math.atan2(head.y - bHead.y, head.x - bHead.x);
    bHead.x += Math.cos(bAngle) * bossSnake.speed;
    bHead.y += Math.sin(bAngle) * bossSnake.speed;

    for (let i = 1; i < bossSnake.body.length; i++) {
      const p = bossSnake.body[i - 1]; const c = bossSnake.body[i];
      c.x += (p.x - c.x) * 0.5; c.y += (p.y - c.y) * 0.5;
    }

    for (let j = bossSnake.body.length - 1; j >= 0; j--) {
      const seg = bossSnake.body[j];
      const r = Math.max(6, bossSnake.segmentRadius * (1 - j / bossSnake.body.length));
      ctx.beginPath(); ctx.arc(seg.x, seg.y, r, 0, Math.PI * 2);
      ctx.fillStyle = '#9D00FF';
      if (useShadows) { ctx.shadowBlur = 10; ctx.shadowColor = '#FF007F'; }
      ctx.fill(); ctx.shadowBlur = 0;
    }

    for (let i = 0; i < bossSnake.body.length; i++) {
      const dist = Math.hypot(head.x - bossSnake.body[i].x, head.y - bossSnake.body[i].y);
      if (dist < snake.segmentRadius + bossSnake.segmentRadius) {
        if (now > shieldExpiryTime) {
          createExplosion(head.x, head.y, '#9D00FF');
          triggerGameOver();
          return;
        }
      }
    }
  }

  foods.forEach((food) => {
    food.blinkTimer++;
    const isEyesOpen = food.blinkTimer % 100 > 15;
    for (let j = food.body.length - 1; j >= 0; j--) {
      const seg = food.body[j];
      const r = Math.max(3, food.radius * (1 - j / food.body.length));
      ctx.beginPath(); ctx.arc(seg.x, seg.y, r, 0, Math.PI * 2);
      ctx.fillStyle = food.color;
      ctx.fill();
    }
    if (isEyesOpen) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(food.x - 4, food.y - 3, 3.5, 0, Math.PI * 2); ctx.arc(food.x + 4, food.y - 3, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.beginPath(); ctx.arc(food.x - 4, food.y - 3, 1.5, 0, Math.PI * 2); ctx.arc(food.x + 4, food.y - 3, 1.5, 0, Math.PI * 2); ctx.fill();
    }
  });

  blackSnakes.forEach((bs) => {
    for (let j = bs.body.length - 1; j >= 0; j--) {
      const seg = bs.body[j];
      const r = Math.max(5, bs.segmentRadius * (1 - j / (bs.body.length * 1.2)));
      ctx.beginPath(); ctx.arc(seg.x, seg.y, r, 0, Math.PI * 2);
      ctx.fillStyle = isSuperDark ? '#150000' : '#222233';
      ctx.fill();
    }
    const bHead = bs.body[0];
    const bAngle = Math.atan2(head.y - bHead.y, head.x - bHead.x);
    ctx.fillStyle = '#ff0000'; 
    ctx.beginPath();
    ctx.arc(bHead.x + Math.cos(bAngle - 0.5) * (bs.segmentRadius * 0.5), bHead.y + Math.sin(bAngle - 0.5) * (bs.segmentRadius * 0.5), 3.5, 0, Math.PI * 2);
    ctx.arc(bHead.x + Math.cos(bAngle + 0.5) * (bs.segmentRadius * 0.5), bHead.y + Math.sin(bAngle + 0.5) * (bs.segmentRadius * 0.5), 3.5, 0, Math.PI * 2);
    ctx.fill(); 
  });

  let snakeFillColor = '#00FFCC';
  if (currentSkin === 'fire') snakeFillColor = '#FF3D00';
  else if (currentSkin === 'gold') snakeFillColor = '#FFD700';
  else if (currentSkin === 'rainbow') snakeFillColor = colors[Math.floor(Date.now() / 200) % colors.length];
  else if (currentSkin === 'cyber') snakeFillColor = '#00E5FF';
  else if (currentSkin === 'matrix') snakeFillColor = '#76FF03';
  else if (currentSkin === 'goldfire') snakeFillColor = '#FFEA00';
  else if (currentSkin === 'galaxy') snakeFillColor = '#9D00FF';

  let isShieldActive = isPlaying && now < shieldExpiryTime;
  for (let i = snake.body.length - 1; i > 0; i--) {
    const seg = snake.body[i];
    const r = Math.max(2, snake.segmentRadius * (1 - i / (snake.body.length * 1.3)));
    ctx.beginPath(); ctx.arc(seg.x, seg.y, r, 0, Math.PI * 2);
    ctx.fillStyle = snakeFillColor;
    if (useShadows) {
      ctx.shadowBlur = isShieldActive ? 15 : 8;
      ctx.shadowColor = isShieldActive ? '#00FFFF' : snakeFillColor;
    }
    ctx.fill(); ctx.shadowBlur = 0;
  }

  ctx.beginPath();
  ctx.arc(head.x, head.y, snake.segmentRadius + 2, 0, Math.PI * 2);
  ctx.fillStyle = snakeFillColor; 
  if (useShadows) {
    ctx.shadowBlur = isShieldActive ? 20 : 12;
    ctx.shadowColor = isShieldActive ? '#00FFFF' : snakeFillColor;
  }
  ctx.fill(); 
  ctx.shadowBlur = 0;

  const angle = Math.atan2(mouse.y - head.y, mouse.x - head.x);
  const eyeOffset = snake.segmentRadius * 0.45;
  const eyeRadius = Math.max(2, snake.segmentRadius * 0.28);
  const pupilRadius = Math.max(1, snake.segmentRadius * 0.14);

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(head.x + Math.cos(angle - 0.5) * eyeOffset, head.y + Math.sin(angle - 0.5) * eyeOffset, eyeRadius, 0, Math.PI * 2);
  ctx.arc(head.x + Math.cos(angle + 0.5) * eyeOffset, head.y + Math.sin(angle + 0.5) * eyeOffset, eyeRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(head.x + Math.cos(angle - 0.5) * eyeOffset + Math.cos(angle) * 1.5, head.y + Math.sin(angle - 0.5) * eyeOffset + Math.sin(angle) * 1.5, pupilRadius, 0, Math.PI * 2);
  ctx.arc(head.x + Math.cos(angle + 0.5) * eyeOffset + Math.cos(angle) * 1.5, head.y + Math.sin(angle + 0.5) * eyeOffset + Math.sin(angle) * 1.5, pupilRadius, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(animate);
}

animate();