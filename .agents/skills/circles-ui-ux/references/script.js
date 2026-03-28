// ── Core nav — defined first so onclick="" handlers always resolve ──
var cur = 0;
var isLight = false;
var SCREENS = [];
var NAMES = ['Splash', 'Onboard — Read', 'Onboard — Connect', 'Onboard — Protect', 'Sign In', 'OTP', 'Base Profile', 'Create Persona', 'Feed Wall', 'Orbit', 'Sandbox', 'Table', 'Shelf', 'Identity Hub', 'Stage'];

function goTo(url) {
    window.location.href = '/' + url;
    updateUI();
}
function next() { cur = (cur + 1) % SCREENS.length; updateUI(); }
function prev() { cur = (cur - 1 + SCREENS.length) % SCREENS.length; updateUI(); }

function fw(id) {
    const inner = document.getElementById('phone-inner');
    return inner ? inner.querySelector('#' + id) : null;
}
function fwShow(id) { const el = fw(id); if (el) el.style.display = 'flex'; }
function fwHide(id) { const el = fw(id); if (el) el.style.display = 'none'; }

function buildPhone(idx) {
    const phone = document.getElementById('phone-main');
    const inner = document.getElementById('phone-inner');
    inner.innerHTML = '';
    const tpl = SCREENS[idx].cloneNode(true);
    if (isLight) {
        tpl.style.cssText = 'display:flex;flex-direction:column;position:absolute;inset:0;background:#F2F4F7;overflow:hidden;';
        phone.classList.add('lm');
        applyLightTheme(tpl);
    } else {
        tpl.style.cssText = 'display:flex;flex-direction:column;position:absolute;inset:0;background:#05070A;overflow:hidden;';
        phone.classList.remove('lm');
    }
    inner.appendChild(tpl);
}

