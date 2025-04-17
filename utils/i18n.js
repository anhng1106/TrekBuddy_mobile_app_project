// i18n.js
import { I18n } from "i18n-js";

const i18n = new I18n({
  en: {
    explore: "Explore",
    saved: "Saved",
    settings: "Settings",
    profile: "Profile",
    dataPolicy: "Data Protection Policy",
    about: "About TrekBuddy",
    darkMode: "Dark Mode",
    language: "Language",
    switchToVietnamese: "Switch to Vietnamese",
  },
  vi: {
    explore: "Khám phá",
    saved: "Đã lưu",
    settings: "Cài đặt",
    profile: "Cá nhân",
    dataPolicy: "Chính sách bảo mật dữ liệu",
    about: "Giới thiệu TrekBuddy",
    darkMode: "Chế độ tối",
    language: "Ngôn ngữ",
    switchToVietnamese: "Chuyển sang tiếng Anh",
  },
});

i18n.locale = "en";
i18n.enableFallback = true;

export default i18n;
