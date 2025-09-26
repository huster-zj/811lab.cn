(function () {
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const spinButton = document.getElementById('spinBtn');
  const shuffleButton = document.getElementById('shuffleBtn');
  const addOptionButton = document.getElementById('addOptionBtn');
  const newOptionInput = document.getElementById('newOptionInput');
  const optionListElement = document.getElementById('optionList');
  const importFileInput = document.getElementById('importFile');
  const exportButton = document.getElementById('exportBtn');
  const resetButton = document.getElementById('resetBtn');
  const clearButton = document.getElementById('clearBtn');
  const removeAfterPickCheckbox = document.getElementById('removeAfterPick');
  const spinDurationRange = document.getElementById('spinDuration');
  const spinDurationValue = document.getElementById('spinDurationValue');
  const resultElement = document.getElementById('result');

  const modal = document.getElementById('resultModal');
  const modalPickedText = document.getElementById('modalPickedText');
  const modalOkBtn = document.getElementById('modalOkBtn');

  const localStorageKey = 'draw_food_options_v1';
  const defaultOptions = [
    '兰州拉面',
    '黄焖鸡米饭',
    '沙县小吃',
    '麻辣烫',
    '火锅',
    '螺蛳粉',
    '煎饼果子',
    '水饺',
    '炒饭',
    '盖浇饭',
    '寿司',
    '牛肉面',
    '炒河粉',
    '披萨',
    '炸鸡汉堡',
    '烤冷面',
  ];

  let options = [];
  let isSpinning = false;
  let currentAngle = 0;
  let angularVelocity = 0;
  let animationFrameId = null;

  function setCanvasHighDpi() {
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const displaySize = canvas.clientWidth || 520;
    canvas.width = displaySize * dpr;
    canvas.height = displaySize * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function randomPalette(size) {
    const baseHues = [10, 35, 210, 260, 140, 320];
    const colors = [];
    for (let i = 0; i < size; i++) {
      const hue = baseHues[i % baseHues.length] + (i * 23) % 36;
      const sat = 60 + (i * 7) % 30; // 60-90
      const light = 46 + (i * 5) % 12; // 46-58
      colors.push(`hsl(${hue} ${sat}% ${light}%)`);
    }
    return colors;
  }

  function drawWheel() {
    setCanvasHighDpi();
    const width = canvas.clientWidth || 520;
    const size = Math.min(width, 520);
    const radius = size / 2 - 8;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = (canvas.clientWidth || 520) / 2;
    const centerY = (canvas.clientWidth || 520) / 2;

    const count = Math.max(1, options.length);
    const sliceAngle = (Math.PI * 2) / count;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(currentAngle);

    const colors = randomPalette(count);

    for (let i = 0; i < count; i++) {
      const start = i * sliceAngle;
      const end = start + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();

      const mid = start + sliceAngle / 2;
      ctx.save();
      ctx.rotate(mid);
      ctx.translate(radius * 0.68, 0);
      ctx.rotate(Math.PI / 2);
      ctx.fillStyle = '#111827';
      ctx.font = '14px "Segoe UI", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const text = options[i] || '';
      const clipped = text.length > 16 ? text.slice(0, 15) + '…' : text;
      wrapFillText(ctx, clipped, 0, 0, radius * 0.5, 18);
      ctx.restore();
    }

    // center cap
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, Math.PI * 2);
    ctx.fillStyle = '#0b1220';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,255,255,.12)';
    ctx.stroke();

    ctx.restore();
  }

  function wrapFillText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split('');
    let line = '';
    let lines = [];
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i];
      const metrics = context.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        lines.push(line);
        line = words[i];
      } else {
        line = testLine;
      }
    }
    lines.push(line);
    const totalHeight = (lines.length - 1) * lineHeight;
    for (let i = 0; i < lines.length; i++) {
      context.fillText(lines[i], x, y - totalHeight / 2 + i * lineHeight);
    }
  }

  function spinOnce() {
    if (isSpinning || options.length === 0) return;

    isSpinning = true;
    spinButton.disabled = true;
    resultElement.textContent = '转动中…';

    const durationSec = Number(spinDurationRange.value || 5);
    const maxAngularVelocity = 35 + Math.random() * 25; // deg/s
    const totalRotationDeg = (360 * (4 + Math.floor(Math.random() * 4))) + Math.random() * 360;
    const start = performance.now();

    const startAngle = currentAngle;
    const targetAngle = startAngle + (totalRotationDeg * Math.PI) / 180;

    function animate(now) {
      const elapsed = (now - start) / 1000;
      const t = Math.min(1, elapsed / durationSec);
      const eased = easeOutCubic(t);
      currentAngle = startAngle + (targetAngle - startAngle) * eased;
      drawWheel();
      if (t < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        finishSpin();
      }
    }

    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(animate);
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function finishSpin() {
    isSpinning = false;
    spinButton.disabled = false;

    const count = options.length;
    if (count === 0) {
      resultElement.textContent = '没有可选项';
      return;
    }

    const sliceAngle = (Math.PI * 2) / count;
    const normalized = ((currentAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const indexFromTop = Math.floor(((Math.PI * 1.5 - normalized) % (Math.PI * 2) + (Math.PI * 2)) % (Math.PI * 2) / sliceAngle);
    const winningIndex = (indexFromTop + count) % count;
    const picked = options[winningIndex];
    resultElement.textContent = `结果：${picked}`;
    openModal(picked);

    if (removeAfterPickCheckbox.checked) {
      options.splice(winningIndex, 1);
      persistOptions();
      renderOptionList();
      drawWheel();
    }
  }

  function renderOptionList() {
    optionListElement.innerHTML = '';
    options.forEach((name, idx) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = name;
      const delBtn = document.createElement('button');
      delBtn.textContent = '移除';
      delBtn.addEventListener('click', () => {
        options.splice(idx, 1);
        persistOptions();
        renderOptionList();
        drawWheel();
      });
      li.appendChild(span);
      li.appendChild(delBtn);
      optionListElement.appendChild(li);
    });
  }

  function persistOptions() {
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(options));
    } catch (e) {}
  }

  function loadFromLocalStorage() {
    try {
      const raw = localStorage.getItem(localStorageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.every(x => typeof x === 'string')) {
          options = parsed.filter(x => x.trim().length > 0);
          return true;
        }
      }
    } catch (e) {}
    return false;
  }

  async function loadFromTxt() {
    try {
      const res = await fetch('options.txt', { cache: 'no-cache' });
      if (!res.ok) throw new Error('not ok');
      const text = await res.text();
      const list = text
        .split(/\r?\n/)
        .map(s => s.trim())
        .filter(Boolean);
      if (list.length > 0) {
        options = list;
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  function addOptionFromInput() {
    const value = newOptionInput.value.trim();
    if (!value) return;
    options.push(value);
    newOptionInput.value = '';
    persistOptions();
    renderOptionList();
    drawWheel();
  }

  function shuffleOptions() {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    persistOptions();
    renderOptionList();
    drawWheel();
  }

  function exportAsTxt() {
    const content = options.join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'options.txt';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  }

  function resetToBuiltIn() {
    options = defaultOptions.slice();
    persistOptions();
    renderOptionList();
    drawWheel();
    resultElement.textContent = '已重置为内置列表';
  }

  function clearAll() {
    options = [];
    persistOptions();
    renderOptionList();
    drawWheel();
    resultElement.textContent = '已清空列表';
  }

  function openModal(text) {
    if (!modal) return;
    modalPickedText.textContent = text;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }

  function handleImportFileChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || '');
      const list = text
        .split(/\r?\n/)
        .map(s => s.trim())
        .filter(Boolean);
      if (list.length > 0) {
        options = list;
        persistOptions();
        renderOptionList();
        drawWheel();
        resultElement.textContent = '已从TXT导入';
      } else {
        resultElement.textContent = 'TXT为空';
      }
      importFileInput.value = '';
    };
    reader.readAsText(file, 'utf-8');
  }

  function attachEvents() {
    spinButton.addEventListener('click', spinOnce);
    shuffleButton.addEventListener('click', shuffleOptions);
    addOptionButton.addEventListener('click', addOptionFromInput);
    newOptionInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addOptionFromInput();
    });
    exportButton.addEventListener('click', exportAsTxt);
    resetButton.addEventListener('click', resetToBuiltIn);
    clearButton.addEventListener('click', clearAll);
    importFileInput.addEventListener('change', handleImportFileChange);

    // 弹窗交互
    if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    window.addEventListener('resize', drawWheel);

    spinDurationRange.addEventListener('input', () => {
      spinDurationValue.textContent = `${Number(spinDurationRange.value).toFixed(1)}s`;
    });
  }

  async function init() {
    attachEvents();

    let loaded = loadFromLocalStorage();
    if (!loaded) loaded = await loadFromTxt();
    if (!loaded) options = defaultOptions.slice();

    renderOptionList();
    drawWheel();
  }

  init();
})(); 