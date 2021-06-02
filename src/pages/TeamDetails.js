import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";
import "./TeamDetails.css";

import {app, database,fire} from '../mockfirebase'
import {ListItem,ListItemIcon,ListItemText} from '@material-ui/core'
import '../components/Todo.css'
import GroupIcon from '@material-ui/icons/Group';

import DeleteIcon from '@material-ui/icons/Delete';

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };
  

class TeamDetails extends Component {
  constructor(props){
      super(props)

      this.state={
        TeamName:null,
        division:null,
        experience:null,
        role:null,
        DateOfJoining:null,
        newItem: "",
        list: [],

        formErrors:{
            TeamName:"",
            division:"",
            experience:"",
            role:"",
        }
      }
  }

  handleclear=()=>{
    document.getElementById("form").reset()
  }
  
  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });
  }

  addItem() {
    // create a new item with unique id
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
 
    };

    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);

    // update state with new list, reset the new item input
    var list2=[]
    list.map((item)=>{
      console.log(item.value);
      list2.push(item.value)
    })

  
    this.setState({
      list,
      newItem: ""
    });
  }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {

      var list1=[]
      this.state.list.map((item)=>{
        list1.push(item.value)
      })
      console.log(`
        --SUBMITTING--
        TeamName: ${this.state.TeamName}
        Divisions: ${this.state.division}
        Experience: ${this.state.experience}
        Role: ${this.state.role}
        DateOfJoining:${this.state.DateOfJoining},
        List:${list1}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }

   if(formValid(this.state)){
      var list1=[]
      this.state.list.map((item)=>{
        list1.push(item.value)
      })
      database.collection('TeamDetails').doc(app.auth().currentUser.uid).set({
        TeamName:this.state.TeamName,
        Division:this.state.division,
        Experience:this.state.experience,
        Role:this.state.role,
        DateOfJoining:this.state.DateOfJoining,
        PrevTeams:list1,
      })
      .then(()=>{
        console.log("TeamDetails have been submitted successfully 😁😎")
      })
      .catch((error)=>{
        alert(error.message)
      })
    }

    
  };

  printDatas=()=>{database.collection('teamdetails').get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {
          console.log(doc.data());
    }
    )
 }
)
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "TeamName":
        formErrors.TeamName =
          value.length < 3 ? "TEAM name must be in expanded form or it should not be less than 3 characters" : "";
        break;
      case "division":
        formErrors.division =
          value.length < 3 ? "DOMAIN/DIVISION name should be atleast three characters" : "";
        break;
      case "experience":
        formErrors.experience =Number(value)<0
          ? "Enter your experience correctly ,as experience wont be in negative value"
          : "";
        break;
      case "role":
        formErrors.role =
          value.length < 6 ? "Kindly enter your role correctly" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
 
  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrTeamDetailser">
        <div>
        <h1 style={{textAlign:"left"}}>Team details {<React.Fragment>
                <Button variant="contained" style={{marginRight:"20px",marginLeft:"770px",marginBottom:"10px"}} color="primary" onClick={this.handleSubmit} >
                Submit
                </Button>
            
                <Button variant="contained" style={{marginRight:"0px",marginBottom:"10px"}}color="secondary" onClick={this.handleclear}>
                Clear
                </Button>
          </React.Fragment>}</h1>
        </div>
        <div className="form-wrTeamDetailser">
          <form onSubmit={this.handleSubmit} noValidate id="form">
            <div className="firstName">
              <TextField
                variant="outlined"
                label="Team-Name"
               autoComplete="off"
                type="text"
                name="TeamName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.TeamName.length>0 && (
                  <span className="errorMessage">{formErrors.TeamName}</span>
              )}
            </div>
            <div className="lastName">
              <TextField
                    variant="outlined"
                    required
                    name="DateOfJoining"
                    label="Date of Joining"
                    required
                    type="date"
                    format="MM/dd/yyyy"
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
              
            </div>
            <div className="firstName">
              <TextField
              variant="outlined"
                label="Division/Domain"
               autoComplete="off"
                type="text"
                name="division"
                noValidate
                onChange={this.handleChange}

                
              />
              {formErrors.division.length>0 && (
                  <span className="errorMessage">{formErrors.division}</span>
              )}
            </div>
            <div className="lastName">
              <TextField
              variant="outlined"
                label="Enter the no of years in the current team"
                type="number"
                autoComplete="off"
                name="experience"
                noValidate
                onChange={this.handleChange}
                 
              />
               {formErrors.experience.length>0 && (
                  <span className="errorMessage">{formErrors.experience}</span>
              )}
            </div>
            
            <div className="email">
              <TextField
              variant="outlined"
                label="Eg: Software Engineer"
               autoComplete="off"
                type="text"
                name="role"
                noValidate
                onChange={this.handleChange}
            />    
                 {formErrors.role.length>0 && (
                  <span className="errorMessage">{formErrors.role}</span>
              )}
            </div>
            <div  style={{width:"100%"}}>
            <>
              <div>
              <div >
                <TextField
                label="Enter Previous TeamName"
                variant="outlined"
                style={{width:"800px",marginRight:"10px"}}
                  type="text"
                  
                  value={this.state.newItem}
                  onChange={e => this.updateInput("newItem", e.target.value)}
                />
                <Button
                  className="btn"
                  color="primary"
                  variant="contained"
                  onClick={() => this.addItem()}
                  disabled={!this.state.newItem.length}
                >
                  <i className="material-icons" style={{marginTop:"10px",paddingBottom:"5px"}}>Add Team-Name</i>
                </Button>
                <br /> <br />
                <ol>
                  {this.state.list.map(item => {
                    return (
                      <ListItem style={{border:"1px solid black",width:"700px",borderRadius:"5px"}} key={item.key}>
                          <ListItemIcon>
                              <GroupIcon color="primary"/>
                          </ListItemIcon>
                          <ListItemText key={item.key} primary={"TeamName:  "+item.value}/>
                          <Button color="secondary">{<DeleteIcon fontSize="small" onClick={()=>this.deleteItem(item.id)} />}</Button>
                      </ListItem>
                    );
                  })}
                </ol>
              </div>
            </div>
            </>
            </div>
            <Button variant="outlined" onClick={this.printDatas}>
                click me
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default TeamDetails;