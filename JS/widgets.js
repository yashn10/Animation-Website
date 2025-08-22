const toggle = document.getElementById('toggle');
toggle?.addEventListener('click', () => {
    toggle.classList.toggle('dark');
    document.body.style.filter = toggle.classList.contains('dark') ? 'hue-rotate(20deg) saturate(1.1)' : 'none';
});

/* burger */
const burger = document.getElementById('burger');
if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        const spans = burger.querySelectorAll('span');
        if (burger.classList.contains('open')) {
            spans[0].style.transform = 'translateY(12px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-12px) rotate(-45deg)';
        } else {
            spans.forEach(s => { s.style.transform = 'none'; s.style.opacity = '1'; });
        }
    });
}

/* heart like */
const heart = document.getElementById('heart');
heart?.addEventListener('click', () => heart.classList.toggle('liked'));

/* bookmark */
const bm = document.getElementById('bm');
bm?.addEventListener('click', () => bm.classList.toggle('active'));

/* stars */
const stars = document.getElementById('stars');
if (stars) {
    const sArr = Array.from(stars.children);
    sArr.forEach((s, i) => {
        s.addEventListener('mouseenter', () => {
            sArr.forEach((x, idx) => x.classList.toggle('active', idx <= i));
        });
        s.addEventListener('click', () => {
            sArr.forEach((x, idx) => x.classList.toggle('active', idx <= i));
        });
    });
}

/* copy buttons */
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const anc = btn.closest('.card'); const code = anc.querySelector('pre code');
        if (!code) return;
        try { await navigator.clipboard.writeText(code.innerText.trim()); btn.innerText = 'Copied!'; setTimeout(() => btn.innerText = 'Copy', 1200); } catch { alert('Copy failed') }
    });
});

