import React from 'react'
import {firebaseApp, rsf} from 'firebase'

const AppContext = React.createContext({
    firebaseApp, rsf, user: {}
})

export default AppContext