function updateUI() {
    // counter
    currentPage = globalThis.location.pathname;
    buttons = document.querySelectorAll('.presenter .p-nav .p-btn');
    buttons.forEach((btn) => {
        if (currentPage.includes(btn.innerText.toLowerCase().replaceAll(' ', ''))) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    buildPhone(cur);
}

function next() { cur = (cur + 1) % SCREENS.length; updateUI(); }
function prev() { cur = (cur - 1 + SCREENS.length) % SCREENS.length; updateUI(); }

// ── Feed Wall Interactions ──────────────────────────

// Helper: get element inside the currently active phone frame
function fw(id) {
    return document.getElementById('phone-inner').querySelector('#' + id);
}
function fwShow(id) { const el = fw(id); if (el) { el.style.display = 'flex'; } }
function fwHide(id) { const el = fw(id); if (el) { el.style.display = 'none'; } }

// ── Book: Add to Shelf (quick action, no modal)
function feedBookShelf(btn) {
    btn.textContent = '✓ Saved';
    btn.style.background = 'rgba(16,185,129,0.15)';
    btn.style.border = '1px solid rgba(16,185,129,0.35)';
    btn.style.color = '#10B981';
    btn.disabled = true;
}

// ── Book: Open Details modal
function feedBookDetails() {
    const modal = fw('fw-buy-modal');
    if (modal) { modal.style.display = 'flex'; }
    fwShow('fw-book-insights');
    fwHide('fw-pay-options-container');
    fwHide('fw-pay-success');
}

// ── Book: Transition to Buy
function feedInitiateBuy() {
    fwHide('fw-book-insights');
    fwShow('fw-pay-options-container');
}

function feedBuyClose() {
    const modal = fw('fw-buy-modal');
    if (modal) { modal.style.display = 'none'; }
}
function feedBuySuccess() {
    fwHide('fw-pay-options-container');
    fwShow('fw-pay-success');
}
function feedBuyDone() {
    feedBuyClose();
    // Update the book card buttons to show "Purchased"
    const btns = fw('fw-book-btns');
    const bought = fw('fw-book-bought');
    if (btns) btns.style.display = 'none';
    if (bought) bought.style.display = 'block';
}

// ── Stage: Open RSVP modal
function feedStageRSVP() {
    const modal = fw('fw-stage-modal');
    if (modal) { modal.style.display = 'flex'; }
}
function feedStageClose() {
    const modal = fw('fw-stage-modal');
    if (modal) { modal.style.display = 'none'; }
    fwShow('fw-stage-free');
    fwHide('fw-stage-confirmed');
}
function feedStageConfirm() {
    fwHide('fw-stage-free');
    fwShow('fw-stage-confirmed');
    // Update RSVP button on card
    const btn = fw('fw-stage-rsvp-btn');
    if (btn) {
        btn.textContent = '✓ Seat Reserved';
        btn.style.background = 'rgba(16,185,129,0.15)';
        btn.style.boxShadow = 'none';
        btn.style.border = '1px solid rgba(16,185,129,0.35)';
        btn.style.color = '#10B981';
        btn.disabled = true;
    }
}

// ── Sponsored: Open schedule modal
function feedSponsoredSchedule() {
    const modal = fw('fw-sponsor-modal');
    if (modal) { modal.style.display = 'flex'; }
}
function feedSponsorClose() {
    const modal = fw('fw-sponsor-modal');
    if (modal) { modal.style.display = 'none'; }
    const done = fw('fw-sponsor-done');
    const btn = fw('fw-sponsor-confirm-btn');
    if (done) done.style.display = 'none';
    if (btn) btn.style.display = 'flex';
}
function feedSponsorConfirm() {
    const done = fw('fw-sponsor-done');
    const btn = fw('fw-sponsor-confirm-btn');
    if (done) { done.style.display = 'flex'; done.style.flexDirection = 'column'; done.style.alignItems = 'center'; done.style.gap = '10px'; done.style.padding = '4px 0'; }
    if (btn) btn.style.display = 'none';
}

// ── Calendar date selector
function calSelect(el) {
    const slots = el.closest('[id="fw-sponsor-modal"]') || el.closest('div[style*="inset:0"]');
    const allDates = el.parentElement.querySelectorAll('span[onclick="calSelect(this)"]');
    allDates.forEach(d => {
        d.style.background = ''; d.style.border = ''; d.style.fontWeight = '';
    });
    el.style.background = 'rgba(92,148,233,0.20)';
    el.style.border = '1px solid rgba(92,148,233,0.40)';
    el.style.fontWeight = '700';
}

// ── Time slot selector
function slotSelect(btn) {
    const parent = btn.parentElement;
    parent.querySelectorAll('button').forEach(b => {
        b.className = 'btn btn-glass';
        b.style.padding = '7px 14px';
        b.style.fontSize = '10px';
        b.style.fontWeight = '500';
    });
    btn.className = 'btn btn-brand';
    btn.style.padding = '7px 14px';
    btn.style.fontSize = '10px';
    btn.style.fontWeight = '600';
}

// ── Sandbox: In-Lobby Circle Formation ─────────────────────────

let sbMuted = false;
let sbTimerInterval = null;
let sbSeconds = 0;

function sendSandboxNote() {
    const input = fw('sandbox-note-input');
    if (!input) return;
    const noteText = input.value.trim();
    if (!noteText) return;
    const bubble = fw('sb-my-note');
    const textEl = fw('sb-my-note-text');
    if (bubble && textEl) { textEl.textContent = `"${noteText}"`; bubble.style.display = 'block'; }
    input.value = '';
    setTimeout(() => { const b = fw('sb-my-note'); if (b) b.style.display = 'none'; }, 4000);
}

function sbHandshake() {
    const btn = fw('sb-hs-btn');
    if (!btn) return;
    btn.textContent = 'Waiting…';
    btn.className = 'btn btn-glass';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
        // Hide note bubble
        const noteEl = fw('sb-code-note');
        if (noteEl) noteEl.style.display = 'none';

        // Fade out free-floating avatars — they appear inside the circle
        const alex = fw('sb-alex');
        const code = fw('sb-code');
        if (alex) { alex.style.opacity = '0'; alex.style.transform = 'scale(0.5)'; alex.style.pointerEvents = 'none'; }
        if (code) { code.style.opacity = '0'; code.style.transform = 'scale(0.5)'; code.style.pointerEvents = 'none'; }

        // Reveal the circle formation in lobby center
        const circle = fw('sb-circle');
        if (circle) circle.style.display = 'block';

        // CodeCrafter speaks first — show speaking badge pulse on their avatar (already visible)
        setTimeout(() => { const m = fw('sb-code-speaking'); if (m) m.style.background = '#34d399'; }, 600);

        // Swap bottom bar to circle controls
        const noteBar = fw('sb-note-bar');
        const ctrlBar = fw('sb-circle-controls');
        if (noteBar) noteBar.style.display = 'none';
        if (ctrlBar) ctrlBar.style.display = 'flex';

        sbStartTimer();

        // Indra notices and wants to join after 3s
        setTimeout(() => {
            const indra = fw('sb-indra');
            if (indra) { indra.style.opacity = '0.80'; indra.style.transform = 'translateY(-12px)'; }
            setTimeout(() => { const j = fw('sb-indra-join'); if (j) j.style.display = 'block'; }, 1200);
        }, 3000);

    }, 1000);
}

function sbStartTimer() {
    sbSeconds = 0;
    if (sbTimerInterval) clearInterval(sbTimerInterval);
    sbTimerInterval = setInterval(() => {
        sbSeconds++;
        const mins = String(Math.floor(sbSeconds / 60)).padStart(2, '0');
        const secs = String(sbSeconds % 60).padStart(2, '0');
        const t = fw('sb-timer');
        if (t) t.textContent = `${mins}:${secs} · Circle active`;
    }, 1000);
}

