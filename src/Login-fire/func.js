import React,{useEffect, useState} from 'react';

import {Paper,Grid, Typography, Button, Card, CardActionArea, CardMedia, CardContent, CardActions} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import { AccountBox, Call, CastForEducation, Edit, Email, Event,Favorite,Group,Home,PeopleOutline,PeopleOutlined,Wc } from '@material-ui/icons';
import { useHistory } from 'react-router';
import Rating from '@material-ui/lab/Rating';
import DomainIcon from '@material-ui/icons/Domain';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import {app, database} from '../mockfirebase'
const useStyles = makeStyles(theme => ({
    root: {
      
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    icon:{
        height:"40px",
        width:"40px"
    },
    card:{
        width:345,
        }
        ,
    media:{
        height:140,
    },
    corner:{
        paddingLeft:20
    }
  }));
   

    
    const PersonalDetails=()=>{
        const [pdata,setPdata]=useState([])
        const history=useHistory()
        const classes=useStyles()
        let FirstName=""
        let LastName=""
        let email=""
        let DOB=""
        let Gender=""
        let HigherQualification=""
        let DOJ=""
        let mobile=""
        let address=""
        let userid
        try{
              userid=app.auth().currentUser.uid
            
        }
        catch(err){
              userid='custom'
        }
        console.log(userid);

    //    await database.collection('details').get().then((doc)=>{doc.forEach(d=>{
    //        console.log(d.data())})});
      useEffect(()=>{
           database.collection('details').doc(userid).collection('PersonalDetails').get()
          .then((doc)=>{doc.forEach(d=>{
              let obj=d.data()
              console.log(obj);
              pdata.push(obj)
             

          })
         setPdata(pdata)
        })
        },[pdata])

          
          
        const obj=pdata[0]
        
     console.log(obj);
    //  FirstName+=obj.firstname
    //  LastName+=obj.lastname
    //  address+=obj.address
    //  DOJ+=obj.dateOfJoining
    //  DOB+=obj.dateOfJoining 
    //  Gender+=obj.gender 
    //  mobile+=obj.mobile 
    //  HigherQualification+=obj.qualification 
    //  email+=obj.email
    const TechnicalSkills=[
        {skill_name:"Python",rate:"4",fav:"yes"},
        {skill_name:"Java.",rate:"4",fav:"yes"}
        
    ]
    const OtherSkills=[
        {skill_name:"Singing",rate:"4",fav:"yes"},
        {skill_name:"Reading Books",rate:"4",fav:"no"}
    ]
    const SoftSkills=[
        {skill_name:"Tennis",rate:"4",fav:"no"},
        {skill_name:"Cricket",rate:"4.5",fav:"yes"}
    ]
    const TeamName="TAM"
    const Domain="TTM"
    const YOE="1"
    const role="SOFTWARE ENGINEER"
    const PreviousTeamName=["ROUTE MANIFEST","MY MEDIA"]
    return(

        <React.Fragment>
        <Paper elevation={10} style={{marginTop:"50px",width:"60%",marginLeft:"260px"}} >
            
            <Typography style={{paddingTop:"30px"}}align="center" variant="h4" color="primary">PERSONAL DETAILS </Typography >
            
            <Grid container xs={12} direction="row" spacing={10} style={{marginLeft:"60px",marginTop:"5px"}}>   
                <Grid item >
                <List className={classes.root}>
                        <ListItem>
                        <ListItemAvatar>
                            
                            <PersonIcon className={classes.icon}/>
                            
                        </ListItemAvatar>
                        <ListItemText primary="Name  " secondary={FirstName+" "+LastName} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                        <ListItemAvatar>
                             <Email className={classes.icon}/>
                        </ListItemAvatar>
                        <ListItemText primary="Email" secondary={email} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                        <ListItemAvatar>
                             <Event className={classes.icon}/>
                        </ListItemAvatar>
                        <ListItemText primary="DOB" secondary={DOB} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                        <ListItemAvatar>
                            <Wc className={classes.icon}/>
                        </ListItemAvatar>
                        <ListItemText primary="Gender" secondary={Gender} />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item >
                        <List className={classes.root} style={{marginLeft:"0px"}}>
                                <ListItem>
                                <ListItemAvatar>
                                    <CastForEducation className={classes.icon}/>
                                </ListItemAvatar>
                                <ListItemText primary="Highest Qualification " secondary={HigherQualification} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                <ListItemAvatar>
                                    <Event className={classes.icon}/>
                                </ListItemAvatar>
                                <ListItemText primary="Date Of Joining" secondary={DOJ} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                <ListItemAvatar>
                                    <Call className={classes.icon}/>
                                </ListItemAvatar>
                                <ListItemText primary="PhoneNumber" secondary={mobile} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                <ListItemAvatar>
                                    <Home className={classes.icon}/>
                                </ListItemAvatar>
                                <ListItemText primary="Address" secondary={address} />
                                </ListItem>
                            </List>
                </Grid>

            </Grid>
            <Grid container direction="row-reverse" >
            <Button variant="contained" color="primary" style={{margin:"40px"}} onClick={()=>history.push('/')} ><Edit style={{marginRight:"5px",width:"20px",height:"20px"}}/> Edit</Button>

            </Grid>
        </Paper>
        <Paper elevation={10} style={{marginTop:"40px",marginLeft:"257px",width:"60%"}}> 
        <Typography style={{paddingTop:"30px"}}align="center" variant="h4" color="primary">SKILLSET</Typography >
            <Grid xs={12} container spacing={6} direction="row" wrap="wrap" style={{marginLeft:"30px",marginTop:"10px"}}>
            <Grid item>   
            <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image="https://www.nojitter.com/sites/default/files/Visual%20Generation_AdobeStock_297401980_0.jpeg"
                title="Technical Skills"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Technical Skills
                </Typography>
                <Typography component="p">

                {TechnicalSkills.map(t=>{
                            return (
                            <ListItem >
                                <Typography variant="h6" color="primary">{t.skill_name}</Typography>
                                {/* <Typography variant="h6" color="primary">{t.skill_name}{" "}{`Rating:${t.rate}`}{" "}{`(favourite=${t.fav})`}</Typography> */}
                                <Rating  name="half-rating-read" precision={0.5} value={t.rate} disabled className={classes.corner}/>
                                {t.fav==='yes'?<Favorite color="secondary" className={classes.corner}/>:null}
                            </ListItem>)}
                        )}            
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
            </Grid>
            <Grid item>   
            <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image="https://www.resumego.net/wp-content/uploads/soft-hard-skills.png"
                title="Soft Skills"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Soft Skills
                </Typography>
                <Typography component="p">
                {SoftSkills.map(t=>{
                            return (
                            <ListItem >
                                <Typography variant="h6" color="primary">{t.skill_name}</Typography>
                                <Rating  name="half-rating-read" precision={0.5} value={t.rate} disabled className={classes.corner}/>
                                {t.fav==='yes'?<Favorite color="secondary" className={classes.corner}/>:null}
                            </ListItem>)}
                        )}    
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
            </Grid> <Grid item>   
            <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image="https://qphs.fs.quoracdn.net/main-qimg-e3dd50e7b0ce8ea332654f5c92f13d98"
                title="Other skills"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                     Other Skills
                </Typography>
                <Typography component="p">
                {OtherSkills.map(t=>{
                            return (
                            <ListItem >
                                <Typography variant="h6" color="primary">{t.skill_name}</Typography>
                                <Rating  name="half-rating-read" precision={0.5} value={t.rate} disabled className={classes.corner}/>
                                {t.fav==='yes'?<Favorite color="secondary" className={classes.corner}/>:null}
                            </ListItem>)}
                        )}    
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
            </Grid>
            </Grid>
        
            <Grid container direction="row-reverse" >
            <Button variant="contained" color="primary" style={{margin:"40px"}} onClick={()=>history.push('/skillset')} ><Edit style={{marginRight:"5px",width:"20px",height:"20px"}}/> Edit</Button>

            </Grid>
        </Paper>
        <Paper elevation={10} style={{marginTop:"50px",width:"60%",marginLeft:"260px"}} >
            
            <Typography style={{paddingTop:"30px"}}align="center" variant="h4" color="primary">TEAM DETAILS </Typography >
            
            <Grid container xs={12} direction="row" spacing={10} style={{marginLeft:"60px",marginTop:"5px"}}>   
                <Grid item >
                <List className={classes.root}>
                        <ListItem>
                        <ListItemAvatar>
                            
                            <Group className={classes.icon}/>
                            
                        </ListItemAvatar>
                        <ListItemText primary="Name  " secondary={TeamName} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                        <ListItemAvatar>
                           <Event className={classes.icon}/>
                        </ListItemAvatar>
                        <ListItemText primary="Years of experience" secondary={YOE} />
                        </ListItem>
        
                    </List>
                </Grid>
                <Grid item >
                        <List className={classes.root} style={{marginLeft:"0px"}}>
                                <ListItem>
                                <ListItemAvatar>
                                    <DomainIcon className={classes.icon}/>
                                </ListItemAvatar>
                                <ListItemText primary="Division/Domain  " secondary={Domain} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                <ListItemAvatar>
                                     <AccountBox className={classes.icon}/>
                                </ListItemAvatar>
                                <ListItemText primary="Role " secondary={role} />
                                </ListItem>
                                
                            </List>
                </Grid>
                

            </Grid>
            <Grid xs={12} container justify="center" style={{marginTop:"20px"}}>
            <Card style={{width:"220px"}} className={classes.card} >
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image="https://cdn1.careeraddict.com/uploads/article/58721/illustration-group-people-team-meeting.jpg"
                title="Other skills"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Previous TeamNames
                </Typography>
                <Typography component="p">
                {PreviousTeamName.map(team=>(
                    <ListItem>
                        <PeopleOutlineIcon/>{" "}
                        <Typography gutterBottom variant="body2" color="secondary" style={{marginLeft:"5px"}}>
                            {team}
                        </Typography>
                    </ListItem>
                ))} 
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
            </Grid>
            <Grid container direction="row-reverse" >
            <Button variant="contained" color="primary" style={{margin:"40px"}} onClick={()=>history.push('/teamdetails')} ><Edit style={{marginRight:"5px",width:"20px",height:"20px"}}/> Edit</Button>

            </Grid>
        </Paper>
        </React.Fragment>
    )
}

export default PersonalDetails