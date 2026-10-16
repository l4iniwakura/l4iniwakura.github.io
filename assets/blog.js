(() => {
  const control = document.querySelector('.light-switch');
  const setLight = (dimmed) => {
    document.body.classList.toggle('dimmed', dimmed);
    control.setAttribute('aria-pressed', String(dimmed));
    control.querySelector('span').textContent = dimmed ? 'Добавить тепла' : 'Приглушить свет';
  };
  if (control) {
    control.hidden = false;
    try { setLight(localStorage.getItem('quiet-room-dimmed') === 'true'); } catch (_) {}
    control.addEventListener('click', () => {
      const dimmed = !document.body.classList.contains('dimmed');
      setLight(dimmed);
      try { localStorage.setItem('quiet-room-dimmed', String(dimmed)); } catch (_) {}
    });
  }
  const search = document.querySelector('#search');
  if (search) {
    document.querySelector('.search-control').hidden = false;
    const posts = [...document.querySelectorAll('[data-post]')];
    const status = document.querySelector('#search-status');
    search.addEventListener('input', () => {
      const query = search.value.trim().toLocaleLowerCase('ru');
      const words = query.split(/\s+/).filter(Boolean);
      let count = 0;
      for (const post of posts) {
        const matches = words.every(word => post.dataset.search.includes(word));
        post.hidden = !matches;
        if (matches) count++;
      }
      document.querySelector('.search-empty').hidden = count !== 0;
      status.textContent = query ? `Найдено записей: ${count}` : '';
    });
  }
})();

