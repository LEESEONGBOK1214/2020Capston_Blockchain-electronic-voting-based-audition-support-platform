import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Hotcard from './hotCard.jsx'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
const regeneratorRuntime = require("regenerator-runtime");
const axios = require('axios');


var url = document.location.href;
const num = url.split('/');
var param = num[num.length-2];

class Hotclib extends Component{

    constructor(props){
        super(props);
        this.state = { program: [], hotclib: [] , pageNum: 1 , count: 0, allCount:0, file : '', previewURL:'',sessionUser:''}
        // this.url = '/community2/'+param+'/hotclib';
        console.log(param);
        // this.url = '/community/'+param1+'/axios?page='+(this.state.pageNum-1)+'&size='+10+'&sort="date"';
        this.url = '/community/'+param+'/hotclib/axios';

        console.log(this.url);
    }

    pagenation(e,page){
        //console.log(page)
        this.state.pageNum = page
        this.setUrl()   
        this.componentDidMount()
    }
    
    async componentDidMount(){
       
        let {data : hotclib} = await axios.get(this.url)
       
        // this.state.allCount = (hotclib.pop())
        // this.state.count = Math.ceil((this.state.allCount*1.0)/10)
        
        // this.state.sessionUser = (hotclib.pop())

        this.setState({audition})
       
    }

    write(e){
        alert("등록 하시겠습니까?");
        location.href=document.location.href+"/write";
    }

    render(){
        console.log("안녕")
        console.log(this.state.hotclib)
        console.log(this.url);
        return(
            
           <div>
               <form action="/audition/search" method="get">
            <input name="keyword" type="text" placeholder="제목을 입력해주세요"/>
            <button>검색</button>
            </form>
            <br></br>
            <br></br>
                    {this.state.hotclib.map((hotclib,index)=>{
                       return (       
                        <a href={"/community/"+hotclib.program+"/hotclib/read/"+hotclib.hotclibid}>
                         <div className="ss" key={'div'+index}>
                             <div>
                            <div><img src={"/uploads/"+hotclib.filename2}/></div>
                            <div>제목 : {audition.atitle}</div>
                            <div>분야 : {audition.acategory}</div>
                            <div>모집시작일 : {audition.astartdate}</div>
                            <div>모집종료일 : {audition.aenddate} </div>
                            <div>모집인원 : {audition.arecruits}+ "명"</div>
                            <div>발표일 : {audition.aissue}</div>
                            <div>작성자 : {audition.ausername} </div>
                          
                            </div>
                     
                            </div>
                            </a>     
                              )
                            }
                         )
                     } 
                     <button type="button" onClick={this.upload.bind(this)}>글쓰기</button>
                 
           </div> 
            
        )
    }
}

ReactDOM.render(<Hotclib/>,document.getElementById('hotclib'));