function sbIndraJoin() {
    const j = fw('sb-indra-join'); if (j) j.style.display = 'none';
    const indra = fw('sb-indra'); if (indra) { indra.style.opacity = '0'; indra.style.transition = 'opacity 0.4s'; }
    const ci = fw('sb-circle-indra'); if (ci) ci.style.display = 'flex';
    const lbl = fw('sb-circle-label'); if (lbl) lbl.textContent = 'Circle · 3 in audio';
}

function sbIndraDismiss() {
    const j = fw('sb-indra-join'); if (j) j.style.display = 'none';
    const indra = fw('sb-indra'); if (indra) { indra.style.opacity = '0.25'; indra.style.transition = 'opacity 0.4s'; }
}

function sbToggleMute() {
    sbMuted = !sbMuted;
    const btn = fw('sb-mute-btn');
    const youWaves = fw('sb-you-waves');
    if (youWaves) youWaves.style.display = sbMuted ? 'none' : 'flex';
    if (btn) {
        btn.innerHTML = sbMuted
            ? `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 3a3 3 0 00-3 3v4a3 3 0 006 0V6a3 3 0 00-3-3z"/><line x1="3" y1="3" x2="21" y2="21" stroke-linecap="round"/></svg> Unmute`
            : `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 3a3 3 0 00-3 3v4a3 3 0 006 0V6a3 3 0 00-3-3z"/></svg> Mute`;
        btn.style.background = sbMuted ? 'rgba(239,68,68,0.15)' : '';
        btn.style.borderColor = sbMuted ? 'rgba(239,68,68,0.35)' : '';
        btn.style.color = sbMuted ? '#EF4444' : '';
    }
}

function sbLeave() {
    if (sbTimerInterval) clearInterval(sbTimerInterval);
    // Reset to state 0
    ['sb-circle', 'sb-indra-join'].forEach(id => { const e = fw(id); if (e) e.style.display = 'none'; });
    const noteBar = fw('sb-note-bar'), ctrlBar = fw('sb-circle-controls');
    if (noteBar) noteBar.style.display = 'block'; if (ctrlBar) ctrlBar.style.display = 'none';
    const alex = fw('sb-alex'), code = fw('sb-code'), indra = fw('sb-indra');
    if (alex) { alex.style.opacity = '1'; alex.style.transform = ''; alex.style.pointerEvents = 'auto'; }
    if (code) { code.style.opacity = '1'; code.style.transform = ''; code.style.pointerEvents = 'auto'; }
    if (indra) { indra.style.opacity = '0.50'; indra.style.transform = ''; }
    const codeNote = fw('sb-code-note'); if (codeNote) codeNote.style.display = 'block';
    const ci = fw('sb-circle-indra'); if (ci) ci.style.display = 'none';
    const hsBtn = fw('sb-hs-btn'); if (hsBtn) { hsBtn.textContent = 'Handshake'; hsBtn.className = 'btn btn-brand'; hsBtn.style.pointerEvents = 'auto'; }
    const codeMic = fw('sb-code-speaking'); if (codeMic) codeMic.style.background = '#34d399';
    const youWaves = fw('sb-you-waves'); if (youWaves) youWaves.style.display = 'flex';
    sbMuted = false;
    const mb = fw('sb-mute-btn'); if (mb) { mb.innerHTML = `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 3a3 3 0 00-3 3v4a3 3 0 006 0V6a3 3 0 00-3-3z"/></svg> Mute`; mb.style.background = ''; mb.style.borderColor = ''; mb.style.color = ''; }
}

function sbBloom() { goTo(11); }  // Bloom → extracts to private Live Circle (Table screen)

function initiateHandshake(btn) {
    btn.textContent = 'Waiting for response...';
    btn.className = 'btn btn-glass';
    btn.style.pointerEvents = 'none';
    setTimeout(() => {
        btn.textContent = 'Circle formed →';
        btn.className = 'btn btn-success';
        btn.style.pointerEvents = 'auto';
        btn.onclick = () => goTo(9);
    }, 1500);
}

function acceptTableHandshake(btn) {
    btn.textContent = 'Connecting...';
    btn.className = 'btn btn-glass';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
        const floatingNote = fw('tb-floating-note');
        const partner = fw('tb-partner');
        const timer = fw('tb-timer');

        // Hide the floating spatial note
        if (floatingNote) floatingNote.style.display = 'none';

        // Reveal central connected elements
        if (partner) partner.style.display = 'flex';
        if (timer) timer.style.display = 'inline-flex';

        // Simulate CodeCrafter speaking
        const wavePartner = fw('wave-partner');
        if (wavePartner) wavePartner.style.display = 'flex';

        // Simulate 3rd User dropping a note shortly after CodeCrafter joins!
        setTimeout(() => {
            const thirdNote = fw('tb-third-note');
            if (thirdNote) thirdNote.style.display = 'flex';
            if (wavePartner) wavePartner.style.display = 'none'; // Stop speaking
        }, 3000);

    }, 800);
}

