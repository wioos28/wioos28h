// 📌 Toggle Menu
function toggleMenu() {
  document.getElementById('infoMenu').classList.toggle('hidden');
}

// 📌 Đồng hồ
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// 📌 Lời chào
function updateGreeting() {
  const hour = new Date().getHours();
  const greeting = document.getElementById("greeting");
  greeting.textContent =
    hour < 12 ? "Chào buổi sáng!" :
    hour < 18 ? "Chào buổi chiều!" :
    "Chào buổi tối!";
}
updateGreeting();
setInterval(updateGreeting, 60000);

// 📌 Hiệu ứng gõ chữ
const typingText = "Tôi là Huân. Rất vui được gặp bạn!";
let i = 0;
function typeEffect() {
  if (i < typingText.length) {
    document.getElementById("typing-text").textContent += typingText.charAt(i);
    i++;
    setTimeout(typeEffect, 100);
  } else {
    // reset để gõ lại
    setTimeout(() => {
      document.getElementById("typing-text").textContent = "";
      i = 0;
      typeEffect();
    }, 2000);
  }
}
typeEffect();

// 📌 Toggle Giao diện
function toggleTheme() {
  document.body.classList.toggle('light-mode');
}

// 📌 Nhạc nền
let musicPlaying = false;
function toggleMusic() {
  const playerContainer = document.getElementById("youtube-player-container");
  musicPlaying = !musicPlaying;
  playerContainer.style.display = musicPlaying ? "block" : "none";
}

// 📌 Weather API
async function fetchWeather() {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    // Dữ liệu cơ bản
    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;
    const hi = data.daily.temperature_2m_max[0];
    const lo = data.daily.temperature_2m_min[0];
    const code = data.current_weather.weathercode;

    // Mô tả thời tiết theo weathercode
    const icons = {
      0: "☀️ Trời quang",
      1: "🌤 Ít mây",
      2: "⛅ Nhiều mây",
      3: "☁️ U ám",
      45: "🌫 Sương mù",
      48: "🌫 Sương mù dày",
      51: "🌦 Mưa phùn nhẹ",
      53: "🌦 Mưa phùn vừa",
      55: "🌧 Mưa phùn to",
      61: "🌧 Mưa nhỏ",
      63: "🌧🌧 Mưa vừa",
      65: "🌧🌧🌧 Mưa to",
      71: "❄️ Tuyết nhẹ",
      73: "❄️❄️ Tuyết vừa",
      75: "❄️❄️❄️ Tuyết to",
      95: "⛈ Dông",
    };

    // Update text đơn giản
    document.getElementById('weather-info').textContent =
      `Hà Nội: ${temp}°C, Gió: ${wind} km/h, ${icons[code] || "Thời tiết khác"}`;

    // Update Weather Card
    document.getElementById('card-temp').textContent = `${temp}°`;
    document.getElementById('card-hilo').textContent = `H:${hi}° L:${lo}°`;
    document.getElementById('card-location').textContent = "Hà Nội, Việt Nam";
    document.getElementById('card-desc').textContent = icons[code] || "Không rõ";
  } catch {
    document.getElementById('weather-info').textContent = 'Không tải được thời tiết.';
    document.getElementById('card-desc').textContent = "Không có dữ liệu";
  }
}
fetchWeather();
setInterval(fetchWeather, 600000); // mỗi 10 phút update

// 📌 Ngày/Đêm
function updateThemeByTime() {
  const hour = new Date().getHours();
  document.body.classList.toggle('nighttime', hour >= 18 || hour < 6);
  document.body.classList.toggle('daytime', hour >= 6 && hour < 18);
}
updateThemeByTime();
setInterval(updateThemeByTime, 60000);

// 📌 Hiển thị mặt trời / mặt trăng
function updateSkyObjects() {
  const hour = new Date().getHours();
  const sun = document.getElementById('sun');
  const moon = document.querySelector('.moon');

  if (hour >= 6 && hour < 18) {
    sun.style.display = 'block';
    moon.style.display = 'none';
  } else {
    sun.style.display = 'none';
    moon.style.display = 'block';
  }
}
updateSkyObjects();
setInterval(updateSkyObjects, 60000);