/* --------------- widgets.js additions --------------- */
document.addEventListener('DOMContentLoaded', () => {

    /* Segmented control - positions thumb under active item */
    (function () {
        const seg = document.getElementById('segmented-1');
        if (!seg) return;
        const items = Array.from(seg.querySelectorAll('.seg-item'));
        const thumb = seg.querySelector('.seg-thumb');
        function updateThumb(active) {
            const rect = active.getBoundingClientRect();
            const parentR = seg.getBoundingClientRect();
            const left = rect.left - parentR.left;
            thumb.style.width = `${rect.width}px`;
            thumb.style.transform = `translateX(${left}px)`;
        }
        items.forEach(it => {
            it.addEventListener('click', () => {
                items.forEach(x => { x.classList.remove('active'); x.setAttribute('aria-selected', 'false') });
                it.classList.add('active'); it.setAttribute('aria-selected', 'true');
                updateThumb(it);
                // dispatch simple custom event with chosen value
                seg.dispatchEvent(new CustomEvent('seg-change', { detail: it.dataset.val }));
            });
        });
        // init
        const active = seg.querySelector('.seg-item.active') || items[0];
        updateThumb(active);
        window.addEventListener('resize', () => updateThumb(seg.querySelector('.seg-item.active') || items[0]));
    })();

    /* Progress knob increment/decrement buttons */
    (function () {
        function setPercent(el, pct) {
            pct = Math.max(0, Math.min(100, pct));
            el.style.setProperty('--percent', pct);
            el.textContent = Math.round(pct) + '%';
            el.style.background = `conic-gradient(var(--p1) ${pct * 1}%, rgba(255,255,255,0.06) 0%)`;
        }
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = document.getElementById(btn.dataset.target);
                if (!target) return;
                const cur = parseInt(getComputedStyle(target).getPropertyValue('--percent')) || parseInt(target.textContent) || 0;
                const delta = btn.dataset.action === 'inc' ? 10 : -10;
                setPercent(target, cur + delta);
            });
        });
    })();

    /* Toast */
    (function () {
        const tbtn = document.getElementById('showToastBtn');
        const toast = document.getElementById('toast2');
        if (!tbtn || !toast) return;
        tbtn.addEventListener('click', () => {
            toast.classList.add('show');
            toast.setAttribute('aria-hidden', 'false');
            setTimeout(() => { toast.classList.remove('show'); toast.setAttribute('aria-hidden', 'true'); }, 1800);
        });
    })();

    /* Tag input (chips) */
    (function () {
        const input = document.getElementById('tagInput');
        const box = document.getElementById('tagContainer');
        if (!input || !box) return;
        function addTag(text) {
            if (!text || !text.trim()) return;
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.innerHTML = `${text.trim()} <button aria-label="remove">✕</button>`;
            tag.querySelector('button').addEventListener('click', () => tag.remove());
            box.appendChild(tag);
            input.value = '';
            input.focus();
        }
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(input.value); }
            if (e.key === 'Backspace' && input.value === '') {
                const last = box.querySelector('.tag:last-child');
                if (last) last.remove();
            }
        });
        input.addEventListener('blur', () => { if (input.value) addTag(input.value); });
    })();

    /* Speed dial / FAB */
    (function () {
        const sd = document.getElementById('speedDial');
        if (!sd) return;
        sd.querySelector('.main').addEventListener('click', () => sd.classList.toggle('open'));
        // close on outside
        document.addEventListener('click', e => { if (!sd.contains(e.target)) sd.classList.remove('open'); });
    })();

    /* Popover */
    (function () {
        const trig = document.getElementById('popTrigger');
        const menu = document.getElementById('popMenu');
        if (!trig || !menu) return;
        function position() {
            const r = trig.getBoundingClientRect();
            menu.style.left = r.left + 'px';
            menu.style.top = (r.bottom + 8) + 'px';
        }
        trig.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
            menu.setAttribute('aria-hidden', menu.style.display !== 'flex');
            if (menu.style.display === 'flex') position();
        });
        document.addEventListener('click', () => { menu.style.display = 'none'; menu.setAttribute('aria-hidden', 'true'); });
        window.addEventListener('resize', () => { if (menu.style.display === 'flex') position(); });
    })();

    /* Numeric stepper with long-press */
    (function () {
        const st = document.getElementById('numStepper');
        if (!st) return;
        const input = st.querySelector('.step-input');
        const inc = st.querySelector('[data-op="inc"]');
        const dec = st.querySelector('[data-op="dec"]');

        function change(delta) {
            let v = parseInt(input.value) || 0;
            v = Math.max(0, v + delta);
            input.value = v;
        }

        let holdTimer = null;
        function startHold(btn, delta) {
            change(delta);
            holdTimer = setInterval(() => change(delta), 150);
            btn.classList.add('active');
        }
        function stopHold(btn) {
            clearInterval(holdTimer);
            holdTimer = null;
            btn.classList.remove('active');
        }

        inc.addEventListener('mousedown', () => startHold(inc, 1));
        inc.addEventListener('touchstart', () => startHold(inc, 1));
        inc.addEventListener('mouseup', () => stopHold(inc));
        inc.addEventListener('mouseleave', () => stopHold(inc));
        inc.addEventListener('touchend', () => stopHold(inc));

        dec.addEventListener('mousedown', () => startHold(dec, -1));
        dec.addEventListener('touchstart', () => startHold(dec, -1));
        dec.addEventListener('mouseup', () => stopHold(dec));
        dec.addEventListener('mouseleave', () => stopHold(dec));
        dec.addEventListener('touchend', () => stopHold(dec));
    })();

    /* Copy input */
    (function () {
        const cBtn = document.getElementById('copyBtn');
        const cInput = document.getElementById('copyInput');
        if (!cBtn || !cInput) return;
        cBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(cInput.value);
                cBtn.innerText = 'Copied!';
                setTimeout(() => cBtn.innerText = 'Copy', 1200);
            } catch {
                alert('Copy failed — select and copy manually.');
            }
        });
    })();

    /* (optional) wire copy-btns to nearest pre code if present */
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const target = btn.getAttribute('data-target');
            let codeEl = null;
            if (target) { try { codeEl = document.querySelector(target); } catch { } }
            if (!codeEl) { const parent = btn.closest('.card'); codeEl = parent ? parent.querySelector('pre code') : null; }
            if (!codeEl) return;
            try { await navigator.clipboard.writeText(codeEl.innerText.trim()); btn.innerText = 'Copied!'; setTimeout(() => btn.innerText = 'Copy', 1200); } catch { }
        });
    });

});
