import {View} from "native-base";
import Pdf, {Source} from "react-native-pdf";
import {Dimensions, StyleSheet} from "react-native";
import {useAppSelector} from "../store/hooks";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});

export const PDFViewer = ()=>{
    const selectedPDF = useAppSelector(state => state.commonReducer.selectedPDF)
    return (
        selectedPDF?<View style={styles.container}>
            <Pdf
                source={selectedPDF}
                onLoadComplete={(numberOfPages,filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}/>
        </View>:<View></View>
    )
}
