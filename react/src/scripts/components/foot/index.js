import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom"; 
import { Flex,WhiteSpace} from 'antd-mobile';
import {changeTitle} from "../../actions";

@connect(
    state=>{
        console.log(state);
        return {
            routelist:state.routelist,
            activeStyle:state.activeStyle
        }
    }
)
export default class Foot extends Component{
    changetitle=(title,topath)=>{
        // console.log(title)
        const {dispatch}=this.props;
        dispatch(changeTitle(title,topath));
    }

    render(){
       
      return (
            <div className="foot">
                    <Flex>
                    {
                        this.props.routelist.map((itm,idx)=>{
                            return (
                                   <Flex.Item  className="footlead" key={idx}>
                                            <NavLink activeClassName="active"  to={itm.path}>
                                            <div>
                                            <WhiteSpace></WhiteSpace>
                                            <i className={"iconfont icon-"+itm.icon}></i>
                                                <p onClick={()=>{this.changetitle(itm.text,itm.topath)}}>
                                                    {itm.text}
                                                </p>
                                            </div>
                                                
                                            </NavLink>
                                    </Flex.Item>   
                            )
                        })
                    }
                  </Flex>
            </div>

            
      )
        
    }

}