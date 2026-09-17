import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api.js";

/*
  الأقسام الرئيسية
  الاسم هنا ثابت للتصميم فقط،
  أما الأدوية نفسها وأسماؤها فتأتي من الـ API.
*/

const categories = [
  {
    key: "all",
    label: "الكل",
    icon: "💊",
  },
  {
    key: "الأورام",
    label: "الأورام",
    icon: "🩺",
  },
  {
    key: "الضغط والقلب",
    label: "الضغط والقلب",
    icon: "❤️",
  },
  {
    key: "السكري",
    label: "السكري",
    icon: "🩸",
  },
  {
    key: "الجهاز الهضمي",
    label: "الجهاز الهضمي",