function acceptThirdHandshake(btn) {
    btn.textContent = 'Connecting...';
    btn.className = 'btn btn-glass';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
        const thirdNote = fw('tb-third-note');
        const thirdPartner = fw('tb-third-partner');

        // Hide floating note and reveal the third partner in the circle
        if (thirdNote) thirdNote.style.display = 'none';
        if (thirdPartner) thirdPartner.style.display = 'flex';

        // Simulate Indra speaking
        const waveThird = fw('wave-third');
        if (waveThird) waveThird.style.display = 'flex';
        setTimeout(() => { if (waveThird) waveThird.style.display = 'none'; }, 2000);
    }, 800);
}

// ── Audio/Video Controls ──
let isMuted = false;
function toggleMute() {
    isMuted = !isMuted;
    const btn = fw('btn-mute');
    const myWave = fw('wave-you');
    if (btn) {
        btn.textContent = isMuted ? 'Unmute Audio' : 'Mute Audio';
        btn.style.background = isMuted ? 'rgba(239,68,68,0.2)' : '';
    }
    if (!isMuted && myWave) {
        myWave.style.display = 'flex';
        setTimeout(() => { if (myWave) myWave.style.display = 'none'; }, 1500);
    } else if (myWave) {
        myWave.style.display = 'none';
    }
}

function requestVideo() {
    const popup = fw('video-request-popup');
    const btnVideo = fw('btn-enable-video');
    if (btnVideo) {
        btnVideo.textContent = 'Requesting...';
        btnVideo.style.opacity = '0.5';
        btnVideo.style.pointerEvents = 'none';
    }

    // Simulate receiving the request (or showing consensus)
    setTimeout(() => {
        if (popup) popup.style.top = '70px'; // Slide down
    }, 600);
}

function declineVideo() {
    const popup = fw('video-request-popup');
    const btnVideo = fw('btn-enable-video');
    if (popup) popup.style.top = '-150px';
    if (btnVideo) {
        btnVideo.textContent = 'Enable Video 🎥';
        btnVideo.style.opacity = '1';
        btnVideo.style.pointerEvents = 'auto';
    }
}

function acceptVideo() {
    const popup = fw('video-request-popup');
    if (popup) popup.style.top = '-150px'; // slide up

    // Swap avatars to realistic photos and apply video class
    const youImg = fw('tb-you-img');
    const partnerImg = fw('tb-partner-img');
    const thirdImg = fw('tb-third-img');

    // Also add wave-video class to overlays to match rounded rects
    ['wave-you', 'wave-partner', 'wave-third'].forEach(id => {
        const el = fw(id);
        if (el) el.classList.add('wave-video');
    });

    if (youImg) {
        if (youImg) { youImg.style.borderRadius = '14px'; youImg.style.background = 'linear-gradient(135deg,#1a3060,#2a4a8a)'; }
    }
    if (partnerImg) {
        partnerImg.style.borderRadius = '14px'; partnerImg.style.background = 'linear-gradient(135deg,#0d2a1e,#1a4a2a)';
        partnerImg.style.animation = 'none';
    }
    if (thirdImg) {
        thirdImg.style.borderRadius = '14px'; thirdImg.style.background = 'linear-gradient(135deg,#0d1e38,#1a3060)';
    }

    const btnVideo = fw('btn-enable-video');
    if (btnVideo) {
        btnVideo.textContent = 'Disable Video 🎥';
        btnVideo.style.background = 'rgba(255,255,255,0.1)';
        btnVideo.style.color = '#fff';
        btnVideo.style.boxShadow = 'none';
        btnVideo.style.opacity = '1';
        btnVideo.style.pointerEvents = 'auto';
        btnVideo.onclick = disableVideo; // Toggle logic
    }
}

function disableVideo() {
    const youImg = fw('tb-you-img');
    const partnerImg = fw('tb-partner-img');
    const thirdImg = fw('tb-third-img');

    ['wave-you', 'wave-partner', 'wave-third'].forEach(id => {
        const el = fw(id);
        if (el) el.classList.remove('wave-video');
    });

    if (youImg) {
        youImg.style.borderRadius = '50%'; youImg.style.background = '#1a3060'; youImg.style.animation = '';
    }
    if (partnerImg) {
        partnerImg.style.borderRadius = '50%'; partnerImg.style.background = '#0d2a1e';
    }
    if (thirdImg) {
        thirdImg.style.borderRadius = '50%'; thirdImg.style.background = '#0d1e38';
    }

    const btnVideo = fw('btn-enable-video');
    if (btnVideo) {
        btnVideo.textContent = 'Enable Video 🎥';
        btnVideo.style.background = '#5C94E9';
        btnVideo.onclick = requestVideo;
    }
}

