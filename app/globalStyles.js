// styles/globalStyles.js
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff", // blanco
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#000000", // negro
        textAlign: "center",
        marginBottom: 30,
    },
    button: {
        backgroundColor: "#000000", // negro
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginVertical: 10,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff", // blanco
        fontSize: 16,
        fontWeight: "600",
    },
    logoutButton: {
        backgroundColor: "#000000", // negro
    },
    infoBox: {
        backgroundColor: "#ffffff", // blanco
        padding: 20,
        borderRadius: 10,
        elevation: 2,
        shadowColor: "#000000", // negro
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    infoText: {
        fontSize: 16,
        color: "#000000", // negro
        textAlign: "center",
    },
    card: {
        backgroundColor: "#ffffff", // blanco
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 2,
    },
    cardText: {
        fontSize: 16,
        color: "#000000", // negro
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#000000", // negro
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff", // blanco
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#000000", // negro
    },
    errorText: {
        fontSize: 16,
        color: "#000000", // negro
        textAlign: "center",
    }
});

export default globalStyles;
