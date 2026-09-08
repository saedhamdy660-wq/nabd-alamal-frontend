:root {
  --primary: #0aa88f;
  --primary-dark: #078876;
  --primary-light: #e6f7f4;
  --text-dark: #17332e;
  --text-muted: #6b7c79;
  --danger: #e23a3a;
  --danger-light: #fdecec;
  --success: #16a34a;
  --bg: #fafdfc;
  --card: #ffffff;
  --border: #edf2f1;
  --text: var(--text-dark);
  --muted: var(--text-muted);
  --radius-btn: 26px;
  --radius-card: 16px;
  --radius-input: 14px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Tajawal", "Segoe UI", Tahoma, Arial, sans-serif;
  background: var(--bg);
  color: var(--text);
  direction: rtl;
  -webkit-font-smoothing: antialiased;
}

.app-shell {
  max-width: 420px;
  margin: 0 auto;
  min-height: 100vh;
  background: var(--bg);
  padding-bottom: 84px;
  position: relative;
}

.page {
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  background: var(--card);
  border-bottom: 1px solid var(--border);
}

.header h1 {
  font-size: 18px;
  margin: 0;
  color: var(--primary);
  font-weight: 700;
}

.card {
  background: var(--card);
  border-radius: var(--radius-card);
  padding: 18px;
  margin-bottom: 14px;
  box-shadow: 0 2px 12px rgba(23, 51, 46, 0.04);
  border: 1px solid var(--border);
}

.card.urgent {
  background: var(--danger-light);
  border: 1px solid #f7cccc;
}

.btn {
  display: inline-block;
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: var(--radius-btn);
  background: var(--primary);
  color: white;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  text-align: center;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.btn:active {
  transform: scale(0.98);
  opacity: 0.92;
}

.btn.danger {
  background: var(--danger);
}

.btn.outline {
  background: white;
  color: var(--primary);
  border: 1.5px solid var(--primary);
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tab {
  flex: 1;
  padding: 11px;
  border-radius: 20px;
  text-align: center;
  background: var(--primary-light);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
}

.tab.active {
  background: var(--primary);
  color: white;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: var(--card);
  border-radius: var(--radius-card);
  margin-bottom: 10px;
  border: 1px solid var(--border);
}

.badge {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--primary-light);
  color: var(--primary-dark);
}

.muted {
  color: var(--muted);
  font-size: 13px;
}

.input-group {
  position: relative;
}

.input-group input {
  padding-right: 38px;
}

.input-icon {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  font-size: 14px;
  opacity: 0.6;
}

.leaflet-container {
  width: 100%;
  height: 100%;
  font-family: inherit;
}

input,
select {
  width: 100%;
  padding: 13px 14px;
  margin-top: 6px;
  border-radius: var(--radius-input);
  border: 1px solid #e2e8e6;
  background: white;
  font-family: inherit;
  font-size: 14px;
  color: var(--text-dark);
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--primary);
}

label.field-label {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 600;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 12px 18px;
  margin-bottom: 18px;
}

.search-bar input {
  border: none;
  padding: 0;
  margin: 0;
  flex: 1;
  background: transparent;
}

.search-bar input:focus {
  outline: none;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 420px;
  display: flex;
  justify-content: space-around;
  background: var(--card);
  border-top: 1px solid var(--border);
  padding: 10px 0 16px;
}

.bottom-nav a {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 11px;
  text-align: center;
  font-weight: 500;
}

.bottom-nav a.active {
  color: var(--primary);
  font-weight: 700;
}

.timeline-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 18px;
}

.timeline-dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #e5eceb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  flex-shrink: 0;
}

.timeline-dot.done {
  background: var(--primary);
}

.service-card {
  flex: 1;
  border-radius: var(--radius-card);
  padding: 20px 14px;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 12px rgba(23, 51, 46, 0.04);
}

.service-card.emergency {
  background: var(--danger-light);
  border: 1px solid #f7cccc;
}

.service-card.neutral {
  background: var(--primary-light);
  border: 1px solid #d7f0ea;
}

.service-card .icon {
  font-size: 30px;
  margin-bottom: 8px;
}

.service-card .title {
  font-weight: 700;
  font-size: 14px;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}


/* =========================================================
   SPLASH / WELCOME SCREEN
   ========================================================= */

.splash-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px;
  background: linear-gradient(
    160deg,
    var(--primary-dark),
    var(--primary) 60%,
    #17c2a6
  );
  color: white;
}

.splash-icon {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 44px;
  margin-bottom: 28px;
}

.splash-screen h1 {
  font-size: 27px;
  font-weight: 700;
  margin: 0 0 6px;
}

.splash-screen p {
  opacity: 0.92;
  margin: 4px 0;
}

.splash-tagline {
  margin-top: 40px;
  font-size: 15px;
  opacity: 0.88;
}