// ── Plant Root Consensus Flow ──
function requestPlantRoot() {
    const btn = fw('btn-plant-root');
    if (btn) {
        btn.textContent = 'Requesting...';
        btn.style.opacity = '0.5';
        btn.style.pointerEvents = 'none';
    }

    const popup = fw('root-consensus-popup');
    if (popup) popup.style.top = '70px'; // Slide down

    // Elements
    const pImg = fw('rc-partner-img');
    const pCheck = fw('rc-partner-check');
    const tImg = fw('rc-third-img');
    const tCheck = fw('rc-third-check');
    const text = fw('root-consensus-text');

    // Reset to initial waiting state
    if (pImg) { pImg.style.borderColor = 'rgba(255,255,255,0.15)'; pImg.style.opacity = '0.4'; }
    if (pCheck) pCheck.style.display = 'none';
    if (tImg) { tImg.style.borderColor = 'rgba(255,255,255,0.15)'; tImg.style.opacity = '0.4'; }
    if (tCheck) tCheck.style.display = 'none';
    if (text) text.textContent = 'Waiting for consensus to Plant Root...';

    // 1. CodeCrafter accepts
    setTimeout(() => {
        if (pImg) { pImg.style.borderColor = '#10B981'; pImg.style.opacity = '1'; }
        if (pCheck) pCheck.style.display = 'flex';
    }, 1500);

    // 2. Indra_Dev accepts (Consensus Reached!)
    setTimeout(() => {
        if (tImg) { tImg.style.borderColor = '#10B981'; tImg.style.opacity = '1'; }
        if (tCheck) tCheck.style.display = 'flex';
        if (text) {
            text.textContent = 'Consensus reached! Root planted. 🌱';
            text.style.color = '#10B981';
        }

        if (btn) {
            btn.textContent = '✓ Root Planted';
            btn.className = 'btn btn-success';
            btn.style.opacity = '1';
            btn.style.background = 'rgba(16,185,129,0.10)';
            btn.style.borderColor = 'rgba(16,185,129,0.3)';
            btn.style.color = '#10B981';
        }

        // Hide popup
        setTimeout(() => {
            if (popup) popup.style.top = '-150px';
            if (text) text.style.color = '#fff'; // Reset text color
        }, 2500);
    }, 3200);
}

// ── LIGHT / DARK MODE TOGGLE ────────────────────────────────────

function toggleMode() {
    isLight = !isLight;
    const icon = document.getElementById('mt-icon');
    const label = document.getElementById('mt-label');
    const modeName = document.getElementById('mode-name');
    const modeLbl = document.getElementById('mode-label');
    const phone = document.getElementById('phone-main');
    if (isLight) {
        icon.textContent = '🌙'; label.textContent = 'Dark';
        modeName.textContent = 'Library'; modeLbl.classList.add('is-light');
        phone.classList.add('lm');
    } else {
        icon.textContent = '☀️'; label.textContent = 'Light';
        modeName.textContent = 'Orbit'; modeLbl.classList.remove('is-light');
        phone.classList.remove('lm');
    }
    buildPhone(cur);
}

