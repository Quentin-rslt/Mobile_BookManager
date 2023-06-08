import { StyleSheet } from "react-native";
import { COLORS } from "../../../library/CommonColors";

export default StyleSheet.create({
    scrollViewContainer: {
        width: '100%',
        marginBottom: 10,
        marginTop: 90,
    },
    returnButton : {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        top: -40,
    },
    booksContainer: {
        paddingHorizontal: 15,
        marginTop: 20,
    },
    colorContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        paddingHorizontal: 15,
        marginTop: 20,
    },
    colorTag: {
        width: 20, 
        aspectRatio: 1.05, 
        borderRadius: 20,
    },
    textTag: {
        fontSize: 30,
        fontWeight: '800',
        color: COLORS.foreground,
        textAlign: 'center',
        marginBottom: 10,
    },
    textHolder: {
        fontSize: 13,
        fontWeight: '800',
        color: COLORS.foregroundHolder,
        textAlign: 'left',
        marginRight: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
})