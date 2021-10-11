import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function Qrcode({GetVoiceValue}) {
  const [data, setData] = React.useState("Not");
  

  function SetVoiceValue(){
    GetVoiceValue(data)
  }


  return (
    <>
      <BarcodeScannerComponent
        width={200}
        height={200}
        onUpdate={(err, result) => {
          if (result) {
            setData(data);
            SetVoiceValue()
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          }
          else setData("Not Found");
        }}
      />
      <p id="user">{data}</p>
    </>
  );
}

export default Qrcode;