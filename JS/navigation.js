// Smooth scroll & index activation
document.querySelectorAll('.component-list a').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.component-list a').forEach(x => x.classList.remove('active'));
        a.classList.add('active');
        const id = a.getAttribute('href');
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Copy code (handles data-target or nearest pre)
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const target = btn.getAttribute('data-target');
        let codeEl = null;
        if (target) {
            try { codeEl = document.querySelector(target); } catch { }
        }
        if (!codeEl) {
            const anc = btn.closest('.snippet');
            codeEl = anc ? anc.querySelector('pre code') : null;
        }
        if (!codeEl) return;
        const text = codeEl.innerText.trim();
        try {
            await navigator.clipboard.writeText(text);
            const txt = btn.innerText;
            btn.innerText = 'Copied!';
            setTimeout(() => btn.innerText = txt, 1400);
        } catch {
            alert('Copy failed — select and copy manually.');
        }
    });
});

// Pills toggle
document.querySelectorAll('.pill').forEach(p => p.addEventListener('click', () => {
    p.parentElement.querySelectorAll('.pill').forEach(x => x.classList.remove('active'));
    p.classList.add('active');
}));

// Tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const parent = tab.parentElement;
        parent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const idx = tab.getAttribute('data-tab');
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.hidden = panel.id !== 'tab-' + idx;
        });
    });
});

// Offcanvas open
document.getElementById('open-offcanvas')?.addEventListener('click', () => {
    const el = document.getElementById('offcanvas');
    if (!el) return;
    el.classList.toggle('open');
    el.setAttribute('aria-hidden', !el.classList.contains('open'));
});

// Doc sidebar collapsible
document.querySelectorAll('.sb-section .sb-header').forEach(h => {
    h.addEventListener('click', () => {
        const sec = h.closest('.sb-section');
        sec.classList.toggle('open');
    });
});

// Nested groups
document.querySelectorAll('.nested-list .group-header').forEach(h => {
    h.addEventListener('click', () => {
        const g = h.closest('.group');
        g.classList.toggle('open');
    });
});

// Context menu (simple)
const contextTarget = document.getElementById('context-target');
const ctxMenu = document.getElementById('context-menu');
if (contextTarget && ctxMenu) {
    ctxMenu.className = 'context-surface';
    ctxMenu.style.display = 'none';
    ctxMenu.innerHTML = '<a href=\"#\">Open</a><a href=\"#\">Edit</a><a href=\"#\">Delete</a>';
    contextTarget.addEventListener('contextmenu', e => {
        e.preventDefault();
        ctxMenu.style.left = e.clientX + 'px';
        ctxMenu.style.top = e.clientY + 'px';
        ctxMenu.style.display = 'block';
    });
    contextTarget.addEventListener('click', e => {
        // simple click opens as well
        const rect = contextTarget.getBoundingClientRect();
        ctxMenu.style.left = rect.right + 'px';
        ctxMenu.style.top = rect.top + 'px';
        ctxMenu.style.display = 'block';
    });
    document.addEventListener('click', e => {
        if (!ctxMenu.contains(e.target) && e.target !== contextTarget) ctxMenu.style.display = 'none';
    });
}

// Radial FAB transform positions
(function () {
    const root = document.getElementById('radial');
    const btn = document.getElementById('radial-btn');
    if (!root || !btn) return;
    const items = root.querySelectorAll('.radial-item');
    btn.addEventListener('click', () => {
        root.classList.toggle('open');
        if (root.classList.contains('open')) {
            const positions = [
                'translate(-72px, -8px)',
                'translate(-52px, -52px)',
                'translate(-8px, -72px)',
                'translate(36px, -52px)'
            ];
            items.forEach((it, i) => { it.style.transform = positions[i]; it.style.opacity = 1; });
            btn.innerText = '×';
        } else {
            items.forEach(it => { it.style.transform = 'translate(0,0)'; it.style.opacity = 0; });
            btn.innerText = '+';
        }
    });
})();

// Overlay open
document.getElementById('open-overlay-btn')?.addEventListener('click', () => {
    const panel = document.getElementById('overlay-panel');
    if (!panel) return;
    if (panel.style.display === 'block') { panel.style.display = 'none'; } else {
        panel.style.display = 'block';
        panel.innerHTML = '<div style=\"display:flex;flex-direction:column;align-items:center;gap:14px;padding-top:60px\"><a href=\"#\">Home</a><a href=\"#\">Docs</a><a href=\"#\">Components</a></div>';
    }
});

// Hamburger sidebar demo
document.getElementById('hb-open')?.addEventListener('click', () => {
    const a = document.getElementById('hb-aside');
    if (!a) return;
    a.style.left = (a.style.left === '0px' || a.style.left === '0') ? '-260px' : '0px';
});

// Smoothly mark first index link active on load
const first = document.querySelector('.component-list a');
if (first) first.classList.add('active');