import React, { useEffect, useState } from "react";
import { Paper, Grid, Typography, TextField, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import {
  Call,
  CastForEducation,
  Email,
  Event,
  Home,
  Wc,
} from "@material-ui/icons";
import { database, app } from "../../mockfirebase";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  color: {
    backgroundColor: theme.palette.primary,
  },
  icon: {
    height: "40px",
    width: "40px",
  },
  card: {
    width: 345,
  },
  media: {
    height: 140,
  },
  corner: {
    paddingLeft: 20,
  },
}));
function Demo() {
  const [editable, setEditable] = useState(false);
  const [personalInfo, setPersonalInfo] = useState("");
  const classes = useStyles();
  console.log("edit", editable);
  const handleEdit = () => {
    setEditable(true);
  };
  const handleSave = () => {
    setEditable(false);
  };

  useEffect(() => {
    getPersonalInfo();
  }, []);

  const getPersonalInfo = () => {
    database
      .collection("PersonalDetails")
      .doc(app.auth().currentUser.uid)
      .get()
      .then((snapshot) => setPersonalInfo(snapshot.data()))
      .catch((error) => console.log(error.message));
  };
  const handleOnChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    database
      .collection("PersonalDetails")
      .doc(app.auth().currentUser.uid)
      .update(personalInfo)
      .then(() => {
        alert("Personal Info updated!!");
      })
      .catch((error) => {
        alert(error.message);
      });
    handleSave();
    getPersonalInfo();
  };

  return (
    <div>
      {editable ? (
        <Paper
          elevation={16}
          style={{ width: "60%", marginLeft: "260px", marginBottom: "100px" }}
        >
          <Grid
            container
            background="primary"
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                marginTop: "50px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Typography variant="h4" color="primary">
                  PERSONAL DETAILS{" "}
                </Typography>
              </Grid>
              <Avatar>
                <CheckIcon
                  color="primary"
                  fontSize="small"
                  onClick={handleUpdate}
                />
              </Avatar>
              <Avatar>
                <CloseIcon
                  color="secondary"
                  fontSize="small"
                  onClick={handleSave}
                />
              </Avatar>
            </div>
          </Grid>

          <Grid
            container
            xs={12}
            direction="row"
            spacing={10}
            style={{
              display: "flex",
              padding: "30px",
              justifyContent: "center",
            }}
          >
            <Grid item>
              <List className={classes.root}>
                <ListItem>
                  <ListItemAvatar>
                    <PersonIcon color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <TextField
                    name="firstname"
                    variant="filled"
                    type="text"
                    label="FirstName"
                    value={personalInfo.firstname}
                    onChange={handleOnChange}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <PersonIcon color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <TextField
                    name="lastname"
                    variant="filled"
                    type="text"
                    label="LastName"
                    value={personalInfo.lastname}
                    onChange={handleOnChange}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Email color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <TextField
                    name="email"
                    variant="filled"
                    type="text"
                    label="Email"
                    value={personalInfo.email}
                    onChange={handleOnChange}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Event color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <TextField
                    name="dateOfBirth"
                    primary="DOB"
                    variant="filled"
                    label="Date Of Birth"
                    value={personalInfo.dateOfBirth}
                    onChange={handleOnChange}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Wc color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <TextField
                    name="gender"
                    variant="filled"
                    label="Gender"
                    value={personalInfo.gender}
                    onChange={handleOnChange}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item>
              <List className={classes.root} style={{ marginLeft: "0px" }}>
                <ListItem>
                  <ListItemAvatar>
                    <CastForEducation
                      color="primary"
                      className={classes.icon}
                    />
                  </ListItemAvatar>
                  <TextField
                    name="qualification"
                    variant="filled"
                    label="Highest Qualification"
                    value={personalInfo.qualification}
                    onChange={handleOnChange}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Event color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <TextField
                    name="dateOfJoining"
                    variant="filled"
                    label="Date Of Joining"
                    value={personalInfo.dateOfJoining}
                    onChange={handleOnChange}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Call color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <TextField
                    name="mobile"
                    variant="filled"
                    label="PhoneNumber"
                    value={personalInfo.mobile}
                    onChange={handleOnChange}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Home color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <TextField
                    name="address"
                    variant="filled"
                    label="Address"
                    value={personalInfo.address}
                    onChange={handleOnChange}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Paper
          elevation={16}
          style={{
            marginTop: "50px",
            width: "60%",
            marginLeft: "260px",
            marginBottom: "100px",
          }}
        >
          <Grid
            container
            background="primary"
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                marginTop: "50px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Typography variant="h4" color="primary">
                  PERSONAL DETAILS{" "}
                </Typography>
              </Grid>
              <Avatar>
                <EditIcon
                  color="action"
                  fontSize="small"
                  onClick={handleEdit}
                />
              </Avatar>
            </div>
          </Grid>

          <Grid
            container
            xs={12}
            direction="row"
            spacing={10}
            style={{
              display: "flex",
              padding: "30px",
              justifyContent: "center",
            }}
          >
            <Grid item>
              <List className={classes.root}>
                <ListItem>
                  <ListItemAvatar>
                    <PersonIcon color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Name  "
                    secondary={
                      personalInfo.firstname + " " + personalInfo.lastname
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Email color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Email"
                    secondary={personalInfo.email}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Event color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="DOB"
                    secondary={personalInfo.dateOfBirth}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Wc color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Gender"
                    secondary={personalInfo.gender}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item>
              <List className={classes.root} style={{ marginLeft: "0px" }}>
                <ListItem>
                  <ListItemAvatar>
                    <CastForEducation
                      color="primary"
                      className={classes.icon}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Highest Qualification "
                    secondary={personalInfo.qualification}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Event color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Date Of Joining"
                    secondary={personalInfo.dateOfJoining}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Call color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="PhoneNumber"
                    secondary={personalInfo.mobile}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Home color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Address"
                    secondary={personalInfo.address}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
}
export default Demo;
