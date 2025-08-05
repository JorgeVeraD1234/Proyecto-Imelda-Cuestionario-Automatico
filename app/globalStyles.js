// styles/globalStyles.js
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2", // gris claro
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
        backgroundColor: "#333333", // gris oscuro
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
        backgroundColor: "#555555", // gris medio
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
        color: "#333333", // gris oscuro
        textAlign: "center",
    },
    card: {
        backgroundColor: "#f9f9f9", // gris muy claro
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
        color: "#333333", // gris oscuro
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2", // gris claro
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#777777", // gris medio
    },
    errorText: {
        fontSize: 16,
        color: "#555555", // gris medio en lugar de rojo
        textAlign: "center",
    }

});

export default globalStyles;
