
import React from 'react'
import { StatusBar } from 'react-native'
import Navigator from './Src/Routes/Routes'
export default () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Navigator />
        </>
    )
}
