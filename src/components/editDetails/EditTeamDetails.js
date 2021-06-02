import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import {
  AccountBox,
  Call,
  CastForEducation,
  Edit,
  Email,
  Event,
  Favorite,
  Group,
  Home,
  PeopleOutlineOutlined,
  Wc,
} from "@material-ui/icons";
import { useHistory } from "react-router";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Emoji from "@material-ui/icons/SentimentVerySatisfiedOutlined";
import Rating from "@material-ui/lab/Rating";
import DomainIcon from "@material-ui/icons/Domain";
import { database, app } from "../../mockfirebase";
import EditPersonalInfo from "../EditPersonalInfo";
import EditTeamInfo from "../EditTeamInfo";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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
function TeamDetails() {
  const classes = useStyles();
  const [editable, setEditable] = useState(false);
  const [teamInfo, setTeamInfo] = useState([]);
  const [prevTeam, setPrevTeam] = useState([]);
  const handleEdit = () => {
    setEditable(true);
  };
  const handleSave = () => {
    setEditable(false);
  };

  useEffect(() => {
    getTeamInfo();
  }, []);
  const getTeamInfo = () => {
    database
      .collection("TeamDetails")
      .doc(app.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        const list = [];
        setTeamInfo(snapshot.data());
        const pteam = snapshot.data().PrevTeams;
        list.push(pteam);
        setPrevTeam(list);
      })
      .catch((error) => console.log(error.message));
  };
  const handleOnChange = (e) => {
    setTeamInfo({
      ...teamInfo,
      [e.target.name]: e.target.value,
    });
  };
  console.log(prevTeam);
  const handlePrevOnChange = (e) => {
    setPrevTeam({
      ...prevTeam,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    database
      .collection("TeamDetails")
      .doc(app.auth().currentUser.uid)
      .update(teamInfo)
      .then(() => {
        alert("Team Info updated!!");
      })
      .catch((error) => {
        alert(error.message);
      });
    handleSave();
    getTeamInfo();
  };
  return (
    <div>
      {editable ? (
        <Paper
          elevation={10}
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
                  TEAM DETAILS{" "}
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
            style={{ marginLeft: "60px", marginTop: "5px" }}
          >
            <Grid item>
              <List className={classes.root}>
                <ListItem>
                  <ListItemAvatar>
                    <Group color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <TextField
                    name="TeamName"
                    variant="filled"
                    type="text"
                    label="TeamName"
                    onChange={handleOnChange}
                    primary="Name"
                    value={teamInfo.TeamName}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Event color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <TextField
                    name="Experience"
                    variant="filled"
                    type="text"
                    label="Experience"
                    onChange={handleOnChange}
                    primary="Years of experience"
                    value={teamInfo.Experience}
                  />
                </ListItem>
              </List>

              <List className={classes.root} style={{ marginLeft: "0px" }}>
                <ListItem>
                  <ListItemAvatar>
                    <DomainIcon color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <TextField
                    name="Division"
                    variant="filled"
                    type="text"
                    onChange={handleOnChange}
                    label="Division/Domain"
                    value={teamInfo.Division}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <AccountBox color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <TextField
                    name="Role"
                    variant="filled"
                    type="text"
                    label="Role"
                    onChange={handleOnChange}
                    value={teamInfo.Role}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item>
              <Card style={{ width: "220px" }} className={classes.card}>
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
                      {prevTeam.map((team) => (
                        <div>
                          {team.map((t) => (
                            <div>
                              {/* <GroupWorkIcon
                                color="primary"
                                className={classes.icon}
                              />{" "} */}
                              <TextField
                                name="prevTeams"
                                variant="filled"
                                type="text"
                                onChange={handleOnChange}
                                value={t}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      ) : (
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
                  TEAM DETAILS{" "}
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
              justifyContent: "center",
              marginTop: "5px",
            }}
            //  style={{ marginLeft: "60px", marginTop: "5px" }}
          >
            <Grid item>
              <List className={classes.root}>
                <ListItem>
                  <ListItemAvatar>
                    <Group color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Name  "
                    secondary={teamInfo.TeamName}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Event color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Years of experience"
                    secondary={teamInfo.Experience}
                  />
                </ListItem>
              </List>

              <List className={classes.root} style={{ marginLeft: "0px" }}>
                <ListItem>
                  <ListItemAvatar>
                    <DomainIcon color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Division/Domain  "
                    secondary={teamInfo.Division}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <AccountBox color="primary" className={classes.icon} />
                  </ListItemAvatar>
                  <ListItemText primary="Role " secondary={teamInfo.Role} />
                </ListItem>
              </List>
            </Grid>
            <Grid item>
              <Card style={{ width: "220px" }} className={classes.card}>
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
                      {prevTeam.map((team) => (
                        <List>
                          {team.map((t) => (
                            <div>
                              <ListItem>
                                <PeopleOutlineOutlined color="primary" />{" "}
                                <Typography
                                  gutterBottom
                                  variant="body2"
                                  style={{ marginLeft: "5px" }}
                                >
                                  {t}
                                </Typography>
                              </ListItem>
                            </div>
                          ))}
                        </List>
                      ))}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
}
export default TeamDetails;
