// =============================================================================
// TOÁN LỚP 9 – JS XỬ LÝ CẤP ĐỘ & THỐNG KÊ
// Chuẩn HSTAI 777 – Không backend – Lưu cục bộ – Rủi ro = 0
// =============================================================================

// === THỐNG KÊ TIẾN BỘ (lưu trong localStorage) ===
function getProgress() {
  return {
    lessons: parseInt(localStorage.getItem('toan9_lessons') || '0'),
    exercises: parseInt(localStorage.getItem('toan9_exercises') || '0')
  };
}

function incrementLesson() {
  let count = getProgress().lessons + 1;
  localStorage.setItem('toan9_lessons', count.toString());
  updateProgressDisplay();
}

function incrementExercise() {
  let count = getProgress().exercises + 1;
  localStorage.setItem('toan9_exercises', count.toString());
  updateProgressDisplay();
}

function updateProgressDisplay() {
  const prog = getProgress();
  const lessonEl = document.getElementById('lesson-count');
  const exerciseEl = document.getElementById('exercise-count');
  if (lessonEl) lessonEl.textContent = prog.lessons;
  if (exerciseEl) exerciseEl.textContent = prog.exercises;
}

// === ĐIỀU HƯỚNG ===
function goTo(url) {
  // Tự động tăng tiến bộ nếu là bài học hoặc đề
  if (url.includes('/levels/')) {
    incrementLesson();
  } else if (url.includes('/exercises/')) {
    incrementExercise();
  }

  // Điều hướng
  if (url.startsWith('http')) {
    window.location.href = url;
  } else {
    window.location.href = './' + url;
  }
}

// === DARK MODE ===
function initDarkMode() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const isDark = localStorage.getItem('theme') === 'dark' || 
                 (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  if (isDark) {
    document.body.classList.add('dark-mode');
    toggle.textContent = '☀️';
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const nowDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    toggle.textContent = nowDark ? '☀️' : '🌙';
  });
}

// === SERVICE WORKER ===
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        .catch(err => console.warn('SW registration failed:', err));
    });
  }
}

// === KHỞI TẠO ===
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  registerServiceWorker();
  updateProgressDisplay();

  // Tự động gắn sự kiện cho các nút "Bắt đầu học" (nếu có)
  document.querySelectorAll('[data-level]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const level = e.target.getAttribute('data-level');
      goTo(`levels/level-${level}/`);
    });
  });
});