// Copy-to-clipboard for each snippet
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
            setTimeout(() => btn.textContent = 'Copy', 1500);
        } catch (e) {
            alert('Copy failed — select and copy manually.');
        }
    });
});

// Progress bar "Play" button (fills the inner element)
(function () {
    const playBtn = document.getElementById('play-progress');
    const progressInner = document.querySelector('.progress .inner');
    let t;
    playBtn?.addEventListener('click', () => {
        let pct = 10;
        progressInner.style.width = pct + '%';
        clearInterval(t);
        t = setInterval(() => {
            pct += Math.random() * 12;
            if (pct >= 100) { pct = 100; clearInterval(t); }
            progressInner.style.width = pct + '%';
        }, 250);
    });
})();