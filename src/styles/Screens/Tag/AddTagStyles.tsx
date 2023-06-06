import { StyleSheet } from "react-native";
import { COLORS } from "../../../library/CommonColors";

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: "15%",
    },
    button: {
        justifyContent: 'center',
        width: '50%',
        position: 'absolute',
        bottom: 8,
        paddingHorizontal: '25%',
        backgroundColor: COLORS.clickableColor,
        color: COLORS.background,
        height: 45,
        borderRadius : 17,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.5,
        shadowOffset: { width: 4, height: 4},
        elevation: 5,
    },
    colorContainer: {
        width: "95%",
        justifyContent: 'center',
        backgroundColor: COLORS.componentBackground,
        padding: 15,
        borderRadius: 15,
    },
    colorTag: {
        width: 20, 
        aspectRatio: 1.05, 
        borderRadius: 10,
    },
    textColorTag: {
        width: "100%",
        textAlign: 'center',
        marginTop: 15,
        color: COLORS.foreground
    },
    resultColorContainer: {
        display: 'flex', 
        flexDirection: 'row',
    },
    textHolder: {
        fontSize: 13,
        fontWeight: '800',
        color: COLORS.foregroundHolder,
        textAlign: 'left',
        marginRight: 20,
        marginBottom: 10,
    },
    titleScrollView: {
        marginTop: "20%",
    },
});