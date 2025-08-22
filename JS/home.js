// Copy snippet code handler (works for the code blocks inside snippet cards)
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        // find previous <pre><code> element
        const pre = btn.closest('.snippet-card').querySelector('pre code');
        if (!pre) return;
        const text = pre.innerText.trim();
        try {
            await navigator.clipboard.writeText(text);
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = 'Copy', 1800);
        } catch (e) {
            btn.textContent = 'Copy';
            alert('Copy failed — your browser may block clipboard access.');
        }
    });
});

// Simple live-search for hero search input
const search = document.querySelector('.search input');
if (search) {
    search.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        // very simple client-side filter: hide categories that don't match
        document.querySelectorAll('.category-card').forEach(card => {
            const text = (card.innerText || '').toLowerCase();
            card.style.display = q && !text.includes(q) ? 'none' : '';
        });
    });
}