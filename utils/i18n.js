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
    aboutDescription:
      "TrekBuddy is your ultimate travel companion, designed to help you discover amazing places to visit. Our goal is to create a platform where users can explore new destinations and share their experiences with friends.",
    features: "Features",
    feature1: "Explore a wide range of travel destinations",
    feature2: "User-friendly interface for easy navigation",
    feature3: "Connect with friends and share your journeys",
    feature4: "Regular updates with new travel spots and features",
    contactUs: "Contact Us",
    contactDescription:
      "If you have any questions or feedback, please contact us at:",
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
    aboutDescription:
      "TrekBuddy là người bạn đồng hành tuyệt vời giúp bạn khám phá những địa điểm du lịch hấp dẫn. Mục tiêu của chúng tôi là xây dựng một nền tảng nơi người dùng có thể tìm kiếm điểm đến mới và chia sẻ trải nghiệm của mình.",
    features: "Tính năng",
    feature1: "Khám phá nhiều điểm đến du lịch hấp dẫn",
    feature2: "Giao diện thân thiện, dễ sử dụng",
    feature3: "Kết nối với bạn bè và chia sẻ hành trình",
    feature4: "Cập nhật thường xuyên các điểm đến và tính năng mới",
    contactUs: "Liên hệ",
    contactDescription:
      "Nếu bạn có câu hỏi hoặc góp ý, vui lòng liên hệ với chúng tôi tại:",
    darkMode: "Chế độ tối",
    language: "Ngôn ngữ",
    switchToVietnamese: "Chuyển sang tiếng Anh",
  },
});

i18n.locale = "en";
i18n.enableFallback = true;

export default i18n;
