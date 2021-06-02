import React,{useState} from 'react'
import {
    Typography,
    Paper,
    Grid,
    Button,
    TextField,ListItem
  } from '@material-ui/core';
  import {database,app} from '../mockfirebase'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import {Dialog,DialogTitle, DialogContent,DialogContentText, DialogActions } from '@material-ui/core';
function EditTeamInfo(props) {

    const [open, setOpen] = React.useState(false);
    const data=props.data;
  
    const [updatePrevTeams,setUpdatePrevTeams]=useState(props.teamdata);
     
    const [updateTeamInfo,setUpdateTeamInfo]=useState({
      TeamName:data.TeamName,
      Experience:data.Experience,
      Division:data.Division,
      Role:data.Role,
    });
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOnChange=(e)=>{
        setUpdateTeamInfo({
          ...updateTeamInfo,
          [e.target.name]: e.target.value
        });
    }
    const handlePrevTeamChange=(e)=>{
      setUpdatePrevTeams({
        ...updatePrevTeams,
        [e.target.name]: e.target.value
      });
  }
      const handleUpdate=(e)=>{
        e.preventDefault();

        // console.log(updateTeamInfo)
         database.collection('TeamDetails').doc(app.auth().currentUser.uid).update(updateTeamInfo)
          .then(()=> {
            alert("Team Info updated!!");
          })
          .catch((error) => {
            alert(error.message);
          });
          handleClose();
          props.getteaminfo();
      }
    return (
        <div>
            <IconButton  onClick={handleClickOpen}><AccountCircleIcon style={{padding:"0 5px"}}/></IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Team Info..</DialogTitle>
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
                    name="TeamName"
                    value={updateTeamInfo.TeamName}
                    type="text"
                    label="Name"
                    onChange={handleOnChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="Division"
                    value={updateTeamInfo.Division}
                    type="text"
                    label="Divisions"
                    onChange={handleOnChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    name="Experience"
                    fullWidth
                    value={updateTeamInfo.Experience}
                    label="Year Of Experience"
                    onChange={handleOnChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="Role"
                    value={updateTeamInfo.Role}
                    label="Role"
                    onChange={handleOnChange}
                  />
                </Grid>

                <Grid item xs={6}>
                <Typography component="p">
                        {updatePrevTeams.map(team=>(
                           <TextField
                            variant="outlined"
                            fullWidth
                            label="Previous Teams"
                            value={team}
                            name="PrevTeams"
                            onChange={handlePrevTeamChange}
                         />
                        ))} 
                        </Typography>
                 
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
export default EditTeamInfo