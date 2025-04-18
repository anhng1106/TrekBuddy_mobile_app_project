import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import i18n from "../utils/i18n";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../ThemeContext";

const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Madrid", "Berlin", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Mars", "Earth"],
    correctAnswer: "Mercury",
  },
  {
    id: 3,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    correctAnswer: "Mars",
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: "Pacific",
  },
  {
    id: 5,
    question: "Which language is primarily spoken in Brazil?",
    options: ["Spanish", "Portuguese", "French", "English"],
    correctAnswer: "Portuguese",
  },
  {
    id: 6,
    question: "How many legs does a spider have?",
    options: ["6", "8", "10", "12"],
    correctAnswer: "8",
  },
  {
    id: 7,
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
  },
  {
    id: 8,
    question: "Which country is famous for the Great Wall?",
    options: ["India", "Japan", "China", "Thailand"],
    correctAnswer: "China",
  },
  {
    id: 9,
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
  },
  {
    id: 10,
    question: "Which instrument has keys, pedals, and strings?",
    options: ["Guitar", "Drum", "Flute", "Piano"],
    correctAnswer: "Piano",
  },
  {
    id: 11,
    question: "What is the capital city of Vietnam?",
    options: ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hue"],
    correctAnswer: "Hanoi",
  },
];

const QuizScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme === "light" ? lightTheme : darkTheme;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAnswer = async (option) => {
    if (hasAnswered) return;
    setSelectedOption(option);
    setHasAnswered(true);

    const isCorrect = option === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      await awardPoint();
      Alert.alert(i18n.t("correct"), i18n.t("youEarnedPoint"));
    } else {
      Alert.alert(i18n.t("wrong"), i18n.t("noPointsAwarded"));
    }
  };

  const awardPoint = async () => {
    const userRef = doc(db, "Users", auth.currentUser.uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data();
      await updateDoc(userRef, {
        points: (data.points || 0) + 1,
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      Alert.alert(i18n.t("quizCompleted"), `${i18n.t("yourScore")}: ${score}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon
            name="arrow-back"
            size={24}
            color={theme === "light" ? "#000" : "#fff"}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{i18n.t("quizGame")}</Text>
      </View>

      <Image source={require("../assets/quizgame.png")} style={styles.logo} />

      <Text style={styles.question}>{questions[currentQuestion].question}</Text>
      {questions[currentQuestion].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selectedOption === option && styles.selectedOption,
          ]}
          onPress={() => handleAnswer(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {hasAnswered && (
        <TouchableOpacity style={styles.button} onPress={nextQuestion}>
          <Text style={styles.buttonText}>{i18n.t("next")}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdeae2", // Light theme background
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fdeae2",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  logo: {
    width: "100%",
    height: "30%",
    alignSelf: "center",
    marginBottom: "2%",
    marginTop: "2%",
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  option: {
    backgroundColor: "#fff",
    padding: 14,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedOption: {
    borderColor: "#fc8fa7",
    backgroundColor: "#ffe3ec",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#fc8fa7",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

const darkTheme = {
  ...lightTheme,
  container: {
    ...lightTheme.container,
    backgroundColor: "#545454",
  },
  header: {
    ...lightTheme.header,
    color: "#fff",
  },
  headerTitle: {
    ...lightTheme.headerTitle,
    color: "#fff",
  },
  logo: {
    ...lightTheme.logo,
    height: "30%",
  },
  question: {
    ...lightTheme.question,
    color: "#fff",
  },
  option: {
    ...lightTheme.option,
    backgroundColor: "#333",
    borderColor: "#555",
  },
  optionText: {
    ...lightTheme.optionText,
    color: "#fff",
  },
};

export default QuizScreen;
