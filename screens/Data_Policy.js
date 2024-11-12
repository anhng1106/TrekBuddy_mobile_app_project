import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Mailer from "react-native-mail";
import Share from "react-native-share";
import RNFS from "react-native-fs";
import { PDFDocument, PDFPage } from "react-native-pdf-lib";

const DataProtectionPolicyPage = ({ navigation }) => {
  // Function to build section titles with padding and styling
  const renderSectionTitle = (text) => (
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>{text}</Text>
    </View>
  );

  // Function to build paragraphs with padding and styling
  const renderParagraph = (text) => (
    <View style={styles.paragraphContainer}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );

  // Function to create an email link that opens the default mail app
  const renderEmailLink = (email) => (
    <TouchableOpacity
      onPress={() => {
        Mailer.mail(
          {
            subject: "Data Protection Inquiry",
            recipients: [email],
          },
          (error, event) => {
            if (error) {
              Alert.alert("Error", "Could not launch email client");
            }
          }
        );
      }}
    >
      <Text style={styles.emailLink}>{email}</Text>
    </TouchableOpacity>
  );

  // Function to generate PDF
  const downloadPDF = async () => {
    const pdfPath = `${RNFS.DocumentDirectoryPath}/DataProtectionPolicy.pdf`;
    const pdfDoc = await PDFDocument.create(pdfPath)
      .addPages(
        PDFPage.create()
          .setMediaBox(200, 300)
          .drawText("Data Protection Policy", {
            x: 5,
            y: 280,
            fontSize: 14,
            color: "#000000",
          })
          .drawText(
            "1. Introduction\nWe are committed to protecting your personal data and ensuring its privacy, security, and confidentiality.",
            { x: 5, y: 250, fontSize: 10, color: "#000000" }
          )
          .drawText(
            "2. Data Collection\nWe collect personal data that you provide to us directly, such as when you create an account, use our services, or contact us for support.",
            { x: 5, y: 220, fontSize: 10, color: "#000000" }
          )
          .drawText(
            "3. Data Use\nWe use your personal data to provide and improve our services, communicate with you, and ensure the security of our platform.",
            { x: 5, y: 190, fontSize: 10, color: "#000000" }
          )
          .drawText(
            "4. Data Sharing\nWe do not share your personal data with third parties except as necessary to provide our services, comply with legal obligations, or protect our rights.",
            { x: 5, y: 160, fontSize: 10, color: "#000000" }
          )
          .drawText(
            "5. Data Security\nWe implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or misuse.",
            { x: 5, y: 130, fontSize: 10, color: "#000000" }
          )
          .drawText(
            "6. Your Rights\nYou have the right to access, correct, or delete your personal data, as well as the right to object to or restrict certain processing of your data.",
            { x: 5, y: 100, fontSize: 10, color: "#000000" }
          )
          .drawText(
            "7. Contact Us\nIf you have any questions or concerns about our data protection practices, please contact us at support@example.com.",
            { x: 5, y: 70, fontSize: 10, color: "#000000" }
          )
      )
      .write(); // Saves the document

    // Share the PDF
    await Share.open({
      title: "Share PDF",
      url: `file://${pdfPath}`,
      type: "application/pdf",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Data Protection Policy</Text>
        <TouchableOpacity onPress={downloadPDF} style={styles.downloadButton}>
          <Icon name="download" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderSectionTitle("Data Protection Policy")}
        {renderSectionTitle("1. Introduction")}
        {renderParagraph(
          "We are committed to protecting your personal data and ensuring its privacy, security, and confidentiality."
        )}
        {renderSectionTitle("2. Data Collection")}
        {renderParagraph(
          "We collect personal data that you provide to us directly, such as when you create an account, use our services, or contact us for support."
        )}
        {renderSectionTitle("3. Data Use")}
        {renderParagraph(
          "We use your personal data to provide and improve our services, communicate with you, and ensure the security of our platform."
        )}
        {renderSectionTitle("4. Data Sharing")}
        {renderParagraph(
          "We do not share your personal data with third parties except as necessary to provide our services, comply with legal obligations, or protect our rights."
        )}
        {renderSectionTitle("5. Data Security")}
        {renderParagraph(
          "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or misuse."
        )}
        {renderSectionTitle("6. Your Rights")}
        {renderParagraph(
          "You have the right to access, correct, or delete your personal data, as well as the right to object to or restrict certain processing of your data."
        )}
        {renderSectionTitle("7. Contact Us")}
        {renderParagraph(
          "If you have any questions or concerns about our data protection practices, please contact us at:"
        )}
        {renderEmailLink("support@example.com")}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    position: "absolute",
    left: 5,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  downloadButton: {
    position: "absolute",
    right: 5,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitleContainer: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paragraphContainer: {
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
  },
  emailLink: {
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});

export default DataProtectionPolicyPage;
