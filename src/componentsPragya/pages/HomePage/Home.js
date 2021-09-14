import React from 'react'
import Homepage from '../../Homepage'
import { homeObjOne } from './Data'


function Home() {
    return (
        <>
            <Homepage {...homeObjOne} />

        </>
    )
}

export default Home;
