import React, { Component } from 'react'
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default class Qrcodecl extends Component {
    
    constructor(props) {   // 초기 설정
        super(props);
        this.state = {
            data : "Not Found"
        }
    }
    render() {
        return (
            <>
            <BarcodeScannerComponent
              width={200}
              height={200}
              onUpdate={(err, result) => {
                if (result) {
                    this.setState(
                        {
                            data: result.text,
                        });
                }
                else{
                this.setState(
                    {
                        data: "Not Found",
                    });
                }
              }}
            />
            <p>{this.state.data}</p>
          </>
        )
    }

}
