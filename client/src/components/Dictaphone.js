import { useTheme } from '@material-ui/core'
import React, {useEffect,useState} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


const Dictaphone = ({GetVoiceValue}) => {
  const { transcript, resetTranscript } = useSpeechRecognition()
  const [userNum, setuserNum] = useState("1234")
  useEffect(() => {
    SpeechRecognition.startListening()  
      // setTimeout(() => {
    console.log("-------------useEffect------------")
  console.log(userNum.userNum)
  // handleValueChange()
  // SetVoiceValue()
    // }, 7000)

     setTimeout(() => {
        // handleValueChange()
        // handleValueChange()
          }, 7000)
  }, [])



 
  

 function handleValueChange(e){
   setTimeout(7000)
   SetVoiceValue()
   setuserNum(
    {
      // transcript : e.target.value,
      userNum : transcript,

    }
    
  )
  console.log("-------------handlevalue------------")
    console.log(userNum.userNum)
  console.log(transcript)
  SetVoiceValue()

}

function SetVoiceValue(){
  // setTimeout(() => {
  //   setuserNum(
  //     {
  //       // transcript : e.target.value,
  //       userNum : transcript,
  
  //     })  
  //   }, 2000)
  console.log("보이스 값 추출")
  GetVoiceValue(userNum.userNum)
  console.log("-------------setvoice------------")
    console.log(userNum.userNum)  
}



  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <div>
      {/* <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button> */}
      {/* <input type ="text" name={usernum} value={transcript} onChange={handleValueChange.bind(this)}></input> */}
      <input id="VoiceInput" type ="text" value={transcript||""} onChange={handleValueChange.bind(this)} onChange={handleValueChange} ></input>
      <p>{transcript}</p>
      {/* <p>사{userNum.userNum}이</p> */}
    </div>
  )
}
export default Dictaphone