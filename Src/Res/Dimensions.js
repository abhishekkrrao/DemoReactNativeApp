'use strict'
import {Platform} from "react-native"
export default {
    titleFontSize: 20,
    headerHeight: Platform.OS=="ios"?80: 60,
    activeOpacity: 0.5
}
