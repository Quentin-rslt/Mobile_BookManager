import { StyleSheet } from "react-native";
import { COLORS } from "../../../library/CommonColors";

export default StyleSheet.create({
    modalContainer: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        position: 'absolute',
        bottom: 0,
        height: '60%',
        width: "100%",
        paddingBottom:100,
        backgroundColor: COLORS.componentBackground,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.5,
        shadowOffset: { width: -4, height: -4},
        elevation: -10,
    },
    colorPicker: {
        height: '100%',
        margin: 10,
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        width: "90%",
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: COLORS.clickableColor,
        color: COLORS.background,
        height: 45,
        borderRadius : 40,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.5,
        shadowOffset: { width: 4, height: 4},
        elevation: 5,
        bottom: 10,
    },
    returnButton : {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        top: -40,
    },
});