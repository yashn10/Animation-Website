const words = ['developers', 'teams', 'designers', 'creatives'];
let idx = 0, i = 0, dir = 1;
const el = document.getElementById('typewriter');
function typeLoop() {
    const word = words[idx];
    i += dir;
    el.textContent = word.slice(0, i);
    if (i === word.length) { setTimeout(() => dir = -1, 800) }
    if (i === 0 && dir === -1) { dir = 1; idx = (idx + 1) % words.length }
    setTimeout(typeLoop, 80);
}
typeLoop();

/* Parallax: subtle follow */
const hero = document.getElementById('hero');
const layer = document.getElementById('parallax');
hero?.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    layer.style.transform = `translate(${x * -20}px, ${y * -12}px)`;
});
hero?.addEventListener('mouseleave', () => layer.style.transform = `translate(0,0)`);

/* Copy buttons */
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const anc = btn.closest('.card');
        const code = anc ? anc.querySelector('pre code') : null;
        if (!code) return;
        try { await navigator.clipboard.writeText(code.innerText.trim()); btn.innerText = 'Copied!'; setTimeout(() => btn.innerText = 'Copy', 1000); } catch { alert('Copy failed') }
    });
});
