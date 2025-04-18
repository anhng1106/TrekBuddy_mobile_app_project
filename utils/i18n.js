import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const i18n = new I18n({
  en: {
    email: "Email",
    username: "Username",
    password: "Password",
    confirmPassword: "Confirm Password",
    signIn: "Sign In",
    signUp: "Sign Up",
    noAccountYet: "Don't have an account yet?",
    alreadyHaveAccount: "Already have an account?",
    missingFields: "Missing Fields",
    fillEmailPassword: "Please fill in both email and password.",
    fillAllFields: "Please fill in all fields before signing up.",
    passwordsMismatch: "Passwords do not match",
    ensurePasswordsSame: "Please ensure both passwords are the same.",
    emailNotVerified: "Email Not Verified",
    verifyEmailBeforeLogin: "Please verify your email before logging in.",
    verifyEmailTitle: "Verify Your Email",
    verifyEmailMsg:
      "A verification email has been sent to your email address. Please verify your email before logging in.",
    loginFailed: "Login Failed",
    signupFailed: "Sign Up Failed",
    userNotFound: "No user found with this email. Please sign up.",
    wrongPassword: "Incorrect password. Please try again.",
    invalidEmail: "Invalid email format. Please enter a valid email.",
    tooManyRequests: "Too many login attempts. Please try again later.",
    genericLoginError: "Please check your email or password and try again.",
    emailInUse: "Email Already Exists",
    useDifferentEmail:
      "The email address is already in use by another account. Please use a different email.",

    email: "Email",
    password: "Password",
    signIn: "Sign In",
    signUp: "Sign Up",
    noAccountYet: "Do not have an account yet?",
    missingFields: "Missing Fields",
    fillEmailPassword: "Please fill in both email and password.",
    emailNotVerified: "Email Not Verified",
    verifyEmailBeforeLogin: "Please verify your email before logging in.",
    loginFailed: "Login Failed",
    userNotFound: "No user found with this email. Please sign up.",
    wrongPassword: "Incorrect password. Please try again.",
    invalidEmail: "Invalid email format. Please enter a valid email.",
    tooManyRequests: "Too many login attempts. Please try again later.",
    genericLoginError: "Please check your email or password and try again.",

    explore: "Explore",
    enterCity: "Enter country or city...",
    backToDestinations: "Back to Destination List",
    backToCities: "Back to Cities List",
    famousCities: "Famous Cities",
    famousDestinations: "Famous Destinations in",
    selectCollection: "Select a Collection",
    noCollections: "No collections found. Create one first.",
    close: "Close",
    addToFavorites: "Add to Favorite",
    showOnMap: "Show on Map",
    savedToAlbum: "has been saved to your album!",
    weather: "Show Weather",

    saved: "Saved",
    savedCollections: "Saved Collections",
    createNewCollection: "Create a New Collection",
    noItems: "No items saved in this collection.",
    newCollection: "New Collection",
    enterCollectionName: "Enter collection name",
    cancel: "Cancel",
    create: "Create",
    deleteCollectionConfirm: "Are you sure you want to delete",
    yes: "Yes",
    no: "No",
    deleteItemConfirm: 'Are you sure you want to delete "{{name}}"?',
    itemDeletedSuccess: `Item "{{name}}" deleted successfully.`,
    collectionCreatedSuccess: 'Collection "{{name}}" created successfully!',
    invalidCollectionName: "Please enter a valid collection name.",
    duplicateCollection: "A collection with this name already exists.",
    createCollectionFail: "Failed to create collection:",
    noUserDeleteCollection: "No user is signed in. Cannot delete collection.",
    collectionDeletedSuccess: 'Collection "{{name}}" deleted successfully.',
    itemDeleteFail: "Failed to delete item:",

    profile: "Profile",
    editUsername: "Edit Username",
    enterNewUsername: "Enter new username",
    email: "Email",
    save: "Save",
    cancel: "Cancel",
    signOut: "Sign Out",
    usernameEmptyError: "Username cannot be empty.",
    usernameUpdated: "Username updated successfully!",
    usernameUpdateFail: "Failed to update username: ",
    profilePicUpdated: "Profile picture updated successfully!",
    imageCanceled: "Image selection was canceled.",
    profilePicFailed: "Failed to update profile picture: ",
    fetchUserFail: "Failed to fetch user data: ",
    success: "Success",
    error: "Error",

    dataPolicy: "Data Protection Policy",
    dp1: "1. Introduction",
    dp1Text:
      "We are committed to protecting your personal data and ensuring its privacy, security, and confidentiality.",

    dp2: "2. Data Collection",
    dp2Text:
      "We collect personal data that you provide to us directly, such as when you create an account, use our services, or contact us for support.",

    dp3: "3. Data Use",
    dp3Text:
      "We use your personal data to provide and improve our services, communicate with you, and ensure the security of our platform.",

    dp4: "4. Data Sharing",
    dp4Text:
      "We do not share your personal data with third parties except as necessary to provide our services, comply with legal obligations, or protect our rights.",

    dp5: "5. Data Security",
    dp5Text:
      "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or misuse.",
    dp6: "6. Your Rights",
    dp6Text:
      "You have the right to access, correct, or delete your personal data, as well as the right to object to or restrict certain processing of your data.",

    dp7: "7. Contact Us",
    dp7Text:
      "If you have any questions or concerns about our data protection practices, please contact us at:",

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

    settings: "Settings",
    darkMode: "Dark Mode",
    language: "Language",
    switchToVietnamese: "Switch to Vietnamese",
  },
  vi: {
    username: "Tên người dùng",
    password: "Mật khẩu",
    confirmPassword: "Xác nhận mật khẩu",
    signIn: "Đăng nhập",
    signUp: "Đăng ký",
    noAccountYet: "Chưa có tài khoản?",
    alreadyHaveAccount: "Đã có tài khoản?",
    missingFields: "Thiếu thông tin",
    fillEmailPassword: "Vui lòng nhập đầy đủ email và mật khẩu.",
    fillAllFields: "Vui lòng điền đầy đủ thông tin trước khi đăng ký.",
    passwordsMismatch: "Mật khẩu không khớp",
    ensurePasswordsSame: "Vui lòng đảm bảo cả hai mật khẩu giống nhau.",
    emailNotVerified: "Email chưa được xác minh",
    verifyEmailBeforeLogin: "Vui lòng xác minh email trước khi đăng nhập.",
    verifyEmailTitle: "Xác minh Email",
    verifyEmailMsg:
      "Email xác minh đã được gửi đến địa chỉ email của bạn. Vui lòng xác minh trước khi đăng nhập.",
    loginFailed: "Đăng nhập thất bại",
    signupFailed: "Đăng ký thất bại",
    userNotFound: "Không tìm thấy người dùng với email này. Vui lòng đăng ký.",
    wrongPassword: "Mật khẩu không đúng. Vui lòng thử lại.",
    invalidEmail: "Định dạng email không hợp lệ. Vui lòng nhập email hợp lệ.",
    tooManyRequests: "Đăng nhập quá nhiều lần. Vui lòng thử lại sau.",
    genericLoginError: "Vui lòng kiểm tra lại email hoặc mật khẩu.",
    emailInUse: "Email đã được sử dụng",
    useDifferentEmail:
      "Địa chỉ email này đã được sử dụng bởi tài khoản khác. Vui lòng sử dụng email khác.",

    email: "Email",
    password: "Mật khẩu",
    signIn: "Đăng nhập",
    signUp: "Đăng ký",
    noAccountYet: "Bạn chưa có tài khoản?",
    missingFields: "Thiếu thông tin",
    fillEmailPassword: "Vui lòng điền cả email và mật khẩu.",
    emailNotVerified: "Email chưa được xác minh",
    verifyEmailBeforeLogin: "Vui lòng xác minh email trước khi đăng nhập.",
    loginFailed: "Đăng nhập thất bại",
    userNotFound: "Không tìm thấy người dùng với email này. Vui lòng đăng ký.",
    wrongPassword: "Sai mật khẩu. Vui lòng thử lại.",
    invalidEmail: "Email không hợp lệ. Vui lòng nhập đúng định dạng.",
    tooManyRequests:
      "Tài khoản bị khóa do đăng nhập quá nhiều lần. Vui lòng thử lại sau.",
    genericLoginError: "Vui lòng kiểm tra lại email hoặc mật khẩu của bạn.",

    explore: "Khám phá",
    enterCity: "Nhập quốc gia hoặc thành phố...",
    backToDestinations: "Trở lại danh sách điểm đến",
    backToCities: "Trở lại danh sách thành phố",
    famousCities: "Các thành phố nổi tiếng",
    famousDestinations: "Điểm đến nổi tiếng ở",
    selectCollection: "Chọn bộ sưu tập",
    noCollections: "Không tìm thấy bộ sưu tập nào. Hãy tạo mới.",
    close: "Đóng",
    addToFavorites: "Thêm vào Yêu thích",
    showOnMap: "Xem trên bản đồ",
    savedToAlbum: "đã được lưu vào album của bạn!",
    weather: "Xem thời tiết",

    saved: "Đã lưu",
    savedCollections: "Bộ sưu tập đã lưu",
    createNewCollection: "Tạo bộ sưu tập mới",
    noItems: "Không có mục nào trong bộ sưu tập này.",
    newCollection: "Bộ sưu tập mới",
    enterCollectionName: "Nhập tên bộ sưu tập",
    cancel: "Hủy",
    create: "Tạo",
    deleteCollectionConfirm: "Bạn có chắc muốn xóa",
    yes: "Có",
    no: "Không",
    deleteItemConfirm: 'Bạn có chắc muốn xóa địa điểm "{{name}}"?',
    error: "Lỗi",
    success: "Thành công",
    itemDeletedSuccess: 'Xóa địa điểm "{{name}}" thành công.',
    collectionCreatedSuccess: 'Tạo bộ sưu tập "{{name}}" thành công!',
    invalidCollectionName: "Vui lòng nhập tên bộ sưu tập hợp lệ.",
    duplicateCollection: "Bộ sưu tập này đã tồn tại.",
    createCollectionFail: "Không thể tạo bộ sưu tập:",
    noUserDeleteCollection: "Không có người dùng nào đang đăng nhập.",
    collectionDeletedSuccess: 'Xóa bộ sưu tập "{{name}}" thành công.',
    itemDeleteFail: "Xóa địa điểm thất bại:",

    profile: "Cá nhân",
    editUsername: "Đổi tên người dùng",
    enterNewUsername: "Nhập tên người dùng mới",
    email: "Email",
    save: "Lưu",
    cancel: "Hủy",
    signOut: "Đăng xuất",
    usernameEmptyError: "Tên người dùng không được để trống.",
    usernameUpdated: "Cập nhật tên người dùng thành công!",
    usernameUpdateFail: "Không thể cập nhật tên người dùng: ",
    profilePicUpdated: "Cập nhật ảnh đại diện thành công!",
    imageCanceled: "Đã hủy chọn ảnh.",
    profilePicFailed: "Không thể cập nhật ảnh đại diện: ",
    fetchUserFail: "Không thể tải dữ liệu người dùng: ",
    success: "Thành công",
    error: "Lỗi",
    dataPolicy: "Chính sách bảo mật dữ liệu",
    dp1: "1. Giới thiệu",
    dp1Text:
      "Chúng tôi cam kết bảo vệ dữ liệu cá nhân của bạn và đảm bảo quyền riêng tư, an toàn và bảo mật thông tin.",

    dp2: "2. Thu thập dữ liệu",
    dp2Text:
      "Chúng tôi thu thập dữ liệu cá nhân mà bạn cung cấp trực tiếp, chẳng hạn như khi bạn tạo tài khoản, sử dụng dịch vụ hoặc liên hệ hỗ trợ.",

    dp3: "3. Sử dụng dữ liệu",
    dp3Text:
      "Chúng tôi sử dụng dữ liệu cá nhân của bạn để cung cấp và cải tiến dịch vụ, giao tiếp với bạn, và đảm bảo an toàn cho nền tảng.",

    dp4: "4. Chia sẻ dữ liệu",
    dp4Text:
      "Chúng tôi không chia sẻ dữ liệu cá nhân với bên thứ ba trừ khi cần thiết để cung cấp dịch vụ, tuân thủ pháp luật hoặc bảo vệ quyền lợi của chúng tôi.",

    dp5: "5. Bảo mật dữ liệu",
    dp5Text:
      "Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ dữ liệu cá nhân khỏi truy cập trái phép, mất mát hoặc lạm dụng.",

    dp6: "6. Quyền của bạn",
    dp6Text:
      "Bạn có quyền truy cập, chỉnh sửa hoặc xóa dữ liệu cá nhân, cũng như quyền phản đối hoặc giới hạn việc xử lý dữ liệu của mình.",

    dp7: "7. Liên hệ",
    dp7Text:
      "Nếu bạn có bất kỳ câu hỏi hoặc mối quan tâm nào về chính sách bảo mật của chúng tôi, vui lòng liên hệ qua:",

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

    settings: "Cài đặt",
    darkMode: "Chế độ tối",
    language: "Ngôn ngữ",
    switchToVietnamese: "Chuyển sang tiếng Anh",
  },
});

i18n.locale = Localization.locale;
i18n.enableFallback = true;

export default i18n;