// Walk inline styles and remap dark values to light equivalents
function applyLightTheme(root) {
    root.setAttribute('data-mode', 'light');

    root.querySelectorAll('[style]').forEach(el => {
        let s = el.getAttribute('style');

        // ── Solid backgrounds ──
        s = s.replace(/background:\s*#05070A/gi, 'background:#F2F4F7');
        s = s.replace(/background:\s*#0f1623/gi, 'background:#ffffff');
        s = s.replace(/background:\s*#111827/gi, 'background:#ffffff');
        s = s.replace(/background:\s*#0d1e38/gi, 'background:#dce8f8');
        s = s.replace(/background:\s*#0d1828/gi, 'background:#dce8f8');
        s = s.replace(/background:\s*#1a2a40/gi, 'background:#e2ecf8');
        s = s.replace(/background:\s*#1a3060/gi, 'background:#d8e6f6');
        s = s.replace(/background:\s*#1a3a5c/gi, 'background:#cce0f5');
        s = s.replace(/background:\s*#0d2a1e/gi, 'background:#d8f0e8');
        s = s.replace(/background:\s*#2a1a0d/gi, 'background:#f0e8d8');
        s = s.replace(/background:\s*#1a1a3a/gi, 'background:#e4e4f4');
        s = s.replace(/background:\s*#1a3a2a/gi, 'background:#daf0e6');
        s = s.replace(/background:\s*#3a1a2a/gi, 'background:#f4e0ea');
        s = s.replace(/background:\s*#2a2a1a/gi, 'background:#f0f0da');
        s = s.replace(/background:\s*#1a2a3a/gi, 'background:#dce8f4');
        s = s.replace(/background:\s*#1e2a1a/gi, 'background:#dceada');
        s = s.replace(/background:\s*#3a1a1a/gi, 'background:#f4dada');
        s = s.replace(/background:\s*#1e3a6e/gi, 'background:#c0d4ee');

        // ── rgba dark surfaces ──
        s = s.replace(/background:\s*rgba\(5,\s*7,\s*10,\s*(0\.[0-9]+)\)/gi, (_, a) =>
            parseFloat(a) > 0.65 ? 'background:rgba(242,244,247,0.94)' : 'background:rgba(242,244,247,0.75)');
        s = s.replace(/background:\s*rgba\(26,\s*29,\s*36,\s*(0\.[0-9]+)\)/gi, (_, a) =>
            `background:rgba(255,255,255,${Math.min(0.90, parseFloat(a) + 0.28)})`);
        s = s.replace(/background:\s*rgba\(12,\s*14,\s*20,\s*[0-9.]+\)/gi, 'background:rgba(255,255,255,0.90)');
        s = s.replace(/background:\s*rgba\(10,\s*22,\s*44,\s*[0-9.]+\)/gi, 'background:rgba(232,240,252,0.80)');
        s = s.replace(/background:\s*rgba\(15,\s*30,\s*58,\s*[0-9.]+\)/gi, 'background:rgba(228,238,252,0.70)');
        s = s.replace(/background:\s*rgba\(30,\s*58,\s*95,\s*[0-9.]+\)/gi, 'background:rgba(220,232,250,0.60)');
        s = s.replace(/background:\s*rgba\(18,\s*20,\s*26,\s*[0-9.]+\)/gi, 'background:rgba(248,249,251,0.95)');

        // ── Gradient rgba dark values ──
        s = s.replace(/rgba\(5,\s*7,\s*10,\s*0\.(8|9)[0-9]*\)/gi, 'rgba(242,244,247,0.92)');
        s = s.replace(/rgba\(5,\s*7,\s*10,\s*0\.[456][0-9]*\)/gi, 'rgba(242,244,247,0.70)');
        s = s.replace(/rgba\(5,\s*7,\s*10,\s*0\.[123][0-9]*\)/gi, 'rgba(242,244,247,0.35)');
        s = s.replace(/#0d1e38/gi, '#dce8f8');
        s = s.replace(/#1a2f50/gi, '#c8daf0');
        s = s.replace(/#1a3560/gi, '#c4d8f0');
        s = s.replace(/#2a5080/gi, '#a0c0e0');
        s = s.replace(/#0d1828/gi, '#dce8f8');

        // ── Text ──
        s = s.replace(/(^|[;:{,\s])color:\s*#fff([;}\s!]|$)/gi, '$1color:#111$2');
        s = s.replace(/(^|[;:{,\s])color:\s*rgba\(255,\s*255,\s*255,\s*(0\.[0-9]+)\)/gi, (_, pre, a) => {
            const v = parseFloat(a);
            const out = v >= 0.70 ? 0.80 : v >= 0.55 ? 0.65 : v >= 0.42 ? 0.52 : v >= 0.30 ? 0.40 : 0.28;
            return `${pre}color:rgba(0,0,0,${out})`;
        });

        // ── Borders ──
        s = s.replace(/border:\s*([\d.]+px)\s+solid\s+rgba\(255,\s*255,\s*255,\s*(0\.[0-9]+)\)/gi, (_, w, a) => {
            const v = parseFloat(a);
            const out = v >= 0.50 ? 0.32 : v >= 0.18 ? 0.14 : v >= 0.10 ? 0.10 : 0.07;
            return `border:${w} solid rgba(0,0,0,${out})`;
        });
        s = s.replace(/border-bottom:\s*\.5px\s+solid\s+rgba\(255,\s*255,\s*255,\s*(0\.[0-9]+)\)/gi,
            (_, a) => `border-bottom:.5px solid rgba(0,0,0,${Math.round(parseFloat(a) * 0.6 * 100) / 100})`);
        s = s.replace(/border-top:\s*1px\s+solid\s+rgba\(255,\s*255,\s*255,\s*(0\.[0-9]+)\)/gi,
            (_, a) => `border-top:1px solid rgba(0,0,0,${Math.round(parseFloat(a) * 0.6 * 100) / 100})`);

        // ── Shadows ──
        s = s.replace(/box-shadow:\s*0\s+16px\s+40px\s+rgba\(0,0,0,[0-9.]+\)/gi, 'box-shadow:0 8px 24px rgba(0,0,0,0.12)');
        s = s.replace(/box-shadow:\s*0\s+20px\s+40px\s+rgba\(0,0,0,[0-9.]+\)/gi, 'box-shadow:0 6px 18px rgba(0,0,0,0.10)');
        s = s.replace(/box-shadow:\s*0\s+12px\s+32px\s+rgba\(0,0,0,[0-9.]+\)/gi, 'box-shadow:0 5px 14px rgba(0,0,0,0.09)');
        s = s.replace(/box-shadow:\s*3px\s+3px\s+1[24]px\s+rgba\(0,0,0,[0-9.]+\)/gi, 'box-shadow:2px 2px 8px rgba(0,0,0,0.12)');
        s = s.replace(/box-shadow:\s*4px\s+4px\s+1[26]px\s+rgba\(0,0,0,[0-9.]+\)/gi, 'box-shadow:2px 2px 8px rgba(0,0,0,0.12)');

        el.setAttribute('style', s);
    });

    // SVG attribute stroke overrides
    const strokeMap = {
        'rgba(255,255,255,0.55)': 'rgba(0,0,0,0.45)',
        'rgba(255,255,255,0.40)': 'rgba(0,0,0,0.35)',
        'rgba(255,255,255,0.35)': 'rgba(0,0,0,0.30)',
        'rgba(255,255,255,0.30)': 'rgba(0,0,0,0.26)',
        'rgba(255,255,255,0.25)': 'rgba(0,0,0,0.22)',
        'rgba(255,255,255,0.22)': 'rgba(0,0,0,0.20)',
        'rgba(255,255,255,0.20)': 'rgba(0,0,0,0.18)',
    };
    root.querySelectorAll('[stroke]').forEach(el => {
        const v = el.getAttribute('stroke');
        if (strokeMap[v]) el.setAttribute('stroke', strokeMap[v]);
    });
}

// ── Identity Hub Panel Navigation ─────────────────────────────

function ihShow(panelId) {
    ['ih-hub', 'ih-base', 'ih-persona'].forEach(id => {
        const el = fw(id);
        if (el) el.style.display = (id === panelId) ? 'flex' : 'none';
    });
}

function ihBack() { ihShow('ih-hub'); }

function ihOpenBase() { ihShow('ih-base'); }

function ihOpenPersona(alias, initial, bg, color, isNew) {
    const panel = fw('ih-persona');
    if (!panel) return;
    // Set title
    const title = fw('ih-persona-title');
    if (title) title.textContent = isNew ? 'Create Persona' : 'Edit Persona';
    // Set save button text
    const saveBtn = fw('ih-persona-save-btn');
    if (saveBtn) saveBtn.textContent = isNew ? 'Create Persona' : 'Save Persona';
    // Set alias
    const aliasInput = fw('ih-alias-input');
    if (aliasInput) aliasInput.value = isNew ? '' : alias;
    // Seed interest tags for existing personas
    const tagContainer = fw('ih-persona-tags');
    if (tagContainer) {
        tagContainer.innerHTML = '';
        if (!isNew && alias === 'Alex_UX') {
            ['UX Design', 'Architecture', 'SaaS'].forEach(t => ihAddTagDirect('ih-persona-tags', t));
        } else if (!isNew && alias === 'CoffeeSnob') {
            ['Culture', 'Brewing', 'Travel'].forEach(t => ihAddTagDirect('ih-persona-tags', t));
        }
    }
    ihShow('ih-persona');
}

// Tag helpers
function ihAddTag(containerId, inputId) {
    const input = fw(inputId);
    if (!input) return;
    const val = input.value.trim();
    if (!val) return;
    ihAddTagDirect(containerId, val);
    input.value = '';
}

function ihAddTagDirect(containerId, text) {
    const container = fw(containerId);
    if (!container) return;
    const span = document.createElement('span');
    span.className = 'ih-tag';
    span.onclick = function () { ihRemoveTag(this); };
    span.style.cssText = 'display:inline-flex;align-items:center;gap:5px;background:rgba(92,148,233,0.12);border:.5px solid rgba(92,148,233,0.35);border-radius:9999px;padding:5px 12px;font-size:9.5px;font-weight:600;color:#5C94E9;cursor:pointer;font-family:Montserrat,sans-serif;';
    span.innerHTML = `${text} <svg width="9" height="9" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`;
    container.appendChild(span);
}

function ihRemoveTag(el) {
    el.style.transform = 'scale(0)';
    el.style.opacity = '0';
    el.style.transition = 'all .15s ease';
    setTimeout(() => el.remove(), 150);
}

// Toggle switch
function ihToggle(id) {
    const el = fw(id);
    if (!el) return;
    const isOn = el.style.background === 'rgb(92, 148, 233)' || el.style.background === '#5C94E9';
    const dot = el.querySelector('div');
    if (isOn) {
        el.style.background = 'rgba(255,255,255,0.12)';
        if (dot) { dot.style.left = '2px'; dot.style.right = ''; }
    } else {
        el.style.background = '#5C94E9';
        if (dot) { dot.style.right = '2px'; dot.style.left = 'auto'; }
    }
}

// OTP demo (base profile panel)
function ihOTPDemo(btn, type) {
    const overlay = fw('ih-otp-overlay');
    const typeEl = fw('ih-otp-type');
    if (typeEl) typeEl.textContent = type;
    if (overlay) { overlay.style.display = 'flex'; }
    // Brief "Sent ✓" feedback on the text link
    const prev = btn.textContent;
    btn.textContent = 'Sent ✓';
    btn.style.color = '#10B981';
    setTimeout(() => { btn.textContent = prev; btn.style.color = '#EF4444'; }, 2500);
}

function ihOTPConfirm() {
    const overlay = fw('ih-otp-overlay');
    if (overlay) overlay.style.display = 'none';
}

function ihOTPCancel() {
    const overlay = fw('ih-otp-overlay');
    if (overlay) overlay.style.display = 'none';
}

// OTP demo (persona panel)
function ihPersonaOTPConfirm() {
    const overlay = fw('ih-persona-otp-overlay');
    if (overlay) overlay.style.display = 'none';
}

function ihPersonaOTPCancel() {
    const overlay = fw('ih-persona-otp-overlay');
    if (overlay) overlay.style.display = 'none';
}

// Save handlers (demo — show confirmation then go back)
function ihSaveBase() {
    const btn = document.getElementById('phone-inner')?.querySelector('[onclick="ihSaveBase()"]');
    if (btn) { btn.textContent = '✓ Saved'; btn.style.background = 'rgba(16,185,129,0.15)'; btn.style.boxShadow = 'none'; btn.style.border = '1px solid rgba(16,185,129,0.35)'; btn.style.color = '#10B981'; }
    setTimeout(() => ihShow('ih-hub'), 1200);
}

function ihSavePersona() {
    const btn = fw('ih-persona-save-btn');
    if (btn) { btn.textContent = '✓ Saved'; btn.style.background = 'rgba(16,185,129,0.15)'; btn.style.boxShadow = 'none'; btn.style.border = '1px solid rgba(16,185,129,0.35)'; btn.style.color = '#10B981'; }
    setTimeout(() => ihShow('ih-hub'), 1200);
}

function ihLogout() {
    const btn = document.getElementById('phone-inner')?.querySelector('[onclick="ihLogout()"]');
    if (btn) { btn.textContent = 'Logging out…'; btn.style.color = 'rgba(255,255,255,0.40)'; }
    setTimeout(() => goTo(4), 900);
}

// ── Expose all interactive functions to window so onclick="" works inside cloned screens
window.goTo = goTo;
window.next = next;
window.prev = prev;
window.toggleMode = toggleMode;
window.feedBookShelf = feedBookShelf;
window.feedBookDetails = feedBookDetails;
window.feedInitiateBuy = feedInitiateBuy;
window.feedBuyClose = feedBuyClose;
window.feedBuySuccess = feedBuySuccess;
window.feedBuyDone = feedBuyDone;
window.feedStageRSVP = feedStageRSVP;
window.feedStageClose = feedStageClose;
window.feedStageConfirm = feedStageConfirm;
window.feedSponsoredSchedule = feedSponsoredSchedule;
window.feedSponsorClose = feedSponsorClose;
window.feedSponsorConfirm = feedSponsorConfirm;
window.calSelect = calSelect;
window.slotSelect = slotSelect;
window.sendSandboxNote = sendSandboxNote;
window.sbHandshake = sbHandshake;
window.sbIndraJoin = sbIndraJoin;
window.sbIndraDismiss = sbIndraDismiss;
window.sbToggleMute = sbToggleMute;
window.sbLeave = sbLeave;
window.sbBloom = sbBloom;
window.initiateHandshake = initiateHandshake;
window.acceptTableHandshake = acceptTableHandshake;
window.acceptThirdHandshake = acceptThirdHandshake;
window.toggleMute = toggleMute;
window.requestVideo = requestVideo;
window.declineVideo = declineVideo;
window.acceptVideo = acceptVideo;
window.disableVideo = disableVideo;
window.requestPlantRoot = requestPlantRoot;
window.ihBack = ihBack;
window.ihOpenBase = ihOpenBase;
window.ihOpenPersona = ihOpenPersona;
window.ihAddTag = ihAddTag;
window.ihRemoveTag = ihRemoveTag;
window.ihToggle = ihToggle;
window.ihOTPDemo = ihOTPDemo;
window.ihOTPConfirm = ihOTPConfirm;
window.ihOTPCancel = ihOTPCancel;
window.ihPersonaOTPConfirm = ihPersonaOTPConfirm;
window.ihPersonaOTPCancel = ihPersonaOTPCancel;
window.ihSaveBase = ihSaveBase;
window.ihSavePersona = ihSavePersona;
window.ihLogout = ihLogout;

// ── Keyboard navigation
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
});

// Init on load
document.addEventListener('DOMContentLoaded', () => {
    SCREENS = Array.from(document.querySelectorAll('#screens > div'));
    updateUI();
});