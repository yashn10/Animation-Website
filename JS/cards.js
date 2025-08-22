// cards.js
/* Copy-to-clipboard for each snippet */
document.querySelectorAll('.snippet').forEach(snippet => {
    const btn = snippet.querySelector('.copy-btn');
    if (!btn) return;
    btn.addEventListener('click', async () => {
        const codeEl = snippet.querySelector('pre code');
        if (!codeEl) return;
        const text = codeEl.innerText.trim();
        try {
            await navigator.clipboard.writeText(text);
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = 'Copy', 1600);
        } catch (e) {
            alert('Copy failed. Please select and copy manually.');
        }
    });
});

/* Simple tilt JS for any element with data-tilt attribute */
(function () {
    document.querySelectorAll('[data-tilt]').forEach(el => {
        const inner = el.querySelector('.tilt-inner');
        if (!inner) return;
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            inner.style.transform = `rotateY(${x / 20}deg) rotateX(${-y / 20}deg)`;
        });
        el.addEventListener('mouseleave', () => {
            inner.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    });
})();