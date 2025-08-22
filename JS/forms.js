document.getElementById('pw-toggle')?.addEventListener('click', () => {
    const pw = document.getElementById('pw');
    if (!pw) return;
    pw.type = pw.type === 'password' ? 'text' : 'password';
});

/* morph checkbox */
const morph = document.getElementById('morph');
if (morph) {
    morph.addEventListener('click', () => morph.classList.toggle('active'));
}

/* submit simulation */
document.getElementById('submit-btn')?.addEventListener('click', () => {
    const progress = document.getElementById('progress');
    progress.style.width = '0%';
    let p = 0;
    const t = setInterval(() => { p += Math.random() * 20; if (p >= 100) { p = 100; clearInterval(t); document.getElementById('submit-btn').innerText = '✓'; } progress.style.width = p + '%'; }, 240);
});

/* copy buttons */
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const anc = btn.closest('.card');
        const code = anc ? anc.querySelector('pre code') : null;
        if (!code) return;
        try { await navigator.clipboard.writeText(code.innerText.trim()); btn.innerText = 'Copied!'; setTimeout(() => btn.innerText = 'Copy', 1200); } catch { alert('Copy failed') }
    });
});

/* ---------- forms.js additions ---------- */

document.addEventListener('DOMContentLoaded', () => {

    /* 1) Signup: avatar preview + validation */
    const avatarInput = document.getElementById('avatarInput');
    const avatarPreview = document.getElementById('avatarPreview');
    if (avatarInput && avatarPreview) {
        avatarInput.addEventListener('change', e => {
            const f = e.target.files && e.target.files[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = () => {
                avatarPreview.style.backgroundImage = `url(${reader.result})`;
                avatarPreview.textContent = '';
            };
            reader.readAsDataURL(f);
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', e => {
            e.preventDefault();
            const name = document.getElementById('su_name');
            const email = document.getElementById('su_email');
            const password = document.getElementById('su_password');
            const confirm = document.getElementById('su_confirm');
            const terms = document.getElementById('su_terms');
            const status = document.getElementById('signupStatus');
            status.textContent = '';
            // simple validation
            if (!name.value.trim() || !email.value.trim()) { status.textContent = 'Name & email required'; return; }
            if (password.value.length < 8) { status.textContent = 'Password too short'; return; }
            if (password.value !== confirm.value) { status.textContent = 'Passwords do not match'; return; }
            if (!terms.checked) { status.textContent = 'Accept Terms to continue'; return; }
            // simulate server
            status.textContent = 'Creating...';
            setTimeout(() => status.textContent = 'Account created ✓', 1300);
        });
    }

    /* 2) Login social demo */
    document.querySelectorAll('#login-card .social-btn').forEach(btn => {
        btn.addEventListener('click', () => alert('Social provider: ' + btn.dataset.provider + '\n(Replace with OAuth)'));
    });

    /* 3) Checkout: simple masking for card number */
    const cardNumber = document.getElementById('card_number');
    if (cardNumber) {
        cardNumber.addEventListener('input', e => {
            let v = e.target.value.replace(/\D/g, '').slice(0, 16);
            // group by 4
            const groups = v.match(/.{1,4}/g);
            e.target.value = groups ? groups.join(' ') : v;
        });
    }
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', e => {
            e.preventDefault();
            const status = document.getElementById('checkoutStatus');
            status.textContent = 'Processing...';
            setTimeout(() => status.textContent = 'Payment simulated ✓', 1200);
        });
    }

    /* 4) Wizard: next/back and summary */
    (function () {
        const wizardNext = document.getElementById('wizardNext');
        const wizardBack = document.getElementById('wizardBack');
        const steps = Array.from(document.querySelectorAll('.wizard-step'));
        const fill = document.getElementById('wizardBarFill');
        const stepInds = document.querySelectorAll('.step-ind');
        let current = 0;
        function showStep(i) {
            steps.forEach((s, idx) => s.hidden = idx !== i);
            const pct = Math.round(((i + 1) / steps.length) * 100) + '%';
            if (fill) fill.style.width = pct;
            stepInds.forEach(si => si.style.opacity = stepInds[Array.from(stepInds).indexOf(si)] <= i ? '1' : '.6');
        }
        if (wizardNext) {
            wizardNext.addEventListener('click', () => {
                if (current < steps.length - 1) {
                    current++; showStep(current);
                } else {
                    // final submit
                    const summaryEl = document.getElementById('wizardSummary');
                    const form = document.getElementById('wizardForm');
                    const data = new FormData(form);
                    const obj = {};
                    data.forEach((v, k) => obj[k] = v);
                    summaryEl.textContent = JSON.stringify(obj, null, 2);
                    alert('Wizard complete (demo)');
                }
            });
        }
        if (wizardBack) {
            wizardBack.addEventListener('click', () => { if (current > 0) current--; showStep(current); });
        }
        showStep(current);
    })();

    /* 5) Contact: file preview + simulated upload progress */
    (function () {
        const ctFile = document.getElementById('ct_file');
        const filePreview = document.getElementById('filePreview');
        const fileProgress = document.getElementById('fileProgress');
        const contactForm = document.getElementById('contactForm');
        if (ctFile && filePreview) {
            ctFile.addEventListener('change', e => {
                const f = e.target.files && e.target.files[0];
                filePreview.textContent = '';
                fileProgress.style.width = '0%';
                if (!f) return;
                if (f.type.startsWith('image/')) {
                    const r = new FileReader();
                    r.onload = () => {
                        const img = document.createElement('img'); img.src = r.result; img.alt = 'attachment';
                        filePreview.appendChild(img);
                    };
                    r.readAsDataURL(f);
                } else {
                    filePreview.textContent = f.name;
                }
            });
        }
        if (contactForm) {
            contactForm.addEventListener('submit', e => {
                e.preventDefault();
                // simulate upload progress
                let p = 0;
                fileProgress.style.width = '0%';
                const t = setInterval(() => {
                    p += Math.random() * 18;
                    fileProgress.style.width = Math.min(100, p) + '%';
                    if (p >= 100) { clearInterval(t); document.getElementById('contactStatus').textContent = 'Message sent ✓'; }
                }, 300);
            });
        }
    })();

    /* pill toggles for priority (contact) */
    document.querySelectorAll('#contact-card .pill').forEach(p => {
        p.addEventListener('click', () => {
            p.parentElement.querySelectorAll('.pill').forEach(x => x.classList.remove('active'));
            p.classList.add('active');
        });
    });

    /* 6) Settings: toggles and toast */
    (function () {
        const notifToggle = document.getElementById('notifToggle');
        notifToggle?.addEventListener('click', () => notifToggle.classList.toggle('dark'));

        document.getElementById('saveSettings')?.addEventListener('click', () => {
            const toast = document.getElementById('toast');
            toast.classList.add('show');
            toast.setAttribute('aria-hidden', 'false');
            setTimeout(() => { toast.classList.remove('show'); toast.setAttribute('aria-hidden', 'true'); }, 1800);
        });
    })();

    /* Utility: wire file-label clicks (for labels that hide the file input) */
    document.querySelectorAll('.file-label').forEach(lbl => {
        const input = lbl.querySelector('input[type="file"]');
        if (!input) return;
        lbl.addEventListener('click', () => input.click());
    });

});
