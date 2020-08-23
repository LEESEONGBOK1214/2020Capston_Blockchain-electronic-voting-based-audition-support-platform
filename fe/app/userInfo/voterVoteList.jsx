import React from 'react'
import ReactDOM from 'react-dom';
const regeneratorRuntime = require("regenerator-runtime");
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Pagination from '@material-ui/lab/Pagination';

import '../smart.css';
import './css/voteTable.css';

import jQuery from "jquery";

window.$ = window.jQuery = jQuery;



const axios = require('axios');

class VoteTable extends React.Component{
    constructor(props){
        super(props);
        this.state = { vote: [], pageNum: 1 , count: 0};
        this.url = '/userInfo/voter/axios?page='+(this.state.pageNum-1)+'&size='+10+'&sort="id"';
    }
    setUrl(){
        this.url = '/userInfo/voter/axios?page='+(this.state.pageNum-1)+'&size='+10+'&sort="id"';
    }
    async componentDidMount(){
        let {data} = await axios.get(this.url)
        console.log("----------",data);
        this.state.count = Math.ceil((data.pop()*1.0)/10)
        this.setState({vote : data})
        
        console.log(this.state.count);
    }
    pagenation(e,page){
        console.log(page)
        this.state.pageNum = page
        this.setUrl()   
        this.componentDidMount()
    }
    render() {
        console.log(this.state.vote)
        return(
                <div id="tablebox">
 
                         <Paper >
                            <Table size="small" id="myTable">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="smart">번호</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell className="smart">시작시간</TableCell>
                                    <TableCell className="smart">종료시간</TableCell>
                                    <TableCell>결과 발표시간</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    <VoterVoteList  data={this.state.vote}/>    
                                </TableBody>
                            </Table>
                        </Paper>
                    <Pagination count={this.state.count} page={this.state.pageNum} onChange={this.pagenation.bind(this)}> </Pagination>


                </div>
        )
    }
}

class VoterVoteList extends React.Component {
    constructor(props){
        super(props);
    }


    render() {
        return  this.props.data.map((vote,index)=>{

            var start = String(vote.startTime);
            var end = String(vote.endTime);
            var resultShow = String(vote.resultTime);

            var stTime = start.substr(0,4)+"-"+start.substr(4,2)+"-"+start.substr(6,2)+" "+start.substr(8,2)+":"+start.substr(10,2);
            var edTime = end.substr(0,4)+"-"+end.substr(4,2)+"-"+end.substr(6,2)+" "+end. substr(8,2)+":"+end.substr(10,2);
            var rsTime = resultShow.substr(0,4)+"-"+resultShow.substr(4,2)+"-"+resultShow.substr(6,2)+" "+resultShow. substr(8,2)+":"+resultShow.substr(10,2);
            return (
                <TableRow key={'div'+index}>
                             
                <TableCell  className="smart">{vote.no}</TableCell>
                <TableCell><a href={'/vote/'+vote.no}>{vote.title}</a></TableCell>
                <TableCell className="smart">{stTime}</TableCell>
                <TableCell className="smart">{edTime}</TableCell>
                <TableCell>{rsTime}</TableCell>
               
             </TableRow>
               
               )
            
        })
        
    }
}


ReactDOM.render(<VoteTable/>,document.getElementById('voterVoteList'));

