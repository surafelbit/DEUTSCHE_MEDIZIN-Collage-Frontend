import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Import translation files
import enCommon from "../locales/en/common.json"
import enAuth from "../locales/en/auth.json"
import enStudent from "../locales/en/student.json"
import enTeacher from "../locales/en/teacher.json"
import enNavigation from "../locales/en/navigation.json"

import amCommon from "../locales/am/common.json"
import amAuth from "../locales/am/auth.json"
import amStudent from "../locales/am/student.json"
import amTeacher from "../locales/am/teacher.json"
import amNavigation from "../locales/am/navigation.json"

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    student: enStudent,
    teacher: enTeacher,
    navigation: enNavigation,
  },
  am: {
    common: amCommon,
    auth: amAuth,
    student: amStudent,
    teacher: amTeacher,
    navigation: amNavigation,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  debug: false,

  interpolation: {
    escapeValue: false,
  },

  ns: ["common", "auth", "student", "teacher", "navigation"],
  defaultNS: "common",
})

export default i18n
