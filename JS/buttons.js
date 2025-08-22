document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const target = btn.getAttribute('data-target');
        let codeEl = null;
        if (target) {
            try { codeEl = document.querySelector(target) } catch { }
        }
        if (!codeEl) {
            const anc = btn.closest('.card');
            codeEl = anc ? anc.querySelector('pre code') : null;
        }
        if (!codeEl) return;
        const text = codeEl.innerText.trim();
        try { await navigator.clipboard.writeText(text); btn.innerText = 'Copied!'; setTimeout(() => btn.innerText = 'Copy', 1200); } catch { alert('Copy failed') }
    });
});

/* Magnetic button behavior */
(function () {
    const mag = document.getElementById('magnetic');
    if (!mag) return;
    const strength = 20;
    mag.addEventListener('mousemove', e => {
        const rect = mag.getBoundingClientRect();
        const dx = (e.clientX - rect.left) - rect.width / 2;
        const dy = (e.clientY - rect.top) - rect.height / 2;
        mag.style.setProperty('--tx', (dx / rect.width * strength) + 'px');
        mag.style.setProperty('--ty', (dy / rect.height * strength) + 'px');
        mag.style.transform = `translate(${mag.style.getPropertyValue('--tx')}, ${mag.style.getPropertyValue('--ty')}) scale(1.02)`;
    });
    mag.addEventListener('mouseleave', () => { mag.style.transform = 'translate(0,0)'; });
})();

/* Ripple */
document.querySelectorAll('.btn-ripple').forEach(b => {
    b.addEventListener('click', e => {
        const r = document.createElement('span');
        r.className = 'ripple-circle';
        const rect = b.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        r.style.width = r.style.height = size + 'px';
        r.style.left = (e.clientX - rect.left - size / 2) + 'px';
        r.style.top = (e.clientY - rect.top - size / 2) + 'px';
        b.appendChild(r);
        setTimeout(() => r.remove(), 650);
    });
});

// Loading Button Demo
const btnLoad = document.getElementById("btnLoad");
if (btnLoad) {
    btnLoad.addEventListener("click", () => {
        btnLoad.classList.add("loading");
        setTimeout(() => {
            btnLoad.classList.remove("loading");
        }, 2500);
    });
}
