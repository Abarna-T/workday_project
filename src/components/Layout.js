import React from 'react'

import {AppBar,Toolbar, makeStyles,Drawer,Typography,List,ListItem,ListItemIcon,ListItemText, Grid} from '@material-ui/core'


import {format} from 'date-fns'
import {useHistory, useLocation} from 'react-router-dom'

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssistantIcon from '@material-ui/icons/Assistant';
import GroupIcon from '@material-ui/icons/Group';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Profile from './Profile';
import { Details } from '@material-ui/icons';
const drawerWidth=200

const useStyles=makeStyles((theme)=>{
   return{
    page:{
        background:"#f9f9f9",
        width:"100%",
        padding:theme.spacing(3)
    },
    draw:{
     width:drawerWidth,
    },
    drawerPaper:{
        width:drawerWidth
    },
    root:{
        display:"flex"
    },
    active:{
        background:'#f4f4f4'
    },
    title:{
        padding:theme.spacing(2)
    },
    app:{
        width:`calc(100% - ${drawerWidth}px)`,

    },
    toolbar:theme.mixins.toolbar,
    date:{
        flexGrow:1
    },
    avatar:{
        marginLeft:theme.spacing(2)
    }
   }
})
const Layout = ({children}) => {
    const classes=useStyles()
    const history=useHistory()
    const location=useLocation()
    const menuItems=[
        {
            text:'Personal Details',
            icon:<AccountBoxIcon color="secondary"/>,
            path:'/'
        },
        {
            text:'SkillSet',
            icon:<AssistantIcon  color="secondary"/>,
            path:'/skillset'
        },
        {
            text:'Team-Details',
            icon:<GroupIcon color="secondary"/>,
            path:'/teamdetails'
        },
        {
            text:'ViewDetails',
            icon:<Details color="secondary"/>,
            path:'/viewdetails'
        }
    ]
    return (
        <div className={classes.root}>
            <AppBar className={classes.app} elevation={0}>
                <Toolbar>
                    <Typography className={classes.date}>
                       Today is {format(new Date(),'do MMMM Y')}
                    </Typography>
                    <Typography>
                        Employee Details {" "}
                    </Typography>
                    <Profile/>
                </Toolbar>
            </AppBar>
            <Drawer
            className={classes.draw}
            variant="permanent"
            anchor="left"
            classes={{paper:classes.drawerPaper}}
            >
                <List>
                    {menuItems.map(item=>(
                        <ListItem button className={location.pathname===item.path?classes.active:null} key={item.text} onClick={()=>history.push(item.path)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))}
                </List>
                <div style={{padding:"300px 0 0 0"}}>
                   <Typography variant="h3" style={{fontSize:"20px",paddingLeft:"5px"}}>Contact</Typography>
                </div>    

               <div style={{paddingLeft:"5px",paddingTop:"10px",display:"flex",justifyContent:"space-evenly"}} >
                   <div>
                   
                       {<a href="//www.github.com/yadhindrasrivarshan" target="_blank" rel="noreferrer" style={{textDecoration:"none"}}><GitHubIcon color="primary"/></a>}
                   </div>
                   <div>
                      {<a href="//user@gmail.com" target="_blank" rel="noreferrer" style={{textDecoration:"none"}}><EmailIcon color="primary"/></a>}
                   </div>
                   <div>
                   {<a href="//www.linkedin.com/" target="_blank" rel="noreferrer" style={{textDecoration:"none"}}><LinkedInIcon color="primary"/></a>}
                   </div>
               </div>    
            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}

export default Layout
