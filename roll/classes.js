// 浏览器端版本：自动读取本地 images 文件夹，也支持手动上传
(function() {
  let classes = [];

  const $ = (id) => document.getElementById(id);

  function normalizeClassName(folderName) {
    return folderName.replace(/(班)?()?照片$/u, '');
  }

  // 在闭区间 [min, max] 返回随机整数（等价于 Python 的 random.randint）
  function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 预定义的班级数据（基于当前文件结构自动生成）
    // 预定义的班级数据（基于当前文件结构自动生成）
    function getDefaultClassesData() {
      return [
        {
          id: 1,
          className: "人工智能2403班照片",
          students: [
            { id: 1, name: "沈依涵", photo: "images/人工智能2403班照片/1.沈依涵.jpg", isUploaded: false },
            { id: 2, name: "窦虹桦", photo: "images/人工智能2403班照片/1.窦虹桦.jpg", isUploaded: false },
            { id: 3, name: "胡挥宇", photo: "images/人工智能2403班照片/1.胡挥宇.jpg", isUploaded: false },
            { id: 4, name: "周义涵", photo: "images/人工智能2403班照片/2.周义涵.jpg", isUploaded: false },
            { id: 5, name: "唐古拉", photo: "images/人工智能2403班照片/2.唐古拉.jpg", isUploaded: false },
            { id: 6, name: "汤智铖", photo: "images/人工智能2403班照片/2.汤智铖.jpg", isUploaded: false },
            { id: 7, name: "傅致远", photo: "images/人工智能2403班照片/3.傅致远.jpg", isUploaded: false },
            { id: 8, name: "曹宇轩", photo: "images/人工智能2403班照片/3.曹宇轩.jpg", isUploaded: false },
            { id: 9, name: "牟伦祥", photo: "images/人工智能2403班照片/3.牟伦祥.jpg", isUploaded: false },
            { id: 10, name: "王骞", photo: "images/人工智能2403班照片/4.王骞.jpg", isUploaded: false },
            { id: 11, name: "邓景洲", photo: "images/人工智能2403班照片/4.邓景洲.jpg", isUploaded: false },
            { id: 12, name: "张贻洲", photo: "images/人工智能2403班照片/5.张贻洲.jpg", isUploaded: false },
            { id: 13, name: "易文子涵", photo: "images/人工智能2403班照片/5.易文子涵.jpg", isUploaded: false },
            { id: 14, name: "柯罡", photo: "images/人工智能2403班照片/5.柯罡.jpg", isUploaded: false },
            { id: 15, name: "罗嘉柯", photo: "images/人工智能2403班照片/6.罗嘉柯.jpg", isUploaded: false },
            { id: 16, name: "赵彰智", photo: "images/人工智能2403班照片/6.赵彰智.jpg", isUploaded: false },
            { id: 17, name: "陈宇凡", photo: "images/人工智能2403班照片/6.陈宇凡.jpg", isUploaded: false },
            { id: 18, name: "张博一", photo: "images/人工智能2403班照片/7.张博一.jpg", isUploaded: false },
            { id: 19, name: "江亦涵", photo: "images/人工智能2403班照片/7.江亦涵.jpg", isUploaded: false },
            { id: 20, name: "胡毅卓", photo: "images/人工智能2403班照片/7.胡毅卓.jpg", isUploaded: false },
            { id: 21, name: "姜雨成", photo: "images/人工智能2403班照片/8.姜雨成.jpg", isUploaded: false },
            { id: 22, name: "李曦文", photo: "images/人工智能2403班照片/8.李曦文.jpg", isUploaded: false },
            { id: 23, name: "郭佳昌", photo: "images/人工智能2403班照片/8.郭佳昌.jpg", isUploaded: false },
            { id: 24, name: "施紫璍", photo: "images/人工智能2403班照片/9.施紫璍.jpg", isUploaded: false },
            { id: 25, name: "谢紫瑞", photo: "images/人工智能2403班照片/9.谢紫瑞.jpg", isUploaded: false },
            { id: 26, name: "钟辰曦", photo: "images/人工智能2403班照片/9.钟辰曦.jpg", isUploaded: false },
            { id: 27, name: "余磊", photo: "images/人工智能2403班照片/10.余磊.jpg", isUploaded: false },
            { id: 28, name: "方振宇", photo: "images/人工智能2403班照片/10.方振宇.jpg", isUploaded: false },
            { id: 29, name: "李扬弘", photo: "images/人工智能2403班照片/10.李扬弘.jpg", isUploaded: false },
            { id: 30, name: "温宝玉", photo: "images/人工智能2403班照片/12.温宝玉.jpg", isUploaded: false }
          ]
        },
        {
          id: 2,
          className: "人工智能2404班照片",
          students: [
            { id: 1, name: "周乐君", photo: "images/人工智能2404班照片/1.周乐君.jpg", isUploaded: false },
            { id: 2, name: "张钰轩", photo: "images/人工智能2404班照片/1.张钰轩.jpg", isUploaded: false },
            { id: 3, name: "张雅琳", photo: "images/人工智能2404班照片/1.张雅琳.jpg", isUploaded: false },
            { id: 4, name: "单心远", photo: "images/人工智能2404班照片/2.单心远.jpg", isUploaded: false },
            { id: 5, name: "张耀辉", photo: "images/人工智能2404班照片/2.张耀辉.jpg", isUploaded: false },
            { id: 6, name: "黄于轩", photo: "images/人工智能2404班照片/2.黄于轩.jpg", isUploaded: false },
            { id: 7, name: "田昇平", photo: "images/人工智能2404班照片/3.田昇平.jpg", isUploaded: false },
            { id: 8, name: "胡雨欣", photo: "images/人工智能2404班照片/3.胡雨欣.jpg", isUploaded: false },
            { id: 9, name: "郭京京", photo: "images/人工智能2404班照片/3.郭京京.jpg", isUploaded: false },
            { id: 10, name: "兰林峰", photo: "images/人工智能2404班照片/4.兰林峰.jpg", isUploaded: false },
            { id: 11, name: "程星哲", photo: "images/人工智能2404班照片/4.程星哲.jpg", isUploaded: false },
            { id: 12, name: "郑博尹", photo: "images/人工智能2404班照片/4.郑博尹.jpg", isUploaded: false },
            { id: 13, name: "周烁", photo: "images/人工智能2404班照片/5.周烁.jpg", isUploaded: false },
            { id: 14, name: "张宇恒", photo: "images/人工智能2404班照片/5.张宇恒.jpg", isUploaded: false },
            { id: 15, name: "江赫", photo: "images/人工智能2404班照片/5.江赫.jpg", isUploaded: false },
            { id: 16, name: "朱哲睿", photo: "images/人工智能2404班照片/6.朱哲睿.jpg", isUploaded: false },
            { id: 17, name: "潘佳豪", photo: "images/人工智能2404班照片/6.潘佳豪.jpg", isUploaded: false },
            { id: 18, name: "萧伟伦", photo: "images/人工智能2404班照片/6.萧伟伦.jpg", isUploaded: false },
            { id: 19, name: "商朗", photo: "images/人工智能2404班照片/7.商朗.jpg", isUploaded: false },
            { id: 20, name: "邹毅", photo: "images/人工智能2404班照片/7.邹毅.jpg", isUploaded: false },
            { id: 21, name: "金正彬", photo: "images/人工智能2404班照片/7.金正彬.jpg", isUploaded: false },
            { id: 22, name: "汪宇涵", photo: "images/人工智能2404班照片/8.汪宇涵.jpg", isUploaded: false },
            { id: 23, name: "盛希", photo: "images/人工智能2404班照片/8.盛希.jpg", isUploaded: false },
            { id: 24, name: "鲍景阳", photo: "images/人工智能2404班照片/8.鲍景阳.jpg", isUploaded: false },
            { id: 25, name: "张哲文", photo: "images/人工智能2404班照片/9.张哲文.jpg", isUploaded: false },
            { id: 26, name: "徐晨曦", photo: "images/人工智能2404班照片/9.徐晨曦.jpg", isUploaded: false },
            { id: 27, name: "黄国琦", photo: "images/人工智能2404班照片/9.黄国琦.jpg", isUploaded: false },
            { id: 28, name: "蔡金增", photo: "images/人工智能2404班照片/10.蔡金增.jpg", isUploaded: false },
            { id: 29, name: "钱俊捷", photo: "images/人工智能2404班照片/10.钱俊捷.jpg", isUploaded: false },
            { id: 30, name: "魏梓键", photo: "images/人工智能2404班照片/10魏梓键.jpg", isUploaded: false },
            { id: 31, name: "代鸿宇", photo: "images/人工智能2404班照片/11.代鸿宇.jpg", isUploaded: false },
            { id: 32, name: "王知言", photo: "images/人工智能2404班照片/11.王知言.jpg", isUploaded: false }
          ]
        },
        {
          id: 3,
          className: "未来2304班照片",
          students: [
            { id: 1, name: "张宇航", photo: "images/未来2304班照片/1.张宇航.jpg", isUploaded: false },
            { id: 2, name: "褚心诚", photo: "images/未来2304班照片/1.褚心诚.jpg", isUploaded: false },
            { id: 3, name: "金言楷", photo: "images/未来2304班照片/1.金言楷.jpg", isUploaded: false },
            { id: 4, name: "崔博航", photo: "images/未来2304班照片/2.崔博航.jpg", isUploaded: false },
            { id: 5, name: "张谦益", photo: "images/未来2304班照片/2.张谦益.jpg", isUploaded: false },
            { id: 6, name: "潘锦涛", photo: "images/未来2304班照片/2.潘锦涛.jpg", isUploaded: false },
            { id: 7, name: "周思晨", photo: "images/未来2304班照片/3.周思晨.jpg", isUploaded: false },
            { id: 8, name: "张若妍", photo: "images/未来2304班照片/3.张若妍.jpg", isUploaded: false },
            { id: 9, name: "翁湉焱", photo: "images/未来2304班照片/3.翁湉焱.jpg", isUploaded: false },
            { id: 10, name: "乔继尧", photo: "images/未来2304班照片/4.乔继尧.jpg", isUploaded: false },
            { id: 11, name: "冉鹏远", photo: "images/未来2304班照片/4.冉鹏远.jpg", isUploaded: false },
            { id: 12, name: "罗骁", photo: "images/未来2304班照片/4.罗骁.jpg", isUploaded: false },
            { id: 13, name: "何润泽", photo: "images/未来2304班照片/5.何润泽.jpg", isUploaded: false },
            { id: 14, name: "王普天", photo: "images/未来2304班照片/5.王普天.jpg", isUploaded: false },
            { id: 15, name: "肖剑", photo: "images/未来2304班照片/5.肖剑.jpg", isUploaded: false },
            { id: 16, name: "何彦奇", photo: "images/未来2304班照片/6.何彦奇.jpg", isUploaded: false },
            { id: 17, name: "周笑辰", photo: "images/未来2304班照片/6.周笑辰.jpg", isUploaded: false },
            { id: 18, name: "尹昊然", photo: "images/未来2304班照片/6.尹昊然.jpg", isUploaded: false },
            { id: 19, name: "姚文亭", photo: "images/未来2304班照片/7.姚文亭.jpg", isUploaded: false },
            { id: 20, name: "孙正阳", photo: "images/未来2304班照片/7.孙正阳.jpg", isUploaded: false },
            { id: 21, name: "郑超群", photo: "images/未来2304班照片/7.郑超群.jpg", isUploaded: false },
            { id: 22, name: "唐世擘", photo: "images/未来2304班照片/8.唐世擘.jpg", isUploaded: false },
            { id: 23, name: "王博韬", photo: "images/未来2304班照片/8.王博韬.jpg", isUploaded: false },
            { id: 24, name: "陈煜", photo: "images/未来2304班照片/8.陈煜.jpg", isUploaded: false },
            { id: 25, name: "刘思远", photo: "images/未来2304班照片/9.刘思远.jpg", isUploaded: false },
            { id: 26, name: "唐瑞", photo: "images/未来2304班照片/9.唐瑞.jpg", isUploaded: false },
            { id: 27, name: "陈威锜", photo: "images/未来2304班照片/9.陈威锜.jpg", isUploaded: false },
            { id: 28, name: "宋泽贤", photo: "images/未来2304班照片/10.宋泽贤.jpg", isUploaded: false },
            { id: 29, name: "张晋曹", photo: "images/未来2304班照片/10.张晋曹.jpg", isUploaded: false },
            { id: 30, name: "程子俊", photo: "images/未来2304班照片/10.程子俊.jpg", isUploaded: false }
          ]
        },
        {
          id: 4,
          className: "智医2401班照片",
          students: [
            { id: 1, name: "叶蕾", photo: "images/智医2401班照片/叶蕾.jpg", isUploaded: false },
            { id: 2, name: "张正坤", photo: "images/智医2401班照片/张正坤.jpg", isUploaded: false },
            { id: 3, name: "张淼", photo: "images/智医2401班照片/张淼.jpg", isUploaded: false },
            { id: 4, name: "李奕萱", photo: "images/智医2401班照片/李奕萱.jpg", isUploaded: false },
            { id: 5, name: "汤杰信灵", photo: "images/智医2401班照片/汤杰信灵.jpg", isUploaded: false },
            { id: 6, name: "罗智仁", photo: "images/智医2401班照片/罗智仁.jpg", isUploaded: false },
            { id: 7, name: "范晓煜", photo: "images/智医2401班照片/范晓煜.jpg", isUploaded: false },
            { id: 8, name: "郭倩倩", photo: "images/智医2401班照片/郭倩倩.jpg", isUploaded: false },
            { id: 9, name: "黄会婷", photo: "images/智医2401班照片/黄会婷.jpg", isUploaded: false }
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
      const n = selectedClass.students.length;
      if (n === 0) return;

      isAnimating = true;
      pickBtn.disabled = true;
      btnIdle.style.display = 'none';
      btnBusy.style.display = 'inline';

      // 在 setTimeout 之外直接从 1..n 生成随机 id
      let randomId;
      if (n === 1) {
        randomId = selectedClass.students[0].id;
      } else {
        do {
          randomId = randint(1, n);
        } while (randomId === lastSelectedId);
      }

      setTimeout(() => {
        const picked = selectedClass.students.find(s => s.id === randomId) || selectedClass.students[0];
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
