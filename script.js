const frames = [...document.querySelectorAll('iframe[data-src]')];

function loadFrame(frame) {
  if (frame.src) return;
  frame.src = frame.dataset.src;
  frame.addEventListener('load', () => {
    frame.classList.add('is-loaded');
    const loading = frame.parentElement.querySelector('.loading');
    if (loading) loading.hidden = true;
  }, { once: true });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      loadFrame(entry.target);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '500px 0px' });
  frames.forEach((frame) => observer.observe(frame));
} else {
  frames.forEach(loadFrame);
}

document.querySelectorAll('.reload').forEach((button) => {
  button.addEventListener('click', () => {
    const frame = button.closest('.viewport').querySelector('iframe');
    loadFrame(frame);
    if (frame.src) frame.src = frame.src;
  });
});

const filters = [...document.querySelectorAll('.filter')];
const projects = [...document.querySelectorAll('.project')];

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle('is-active', item === button));
    projects.forEach((project) => {
      const categories = project.dataset.categories.split(' ');
      project.hidden = value !== 'all' && !categories.includes(value);
    });
  });
});
