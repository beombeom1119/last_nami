import React, { Component } from 'react'
import ResultTable from './TableBody'
import '../App.css';

export default class Table1 extends Component {
    constructor(props){
        super(props);
        this.state={
            userNum: this.props.userNum,
            name: this.props.name,
        }
    }
    
    stateRefresh= () => {           //state 초기화 
        this.setState(
          {
            result:'',
            completed:0
            
          });
          this.callApi().then(res=> this.setState({result:res})) 
          .catch(err=> console.log(err));
         
      }

      componentDidMount() {
        const login_info={
            method:"POST",
            body: JSON.stringify(this.state),
            headers:{
                "Content-Type":"application/json"
            }
        };
        fetch("/api/login",login_info).then(res => {
            return res.json();
        })
        this.timer = setInterval(this.progress,20);
        this.callApi().then(res=> this.setState({result:res})) 
        .catch(err=> console.log(err));    // 가져온 JSON값을 customers에 저장
      }
      
      callApi = async() =>{
        const response = await fetch('/api/result');  //server.js 에 있는 /api/customers JSON값을 가져온다
        const body = await response.json();
        console.log(body)
        return body;
        
      }
      
    render() {
        return (
          <>
          {/* <Left></Left> */}
            <div className="Content">
            <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  
</table>
             
           
{this.state.userNum} {this.state.name}
        <tablebody>
        {this.state.result ? this.state.result.map(result=> {return (<ResultTable key = {result.id} id = {result.id} userNum = {result.userNum} depth={result.depth} distance={result.distance} date={result.date} >  </ResultTable>)
        }): (<div>zxczx</div>)
        
        } </tablebody>

            </div>
            </>
        )
    }
}
