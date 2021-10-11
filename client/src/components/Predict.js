import React, { Component } from 'react'
import { post } from 'axios';
import '../App.css';
import HairPredict from './Hair-predict';
import html2canvas from 'html2canvas';
import $ from 'jquery';
import Modal from "react-modal";
Modal.setAppElement("#root");

export default class Predict extends Component {
    static defaultProps = {
        isLogin: "",
        name: "",
    }
    constructor(props) {
        super(props);
        this.state = {
            userNum: this.props.userNum,
            high: "",
            middle: "",
            low: "",
            good: "",
            isLogin: null,
            isOpen: false
        }
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addpredict = this.addpredict.bind(this)
    }

    stateRefresh = () => {
        console.log("checkpoin4")
        this.setState(
            {
                predict: "",
                completed: 0
            }
        );

        this.callApi().then(res => this.setState({ predict: res })).catch(err => console.log(err))
    }


    toggleModal = () => {
        this.setState(
            { isOpen: !this.state.isOpen }
        );

        if (this.state.isOpen===true) {
            console.log("true")
           window.location.href="/"
            
        } else if(this.state.isOpen===false) {
           setTimeout(() => {
            document.getElementById("BtnClose").click();
            console.log("false")   
           }, 3000);
            

        }



        
       
    }


componentDidMount()
{
    setTimeout(() => {
        let bts = 1;
        if(this.state.high!="" && bts ==1){
                document.getElementById("submitButton").click();
            }
    }, 10000);
}



    handleFormPredict = (e) => {  // 측정 버튼 클릭시
        this.downImg()
        e.preventDefault()
        console.log("checkpoint2")

        this.addpredict()
            .then((response) => {
                console.log("!!!!!!!" + response.data);
            })

        this.setState(
            { isOpen: !this.state.isOpen }
        );
        this.toggleModal()  }

    downImg() {     /// 이미지 다운로드
        const filename = this.state.userNum;
        const date = new Date();
        console.log(`${date.getDate() + 1}`)
        html2canvas($("#WebCam")[0]).then(function (canvas) {
            var myImage = canvas.toDataURL();
            console.log("myImage: "+myImage)
            var link = document.createElement("a")
            link.download = `${filename}`;
            link.href = myImage;
            console.log("link : "+link.href)
            document.body.appendChild(link);
            link.click();
        });
    }



    GetTeachValue = (data1, data2, data3, data4) => {
        this.setState({
            high: data1,
            middle: data2,
            low: data3,
            good: data4,
        })
    }

    handleValueChange = (e) => {
        console.log("checkpoint1")
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)
    }

    addpredict = () => {
        const url = '/api/predict';
        const formData = new FormData();
        formData.append('userNum', this.props.userNum);
        formData.append('high', this.state.high * 100);
        formData.append('middle', this.state.middle * 100);
        formData.append('low', this.state.low * 100);
        formData.append('good', this.state.good * 100);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

  

                        render() {
                    
                        return (
                        <div className="PredictPage">
                        {
                        this.props.isLogin ? (
                        <div className="Predict-form">
                        <h1>{this.props.isLogin}</h1>
                        {this.state.high === "" ? (<div id="outspinner">Loading...<hr /><hr /><div id="spinner"></div><hr /><hr /></div>) : (<div></div>)}
                        <div><HairPredict GetTeachValue={this.GetTeachValue} /></div>
                        <hr /><hr />
                        <form onSubmit={this.handleFormPredict}>
                        <input id="HighClass" type="text" name="high" value={"고위험 : " + this.state.high * 100} onChange={this.handleValueChange}  maxLength='2'></input>
                        <input type="text" id="MiddleClass" name="middle" value={"위   험 : " + this.state.middle * 100} onChange={this.handleValueChange}  maxLength='2'></input>
                        <br></br><input type="text" id="LowClass" name="low" value={"경   고 : " + this.state.low * 100} onChange={this.handleValueChange}  maxLength='2'></input>
                        <input type="text" id="GoodClass" name="good" value={"좋   음 : " + this.state.good * 100} onChange={this.handleValueChange} maxLength='2'></input>
                        <input type="hidden" value={this.props.name} ></input>
                        <button id="submitButton" type="submit">Submit</button>
                        </form>
                    
                        <Modal
                            isOpen={this.state.isOpen}
                            onRequestClose={this.toggleModal}
                            contentLabel="My dialog"
                        >
                            <div>전송을 완료했습니다!</div><br/>
                            <div>자세한 내용은 앱을 이용해 주세요</div><br/>
                            <button id="BtnClose" onClick={this.toggleModal}>닫기</button>
                        </Modal>
                    </div>) : (<div></div>)
                }
            </div>
        )
    }
}