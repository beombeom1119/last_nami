import { blue } from '@material-ui/core/colors'
import React from 'react'
import {useState} from 'react'

const VoiceTest = () => {
    const [text1, settext1] = useState("")
    
    const style = {
        'color' : 'blue',
        'text-align' : 'center',

    }
    const handleValue = (e) =>
    {
        settext1(
            [e.target.name] = e.target.value    
        )
        
        console.log(text1)
    }


    return (
        <div style={style}>
        <a>하하</a>
        <input className="input1" type="text" name={text1} onChange={handleValue.bind(this)}/>
        </div>
    )
}

export default VoiceTest
