import React,{useState} from 'react'
import {
    Paper,
    Grid,
    Button,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    FormControlLabel,
    TextField
  } from '@material-ui/core';
  import {database,app} from '../mockfirebase'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import {Dialog,DialogTitle, DialogContent,DialogContentText, DialogActions } from '@material-ui/core';
function EditPersonalInfo(props) 
{

    const [open, setOpen] = React.useState(false);
    const data=props.data;
    console.log("v",data)
    const [updatePersonalInfo,setUpdatePersonalInfo]=useState({
      firstname:data.firstname,
      lastname:data.lastname,
      email:data.email,
      dateOfBirth:data.dateOfBirth,
      gender:data.gender,
      qualification:data.qualification,
      dateOfJoining:data.dateOfJoining,
      mobile:data.mobile,
      address:data.address
    });
    console.log("value",updatePersonalInfo)
    const handleClickOpen = () => {
        setOpen(true);
        console.log("info:",updatePersonalInfo);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOnChange=(e)=>{
        setUpdatePersonalInfo({
          ...updatePersonalInfo,
          [e.target.name]: e.target.value
        });
    }
      const handleUpdate=(e)=>{
        e.preventDefault();
        console.log(updatePersonalInfo)
         database.collection('PersonalDetails').doc(app.auth().currentUser.uid).update(updatePersonalInfo)
          .then(()=> {
            alert("Personal Info updated!!");
            //setOpen(false);
           // handleClose();
          })
          .catch((error) => {
            alert(error.message);
          });
          handleClose();
          props.getpersonalinfo();
      }
    return (
        <div>
            <IconButton  onClick={handleClickOpen}><AccountCircleIcon style={{padding:"0 5px"}}/></IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Personal Info..</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the update values
              </DialogContentText>
            <Paper>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="firstname"
                    value={updatePersonalInfo.firstname}
                    type="text"
                    label="First Name"
                    onChange={handleOnChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="lastname"
                    value={updatePersonalInfo.lastname}
                    type="text"
                    label="Last Name"
                    onChange={handleOnChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    name="email"
                    fullWidth
                    value={updatePersonalInfo.email}
                    type="email"
                    label="Email"
                    onChange={handleOnChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    name="dateOfBirth"
                    value={updatePersonalInfo.dateOfBirth}
                    label="Date of Birth"
                    onChange={handleOnChange}
                    type="date"
                    format="MM/dd/yyyy"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                <FormControl >
                    <FormLabel >Gender</FormLabel>
                    <RadioGroup row name="gender" value={updatePersonalInfo.gender} onChange={handleOnChange}>
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    name="qualification"
                    fullWidth
                    value={updatePersonalInfo.qualification}
                    label="Higher Eduactional Qualification"
                    onChange={handleOnChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    name="dateOfJoining"
                    value={updatePersonalInfo.dateOfJoining}
                    label="Date of Joining"
                    onChange={handleOnChange}
                    type="date"
                    format="MM/dd/yyyy"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="mobile"
                    value={updatePersonalInfo.mobile}
                    label="Mobile"
                    onChange={handleOnChange}
                  />
                </Grid>
                 <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    name="address"
                    fullWidth
                    label="Address"
                    value={updatePersonalInfo.address}
                    onChange={handleOnChange}
                  />
                </Grid>
            </Grid>
            </Paper>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleUpdate} color="primary">
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    )
}
export default EditPersonalInfo