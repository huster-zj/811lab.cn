// 浏览器端版本：自动读取本地 images 文件夹，也支持手动上传
(function() {
  let classes = [];

  const $ = (id) => document.getElementById(id);

  function normalizeClassName(folderName) {
    return folderName.replace(/(班)?()?照片$/u, '');
  }

  // 预定义的班级数据（基于当前文件结构自动生成）
    // 预定义的班级数据（基于当前文件结构自动生成）
    function getDefaultClassesData() {
      return [
        {
          id: 1,
          className: "建环2401班照片",
          students: [
            { id: 1, name: "张欣然", photo: "images/建环2401班照片/1.张欣然.jpg", isUploaded: false },
            { id: 2, name: "韩澈", photo: "images/建环2401班照片/1.韩澈.jpg", isUploaded: false },
            { id: 3, name: "黄鼎峻", photo: "images/建环2401班照片/1.黄鼎峻.jpg", isUploaded: false },
            { id: 4, name: "次邓平措", photo: "images/建环2401班照片/10.次邓平措.jpg", isUploaded: false },
            { id: 5, name: "王竟棋", photo: "images/建环2401班照片/10.王竟棋.jpg", isUploaded: false },
            { id: 6, name: "罗泽", photo: "images/建环2401班照片/10.罗泽.jpg", isUploaded: false },
            { id: 7, name: "冯思洋", photo: "images/建环2401班照片/2.冯思洋.jpg", isUploaded: false },
            { id: 8, name: "张洪瑀", photo: "images/建环2401班照片/2.张洪瑀.jpg", isUploaded: false },
            { id: 9, name: "张睿", photo: "images/建环2401班照片/2.张睿.jpg", isUploaded: false },
            { id: 10, name: "古佳祥", photo: "images/建环2401班照片/3.古佳祥.jpg", isUploaded: false },
            { id: 11, name: "叶尔桑拉克", photo: "images/建环2401班照片/3.叶尔桑拉克.jpg", isUploaded: false },
            { id: 12, name: "张其恒", photo: "images/建环2401班照片/3.张其恒.jpg", isUploaded: false },
            { id: 13, name: "汤文静", photo: "images/建环2401班照片/4.汤文静.jpg", isUploaded: false },
            { id: 14, name: "王嘉庆", photo: "images/建环2401班照片/4.王嘉庆.jpg", isUploaded: false },
            { id: 15, name: "缑宇磊", photo: "images/建环2401班照片/4.缑宇磊.jpg", isUploaded: false },
            { id: 16, name: "刘冉金", photo: "images/建环2401班照片/5.刘冉金.jpg", isUploaded: false },
            { id: 17, name: "熊思齐", photo: "images/建环2401班照片/5.熊思齐.jpg", isUploaded: false },
            { id: 18, name: "黄真谛", photo: "images/建环2401班照片/5.黄真谛.jpg", isUploaded: false },
            { id: 19, name: "木斯塔法·阿布都克依木", photo: "images/建环2401班照片/6.木斯塔法·阿布都克依木.jpg", isUploaded: false },
            { id: 20, name: "杨寒丝", photo: "images/建环2401班照片/6.杨寒丝.jpg", isUploaded: false },
            { id: 21, name: "艾孜海尔 阿卜力孜", photo: "images/建环2401班照片/6.艾孜海尔 阿卜力孜.jpg", isUploaded: false },
            { id: 22, name: "叶德勒", photo: "images/建环2401班照片/7.叶德勒.jpg", isUploaded: false },
            { id: 23, name: "周杨", photo: "images/建环2401班照片/7.周杨.jpg", isUploaded: false },
            { id: 24, name: "赵威", photo: "images/建环2401班照片/7.赵威.jpg", isUploaded: false },
            { id: 25, name: "朱垚", photo: "images/建环2401班照片/8.朱垚.jpg", isUploaded: false },
            { id: 26, name: "欧阳楚", photo: "images/建环2401班照片/8.欧阳楚.jpg", isUploaded: false },
            { id: 27, name: "姚俊伟", photo: "images/建环2401班照片/9.姚俊伟.jpg", isUploaded: false },
            { id: 28, name: "金泰煐", photo: "images/建环2401班照片/9.金泰煐.jpg", isUploaded: false }
          ]
        },
        {
          id: 2,
          className: "环工2401班照片",
          students: [
            { id: 1, name: "周玥岐", photo: "images/环工2401班照片/1.周玥岐.jpg", isUploaded: false },
            { id: 2, name: "文紫嫣", photo: "images/环工2401班照片/1.文紫嫣.jpg", isUploaded: false },
            { id: 3, name: "邓赛一", photo: "images/环工2401班照片/1.邓赛一.jpg", isUploaded: false },
            { id: 4, name: "方卓灵", photo: "images/环工2401班照片/2.方卓灵.jpg", isUploaded: false },
            { id: 5, name: "殷颢峰", photo: "images/环工2401班照片/2.殷颢峰.jpg", isUploaded: false },
            { id: 6, name: "王绅舟", photo: "images/环工2401班照片/2.王绅舟.jpg", isUploaded: false },
            { id: 7, name: "张梦瑶", photo: "images/环工2401班照片/3.张梦瑶.jpg", isUploaded: false },
            { id: 8, name: "陈梦婷", photo: "images/环工2401班照片/3.陈梦婷.jpg", isUploaded: false },
            { id: 9, name: "高皓诚", photo: "images/环工2401班照片/3.高皓诚.jpg", isUploaded: false },
            { id: 10, name: "敖靖博", photo: "images/环工2401班照片/4.敖靖博.jpg", isUploaded: false },
            { id: 11, name: "林铮", photo: "images/环工2401班照片/4.林铮.jpg", isUploaded: false },
            { id: 12, name: "黄业铭", photo: "images/环工2401班照片/4.黄业铭.jpg", isUploaded: false },
            { id: 13, name: "何檀", photo: "images/环工2401班照片/5.何檀.jpg", isUploaded: false },
            { id: 14, name: "余佳卉", photo: "images/环工2401班照片/5.余佳卉.jpg", isUploaded: false },
            { id: 15, name: "张晓霞", photo: "images/环工2401班照片/5.张晓霞.jpg", isUploaded: false },
            { id: 16, name: "张新辰", photo: "images/环工2401班照片/6.张新辰.jpg", isUploaded: false },
            { id: 17, name: "张炳阳", photo: "images/环工2401班照片/6.张炳阳.jpg", isUploaded: false },
            { id: 18, name: "段飞", photo: "images/环工2401班照片/6.段飞.jpg", isUploaded: false },
            { id: 19, name: "费怡衡", photo: "images/环工2401班照片/7.费怡衡.jpg", isUploaded: false },
            { id: 20, name: "赵星越", photo: "images/环工2401班照片/7.赵星越.jpg", isUploaded: false },
            { id: 21, name: "雷淏博", photo: "images/环工2401班照片/7.雷淏博.jpg", isUploaded: false }
          ]
        }
      ];
    }

  // 存储上传文件的缓存
  let uploadedFilesCache = new Map();

  // —— IndexedDB 简易封装：持久化保存上传的图片 ——
  const DB_NAME = 'classImagesDB';
  const DB_STORE = 'images';
  let dbPromise = null;

  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(DB_STORE)) {
          db.createObjectStore(DB_STORE);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }

  async function idbPut(key, blob) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, 'readwrite');
      tx.objectStore(DB_STORE).put(blob, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async function idbGet(key) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, 'readonly');
      const req = tx.objectStore(DB_STORE).get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  function buildClassesFromFiles(fileList) {
    const files = Array.from(fileList).filter(f => /(\.png|\.jpg|\.jpeg)$/i.test(f.name));
    const groups = new Map();
    
    // 清空之前的缓存
    uploadedFilesCache.clear();
    
    // 处理文件并转换为数据URL
    const processPromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function(e) {
          const rel = (file.webkitRelativePath || file.name).replace(/\\/g, '/');
          const seg = rel.split('/');
          const imagesIndex = seg.findIndex(s => s.toLowerCase() === 'images');
          if (imagesIndex === -1 || imagesIndex + 2 >= seg.length) {
            resolve();
            return;
          }
          const classFolder = seg[imagesIndex + 1];
          const fileName = seg.slice(imagesIndex + 2).join('/');
          if (!/(\.png|\.jpg|\.jpeg)$/i.test(fileName)) {
            resolve();
            return;
          }
          
          // 创建缓存键
          const cacheKey = `${classFolder}/${fileName}`;
          // 存入内存缓存（DataURL），用于本次会话即时显示
          uploadedFilesCache.set(cacheKey, e.target.result);
          // 也持久化到 IndexedDB（保存原始 Blob）
          const arrBuf = e.target.result;
          // FileReader.readAsDataURL 得到的是 dataURL，这里直接保存原始文件更合适
          // 因此改用 file 本身作为 blob 存储
          idbPut(cacheKey, file).catch(() => {});
          
          if (!groups.has(classFolder)) groups.set(classFolder, []);
          const name = fileName.replace(/\.(png|jpg|jpeg)$/i, '');
          groups.get(classFolder).push({ 
            name, 
            photo: cacheKey, // 使用键（classFolder/fileName）
            isUploaded: true // 标记为上传文件
          });
          resolve();
        };
        reader.onerror = () => resolve();
        reader.readAsDataURL(file);
      });
    });

    return Promise.all(processPromises).then(() => {
      const classArray = Array.from(groups.entries())
        .map(([classFolder, students]) => ({ classFolder, className: normalizeClassName(classFolder), students }))
        .sort((a, b) => a.className.localeCompare(b.className, 'zh-Hans-CN'))
        .map((group, classIndex) => {
          const sortedStudents = group.students.sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN'));
          return {
            id: classIndex + 1,
            className: group.className,
            students: sortedStudents.map((s, i) => ({ 
              id: i + 1, 
              name: s.name, 
              photo: s.photo,
              isUploaded: s.isUploaded || false
            }))
          };
        });
      return classArray;
    });
  }

  function attachUI() {
    const classSelect = $('classSelect');
    const pickBtn = $('pickBtn');
    const btnIdle = $('btnIdle');
    const btnBusy = $('btnBusy');
    const result = $('result');
    const classHint = $('classHint');
    const genBtn = $('genBtn');
    const dirPicker = $('dirPicker');

    let isAnimating = false;
    let lastSelectedId = null;
    let selectedClass = null;
    let selectedStudent = null;

    function renderClassOptions() {
      for (let i = classSelect.options.length - 1; i >= 1; i--) {
        classSelect.remove(i);
      }
      classes.forEach(cls => {
        const opt = document.createElement('option');
        opt.value = String(cls.id);
        opt.textContent = cls.className;
        classSelect.appendChild(opt);
      });
    }

    function updateHint() {
      if (selectedClass) {
        const uploadedCount = selectedClass.students.filter(s => s.isUploaded).length;
        const localCount = selectedClass.students.length - uploadedCount;
        let hintText = `已选择：${selectedClass.className}（共 ${selectedClass.students.length} 人）`;
        
        if (uploadedCount > 0 && localCount > 0) {
          hintText += ` - 本地文件: ${localCount}人，上传文件: ${uploadedCount}人`;
        } else if (uploadedCount > 0) {
          hintText += ` - 全部为上传文件`;
        } else {
          hintText += ` - 全部为本地文件`;
        }
        
        classHint.textContent = hintText;
      } else {
        classHint.textContent = '';
      }
    }

    function renderResult() {
      result.innerHTML = '';
      if (!selectedStudent) return;
      
      const img = document.createElement('img');
      img.alt = selectedStudent.name;
      img.title = selectedStudent.name;
      img.className = 'avatar fade-enter-active';
      
      // 为了兼容：优先从内存缓存 -> IndexedDB -> 相对路径
      const cacheKey = selectedStudent.photo;
      const useBlobUrl = (blob) => {
        if (!blob) return false;
        const url = URL.createObjectURL(blob);
        img.src = url;
        img.onload = () => URL.revokeObjectURL(url);
        return true;
      };

      const tryResolveSrc = async () => {
        // 1) 会话内存缓存（dataURL）
        if (uploadedFilesCache.has(cacheKey)) {
          img.src = uploadedFilesCache.get(cacheKey);
          return;
        }
        // 2) IndexedDB 持久化
        try {
          const blob = await idbGet(cacheKey);
          if (useBlobUrl(blob)) return;
        } catch {}
        // 3) 退回为相对路径（images/...），并做路径编码以兼容中文/空格
        const buildSrc = (p) => {
          const raw = p.startsWith('images/') ? p : (p.includes('/') ? `images/${p}` : p);
          // 逐段编码，避免把斜杠一并编码
          return raw.split('/').map(seg => encodeURIComponent(seg)).join('/');
        };
        img.src = buildSrc(selectedStudent.photo);
      };

      // 异步决策图片来源
      tryResolveSrc();
      
      // 添加图片加载错误处理
      img.onerror = function() {
        // 如果图片加载失败，显示默认头像
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0IiBoZWlnaHQ9IjE0NCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjOWNhM2FmIi8+CjxwYXRoIGQ9Ik0yNSA3NUMyNSA2NS41IDM0LjUgNTggNDYgNThINTRDNjUuNSA1OCA3NSA2NS41IDc1IDc1VjgwSDI1Vjc1WiIgZmlsbD0iIzljYTNhZiIvPgo8dGV4dCB4PSI1MCIgeT0iOTIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4IiBmaWxsPSIjNmI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7nhaznlYzlpLTlg588L3RleHQ+Cjwvc3ZnPg==';
        this.title = selectedStudent.name + ' (图片加载失败)';
      };
      
      const name = document.createElement('div');
      name.className = 'student-name fade-enter-active';
      name.textContent = selectedStudent.name;
      const wrap = document.createElement('div');
      wrap.appendChild(img);
      wrap.appendChild(name);
      result.appendChild(wrap);
    }

    function pickRandomStudent() {
      if (!selectedClass || isAnimating) return;
      const available = selectedClass.students.filter(s => s.id !== lastSelectedId);
      if (available.length === 0) return;

      isAnimating = true;
      pickBtn.disabled = true;
      btnIdle.style.display = 'none';
      btnBusy.style.display = 'inline';

      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * available.length);
        const picked = available[randomIndex];
        lastSelectedId = picked.id;
        selectedStudent = picked;
        renderResult();

        isAnimating = false;
        pickBtn.disabled = !selectedClass;
        btnIdle.style.display = 'inline';
        btnBusy.style.display = 'none';
      }, 800);
    }

    classSelect.addEventListener('change', () => {
      const id = Number(classSelect.value);
      selectedClass = classes.find(c => c.id === id) || null;
      selectedStudent = null;
      renderResult();
      pickBtn.disabled = !selectedClass || isAnimating;
      updateHint();
    });

    pickBtn.addEventListener('click', pickRandomStudent);

    function refreshUIWithNewData(newClasses) {
      classes = Array.isArray(newClasses) ? newClasses : [];
      selectedClass = null;
      selectedStudent = null;
      lastSelectedId = null;
      renderClassOptions();
      classSelect.value = '';
      updateHint();
      renderResult();
      pickBtn.disabled = classes.length === 0;
    }

    // 检查图片是否存在的函数
    function checkImageExists(imagePath) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = imagePath;
      });
    }

    // 自动加载默认数据（无需图片探测，确保双击文件即可看到班级下拉）
    async function autoLoadDefaultData() {
      const defaultData = getDefaultClassesData();
      refreshUIWithNewData(defaultData);
      updateStatus('已加载内置班级数据，如需读取本地图片请点击“选择 images 文件夹”');
    }

    // 更新状态提示
    function updateStatus(message) {
      const statusElement = document.getElementById('statusHint');
      if (statusElement) {
        statusElement.textContent = message;
        statusElement.style.color = message.includes('成功') ? '#059669' : '#dc2626';
      }
    }

    genBtn.addEventListener('click', () => {
      dirPicker.click();
    });

    dirPicker.addEventListener('change', async () => {
      if (!dirPicker.files || dirPicker.files.length === 0) return;
      
      updateStatus('正在处理上传的文件...');
      
      try {
        const built = await buildClassesFromFiles(dirPicker.files);
        refreshUIWithNewData(built);
        updateStatus(`手动上传成功，共加载 ${built.length} 个班级`);
      } catch (error) {
        console.error('处理上传文件时出错:', error);
        updateStatus('上传文件处理失败，请重试');
      }
    });

    // 初始化
    renderClassOptions();
    pickBtn.disabled = true;
    
    // 自动尝试加载默认数据
    autoLoadDefaultData();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachUI);
  } else {
    attachUI();
  }
})();