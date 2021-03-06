import React, {Component}from 'react'
import ReactDOM from 'react-dom';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Pagination from '@material-ui/lab/Pagination';

import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import './Modal.css';
import '../smart.css';
import './css/popularBoard.css'

const regeneratorRuntime = require("regenerator-runtime");
const axios = require('axios');
  
var url = document.location.href;
var jj = url.split("?");
const num = jj[0].split('/');

var param = num[num.length-1];
var param2 = num[num.length-2];
var param3 = "";



class PopularBoard extends Component {
    
    constructor(props){
        
        super(props);
        this.state = { popularBoard: [] , pageNum: 1 , count: 0, allCount:0, modal : false, file : '', previewURL:'',sessionUser:'',option:'0',text:''} 
        this.url = '/community/'+param2+'/'+param+'/axios?page='+(this.state.pageNum-1)+'&size='+10+'&sort="date"&option='+this.state.option+'&text='+this.state.text;
      //  this.url = '/community/'+param2+'/'+param+'/axios?page='+(this.state.pageNum-1)+'&size='+10+'&sort="date"&option='+this.state.option+'&text='+this.text;
       
    }
    setUrl(){
      this.url = '/community/'+param2+'/'+param+'/axios?page='+(this.state.pageNum-1)+'&size='+10+'&sort="date"&option='+this.state.option+'&text='+this.state.text;
    }
    setText(e){
      this.state.text=e
    }
    pagenation(e,page){
        this.state.pageNum = page
        this.setUrl()   
        this.componentDidMount()
    }

    selectOption(event){
      this.setState({option : event.target.value});
    };

    async onSearchEvnet(){
      console.log("버튼 클릭");
      var text = document.getElementById("searchInput").value
      
      this.setText(text)
      this.setUrl()

      console.log(this.state.text)
      console.log(this.url)

      this.componentDidMount()

       }

    async componentDidMount(){

      $('header').addClass('changed');
      $("header").css("background-image","url('/uploads/"+$("#popLogoImg").val()+"')")
      
      $("header").css("background-position","center")
      $("header").css("background-repeat","no-repeat")
      $("header").css("background-size","contain")     

      // if(url.indexOf("text")!=-1){
      //   console.log("----")
      //             this.text = url.split("text=")[1];

      //       this.setUrl()
      //     }

      let {data : popularBoard} = await axios.get(this.url)
        
      this.state.allCount = (popularBoard.pop())
      this.state.count = Math.ceil((this.state.allCount*1.0)/10)
      this.state.sessionUser = (popularBoard.pop())

      this.setState({popularBoard})

    }

    handleOpenModal(){
        this.setState({modal:true});             
      };

      handleCloseModal(){
        this.setState({modal:false});
      };  



    render() {
     
        return(
        <div>

                         <Paper >
                            <Table size="small" id="myTable">
                            <TableHead>
                                <TableRow>
                                            <TableCell>번호</TableCell>
                                            <TableCell>제목</TableCell>
                                            <TableCell>작성자</TableCell>
                                            <TableCell className="smart">조회수</TableCell>
                                            <TableCell className="smart">작성일</TableCell>

                                </TableRow>
                                </TableHead>
                                <TableBody>

                                {this.state.popularBoard.map((c,index)=>{
                       
                                  return (
                           
                                    <TableRow key={'div'+index}>

                                        <TableCell key={index}>{c.rownum}</TableCell>
                                         <TableCell ><a href={`${param}/${c.id} `}>{c.title}</a></TableCell>
                                        {/* <TableCell><a onClick={this.handleOpenModal.bind(this,c)}>{c.title}</a></TableCell> */}
                                        <TableCell>{c.nickname}</TableCell>
                                        <TableCell className="smart">{c.viewCount} </TableCell>
                                        <TableCell className="smart">{c.date}</TableCell>
                                        </TableRow>
                                        
                           
                                    )
                                        
                                })
                                }
                                </TableBody>
                                    </Table>
                                    </Paper>
                                     {this.state.sessionUser!='' &&  <Modal sessionUser={this.state.sessionUser}></Modal> }{} 
                                     {/* {this.state.modal &&  <Modal2 boardItem={this.state.boardItem}></Modal2> }{} 
             */}

        <Pagination count={this.state.count} page={this.state.pageNum} onChange={this.pagenation.bind(this)}> </Pagination>
        
        <div className="search">


                            <Select name="option" 
                            value={this.state.option}
                              onChange={this.selectOption.bind(this)}
                              label="옵션"
                            >
                              <MenuItem value="0">
                                <em>선택없음</em>
                              </MenuItem>
                              <MenuItem value="1">제목</MenuItem>
                              <MenuItem value="2">제목+내용</MenuItem>
                              <MenuItem value="3">해쉬태그</MenuItem>
                              <MenuItem value="4">작성자</MenuItem>
                            </Select>

        <input type="text" id="searchInput" placeholder="검색"/>
        <button type="button" className="searchButton"onClick={this.onSearchEvnet.bind(this)}>검색</button>
        </div>
        </div> 
         )
    }
}


class Modal extends Component{
    constructor(props){
        super(props);
        
       this.state = { modal : false ,file : '', previewURL:'' , sessionUser : this.props.sessionUser }
        //, boardItem:this.props.boardItem
       

    }
      handleOpenModal(){
        
        this.setState({modal:true});
      };
      handleCloseModal(){

        this.setState({modal:false});
        this.setState({previewURL:''});
      };  

      checkImage(event){

        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
          this.setState({
            file : file,
            previewURL : reader.result
          })
        }
        reader.readAsDataURL(file);
      }

    render(){   
        console.log(this.state.sessionUser)
        let profile_preview = null;
        if(this.state.file !== ''){
          profile_preview = <img  className='profile_preview' src={this.state.previewURL}></img>
        }
        
              
                        return (
                            <div>
                            <button className="createBoard" type="button" onClick={this.handleOpenModal.bind(this)}>등록</button>
                                {this.state.modal && (
                   <div className="MyModal"> 
                      <div className="content">

                      <TextField id="standard-secondary" fullWidth label="제목" name="title" color="primary" required />
                      <TextField id="standard-secondary" fullWidth label="해쉬태그" name="hash" color="primary" required />
                      {profile_preview}
                      <TextField
                            id="outlined-multiline-static"
                            // error={this.state.data.customer === "" ? true : false
                            label="내용"
                            multiline
                            rows={8}
                            fullWidth
                            placeholder="Default Value"
                            name="content"
                            required
                            />
                        
                        <input type="file" name="filename" accept="image/*" onChange={this.checkImage.bind(this)}/>       
                        <input type="hidden" name="popularid" value={param}/> 
                        <input type="hidden" name="rid" value={this.props.sessionUser}/> 

                         <button formAction={'/community/'+param2+'/'+param+'/create'} >등록</button>   
                     
                      
                        
                        <button type="button" onClick={this.handleCloseModal.bind(this)}>닫기</button>
                     
                      </div>
                  </div> )}{""}   


                            </div>
                          
                             
                            
                        )
                          
                   
                     
                }
            
        
    
}
  



ReactDOM.render(<PopularBoard/>,document.getElementById('popularBoard'));