.splash-tagline strong {
  display: block;
  font-size: 18px;
  margin-top: 4px;
}

.splash-screen .btn {
  margin-top: 36px;
  background: white;
  color: var(--primary-dark);
}


/* =========================================================
   NABD AL-AMAL
   MODERN LOGIN SCREEN
   ========================================================= */

.login-page {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;

  display: flex;
  justify-content: center;

  background:
    radial-gradient(
      circle at 50% 25%,
      rgba(255, 255, 255, 0.98) 0%,
      rgba(232, 253, 249, 0.92) 25%,
      rgba(145, 232, 218, 0.78) 58%,
      rgba(37, 177, 166, 0.95) 100%
    );

  color: #075d63;
  direction: rtl;
}


/* --------------------------------
   Main content
-------------------------------- */

.login-content {
  width: min(100%, 520px);
  min-height: 100vh;

  padding:
    clamp(38px, 6vh, 70px)
    clamp(22px, 5vw, 45px)
    190px;

  position: relative;
  z-index: 10;

  display: flex;
  flex-direction: column;
  align-items: center;
}


/* --------------------------------
   Logo
-------------------------------- */

.login-logo-wrap {
  width: 150px;
  height: 150px;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 12px;
}

.login-logo {
  width: 112px;
  height: 112px;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  background:
    linear-gradient(
      145deg,
      #08cbb0,
      #058d94
    );

  box-shadow:
    0 18px 40px rgba(0, 133, 130, 0.28),
    inset 0 2px 12px rgba(255, 255, 255, 0.35);

  position: relative;
  z-index: 3;
}

.login-logo svg {
  width: 75px;
  height: 75px;
}

.login-logo-ring {
  position: absolute;

  border: 2px solid rgba(255, 255, 255, 0.65);

  border-radius: 50%;
}

.ring-one {
  width: 138px;
  height: 138px;

  animation: pulse-ring 3s ease-in-out infinite;
}

.ring-two {
  width: 150px;
  height: 150px;

  border-color: rgba(255, 255, 255, 0.28);

  animation: pulse-ring 3s ease-in-out infinite 0.5s;
}

@keyframes pulse-ring {
  0%,
  100% {
    transform: scale(0.96);
    opacity: 0.55;
  }

  50% {
    transform: scale(1.04);
    opacity: 1;
  }
}


/* --------------------------------
   Header
-------------------------------- */

.login-header {
  text-align: center;
  margin-bottom: 38px;
}

.login-header h1 {
  margin: 0;

  color: #075d63;

  font-size: clamp(34px, 8vw, 50px);
  font-weight: 800;

  line-height: 1.2;

  text-shadow:
    0 3px 12px rgba(0, 100, 100, 0.12);
}

.login-header p {
  margin: 10px 0 0;

  color: #568795;

  font-size: clamp(20px, 4.5vw, 28px);

  font-weight: 500;
}


/* --------------------------------
   Form
-------------------------------- */

.login-form {
  width: 100%;
}

.login-field {
  width: 100%;

  /* 48px */
  height: 48px;

  position: relative;

  margin-bottom: 18px;
}

.login-field input {
  width: 100%;

  /* 48px */
  height: 48px;

  margin: 0;

  padding:
    0 65px
    0 58px;

  border-radius: 24px;

  border: 1.5px solid rgba(77, 194, 198, 0.32);

  background:
    rgba(255, 255, 255, 0.72);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  box-shadow:
    0 8px 24px rgba(0, 125, 130, 0.07),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);

  color: #245f72;

  font-family: inherit;

  font-size: 18px;

  transition:
    border 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.login-field input::placeholder {
  color: #5d91a1;
  opacity: 0.95;
}

.login-field input:focus {
  outline: none;

  border-color: #0bb8a5;

  background: rgba(255, 255, 255, 0.9);

  box-shadow:
    0 0 0 4px rgba(8, 190, 169, 0.12),
    0 10px 28px rgba(0, 130, 130, 0.1);
}

.field-icon {
  position: absolute;

  top: 50%;

  transform: translateY(-50%);

  color: #147f8e;

  z-index: 2;

  display: flex;
  align-items: center;
}

.field-icon.right {
  right: 22px;
}

.field-svg {
  width: 28px;
  height: 28px;
}


/* --------------------------------
   Password eye
-------------------------------- */

.password-toggle {
  position: absolute;

  left: 20px;
  top: 50%;

  transform: translateY(-50%);

  width: 38px;
  height: 38px;

  border: none;
  background: transparent;

  color: #4c8199;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;
}

.password-toggle .field-svg {
  width: 26px;
  height: 26px;
}


/* --------------------------------
   Remember / Forgot
-------------------------------- */

.login-options {
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin:
    4px
    0
    25px;

  padding: 0 5px;

  color: #3e7284;

  font-size: 17px;
}

.remember-option {
  display: flex;

  align-items: center;

  gap:
