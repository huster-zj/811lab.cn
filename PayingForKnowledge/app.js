(function(){
  const tagContainer = document.getElementById('tagContainer');
  const searchInput = document.getElementById('searchInput');
  const cardList = document.getElementById('cardList');
  const cardTemplate = document.getElementById('cardTemplate');
  const previewModal = document.getElementById('previewModal');
  const previewFrame = document.getElementById('previewFrame');
  const payModal = document.getElementById('payModal');
  const qrImage = document.getElementById('qrImage');
  const confirmPaidBtn = document.getElementById('confirmPaidBtn');

  /**
   * 数据模型说明：
   * type: 'public' | 'paid'
   * title: string
   * desc: string
   * tags: string[]  来自 list.txt 里的条目
   * publicLink?: string  公开资料直达
   * previewUrl?: string  预览的 PDF 地址（受限 10%）
   * price?: number       价格（元）
   * downloadUrl?: string 付费解锁后的下载链接
   * qr?: string          二维码图片地址
   */
  const data = [];

  // 从 list.txt 读取标签
  let allTags = [];
  fetch('./list.txt').then(r=>r.text()).then(txt=>{
    allTags = txt.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
    renderTags(allTags);
    seedDemoData();
    render();
  }).catch(()=>{
    // 如果读取失败，提供降级回退
    allTags = ['自动控制原理','电力电子技术','计算机网络'];
    renderTags(allTags);
    seedDemoData();
    render();
  });

  // 生成一些示例数据，后续可替换为后端接口
  function seedDemoData(){
    // 用完整 list.txt 标签集，分片赋给不同卡片（每张取 5-6 个）
    const chunk = (arr, size)=>{
      const res = [];
      for(let i=0;i<arr.length;i+=size){ res.push(arr.slice(i, i+size)); }
      return res;
    };
    const chunks = chunk(allTags, 6);
    const tagsA = chunks[0] || allTags.slice(0, Math.min(6, allTags.length));
    const tagsB = chunks[1] || allTags.slice(Math.min(6, allTags.length));

    data.push(
      {
        id: 'p1',
        type: 'public',
        title: '国家公开课：电路理论精讲',
        desc: '权威公开资料，涵盖基础概念与典型电路分析。',
        tags: tagsA,
        publicLink: 'https://example.com/public-circuit',
      },
      {
        id: 'p2',
        type: 'public',
        title: '开源教材：计算机网络入门',
        desc: '系统讲解网络分层、协议与实践案例。',
        tags: tagsB.length ? tagsB : tagsA,
        publicLink: 'https://example.com/public-network',
      },
      {
        id: 'k1',
        type: 'paid',
        title: '电力电子技术笔记（精排）',
        desc: '精选考点与真题解析，适合期末/考研复习。',
        tags: tagsA,
        previewUrl: 'doc/%E5%8A%9F%E7%8E%87%E7%94%B5%E5%AD%90%E7%9F%A5%E8%AF%86%E7%82%B9%E6%80%BB%E7%BB%93.pdf',
        price: 9.9,
        qr: 'https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=pay-electronics-9.9',
        downloadUrl: 'https://example.com/download/electronics-notes.pdf'
      },
      {
        id: 'k2',
        type: 'paid',
        title: '自动控制原理重点题库',
        desc: '覆盖章节要点与题型总结，附可打印版。',
        tags: tagsB.length ? tagsB : tagsA,
        previewUrl: 'https://example.com/preview/auto-control.pdf',
        price: 6.9,
        qr: 'https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=pay-auto-6.9',
        downloadUrl: 'https://example.com/download/auto-control-qa.pdf'
      }
    );
  }

  // 状态
  let state = {
    activeTag: '全部',
    keyword: ''
  };

  function renderTags(tags){
    tagContainer.innerHTML = '';
    // 最前面插入 全部 / 免费 / 付费
    const allBtn = createTagButton('全部');
    const freeBtn = createTagButton('免费');
    const paidBtn = createTagButton('付费');
    allBtn.classList.add('is-active');
    tagContainer.appendChild(allBtn);
    tagContainer.appendChild(freeBtn);
    tagContainer.appendChild(paidBtn);
    // 其后是 list.txt 的所有标签（完整渲染）
    tags.forEach(t=>tagContainer.appendChild(createTagButton(t)));
  }

  function createTagButton(text){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pk-tag';
    btn.textContent = text;
    btn.addEventListener('click', ()=>{
      state.activeTag = text;
      [...tagContainer.children].forEach(c=>c.classList.remove('is-active'));
      btn.classList.add('is-active');
      render();
    });
    return btn;
  }

  searchInput.addEventListener('input', ()=>{
    state.keyword = searchInput.value.trim();
    render();
  });

  function render(){
    const list = data.filter(item=>{
      const matchTag = (function(){
        if(state.activeTag === '全部') return true;
        if(state.activeTag === '免费') return item.type === 'public';
        if(state.activeTag === '付费') return item.type === 'paid';
        return (item.tags||[]).includes(state.activeTag);
      })();
      const kw = state.keyword.toLowerCase();
      const matchKw = !kw || item.title.toLowerCase().includes(kw) || (item.desc||'').toLowerCase().includes(kw);
      return matchTag && matchKw;
    });

    cardList.innerHTML = '';
    list.forEach(item=>{
      const node = cardTemplate.content.firstElementChild.cloneNode(true);
      node.querySelector('.pk-card__title').textContent = item.title;
      node.querySelector('.pk-card__desc').textContent = item.desc || '';
      node.querySelector('[data-type]').textContent = item.type === 'public' ? '公开资料' : '付费资料';

      const tagsWrap = node.querySelector('[data-tags]');
      (item.tags||[]).forEach(t=>{
        const s = document.createElement('span');
        s.className = 'pk-chip';
        s.textContent = t;
        tagsWrap.appendChild(s);
      });

      const publicLink = node.querySelector('[data-public-link]');
      const previewBtn = node.querySelector('[data-preview-btn]');
      const payBtn = node.querySelector('[data-pay-btn]');
      const downloadBtn = node.querySelector('[data-download-btn]');

      if(item.type === 'public' && item.publicLink){
        publicLink.style.display = '';
        publicLink.href = item.publicLink;
        publicLink.textContent = '访问资料';
      }

      if(item.type === 'paid'){
        if(item.previewUrl){
          previewBtn.style.display = '';
          previewBtn.addEventListener('click', ()=>openPreview(item.previewUrl));
        }
        if(item.qr){
          payBtn.style.display = '';
          payBtn.textContent = `付费解锁 ¥${item.price??''}`;
          payBtn.addEventListener('click', ()=>openPay(item.qr, item.id));
        }

        // 简易的“已支付”缓存解锁
        const paidKey = `paid_${item.id}`;
        if(localStorage.getItem(paidKey) && item.downloadUrl){
          downloadBtn.style.display = '';
          downloadBtn.href = item.downloadUrl;
          downloadBtn.textContent = '下载';
          payBtn.style.display = 'none';
        }
      }

      cardList.appendChild(node);
    });
  }

  function openPreview(url){
    previewFrame.src = url;
    previewModal.setAttribute('aria-hidden','false');
  }

  function openPay(qr, id){
    qrImage.src = qr;
    payModal.setAttribute('aria-hidden','false');
    confirmPaidBtn.onclick = ()=>{
      // 实际应在此向后端查询支付状态，这里用本地标记模拟
      localStorage.setItem(`paid_${id}`, '1');
      payModal.setAttribute('aria-hidden','true');
      render();
    };
  }

  // 关闭弹窗
  document.addEventListener('click', (e)=>{
    const closeBtn = e.target.closest('[data-close]');
    if(closeBtn){
      closeBtn.closest('.pk-modal').setAttribute('aria-hidden','true');
    }
    const modal = e.target.classList && e.target.classList.contains('pk-modal') ? e.target : null;
    if(modal){ modal.setAttribute('aria-hidden','true'); }
  });
})();


