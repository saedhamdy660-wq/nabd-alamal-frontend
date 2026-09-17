/* =========================
   DONOR FIELDS
========================= */

.signup-field select,
.signup-field input[type="date"] {
  width: 100%;
  height: 64px;

  margin: 0;

  padding: 0 54px 0 48px;

  border: 1px solid rgba(13, 156, 150, 0.13);
  border-radius: 22px;

  background: rgba(255, 255, 255, 0.76);

  color: #245f72;

  font-family: inherit;
  font-size: 16px;
  font-weight: 600;

  outline: none;

  box-shadow:
    0 8px 25px rgba(8, 127, 123, 0.07),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;

  direction: rtl;

  appearance: none;
  -webkit-appearance: none;
}


/* النص الافتراضي داخل الخانة */

.signup-field select:invalid {
  color: #7b9ea1;
}


/* الاختيارات بعد الاختيار */

.signup-field select option {
  background: white;
  color: #245f72;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
}


/* تاريخ آخر تبرع */

.signup-field input[type="date"] {
  color: #7b9ea1;
}


/* عندما يتم اختيار تاريخ */

.signup-field input[type="date"]:valid {
  color: #245f72;
}


/* أيقونة التقويم */

.signup-field input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0.65;
  cursor: pointer;
}


/* عند الضغط */

.signup-field select:focus,
.signup-field input[type="date"]:focus {
  border-color: rgba(13, 156, 150, 0.3);

  background: rgba(255, 255, 255, 0.9);

  box-shadow:
    0 8px 25px rgba(8, 127, 123, 0.1),
    0 0 0 3px rgba(10, 168, 143, 0.06);

  outline: none;
}
