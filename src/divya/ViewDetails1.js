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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
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
import { database, app } from "../mockfirebase";
import EditPersonalInfo from "../components/EditPersonalInfo";
import EditTeamInfo from "../components/EditTeamInfo";
import EditIcon from "@material-ui/icons/Edit";
import Demo from "../components/EditPersonalDetails";
import SkillDetails from "../components/SkillDetails";
import TeamDetails from "../components/EditTeamDetails";

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

function ViewDetails() {
  const history = useHistory();
  const [personalInfo, setPersonalInfo] = useState("");
  const [teamInfo, setTeamInfo] = useState([]);
  const [techSkillsInfo, setTechSkillsInfo] = useState([]);
  const [softSkillsInfo, setSoftSkillsInfo] = useState([]);
  const [otherSkillsInfo, setOtherSkillsInfo] = useState([]);
  const [prevTeam, setPrevTeam] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    getPersonalInfo();
    getTeamInfo();
    getTechSkillsInfo();
    getSoftSkillsInfo();
    getOtherSkillsInfo();
  }, []);
  const getPersonalInfo = () => {
    database
      .collection("PersonalDetails")
      .doc(app.auth().currentUser.uid)
      .get()
      .then((snapshot) => setPersonalInfo(snapshot.data()))
      .catch((error) => console.log(error.message));
  };
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

  const getTechSkillsInfo = () => {
    database
      .collection("Skillsets")
      .doc(app.auth().currentUser.uid)
      .collection("TechSkills")
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          list.push({ id: doc.id, ...data });
        });
        setTechSkillsInfo(list);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getSoftSkillsInfo = () => {
    database
      .collection("Skillsets")
      .doc(app.auth().currentUser.uid)
      .collection("softSkills")
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          list.push({ id: doc.id, ...data });
        });
        setSoftSkillsInfo(list);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const getOtherSkillsInfo = () => {
    database
      .collection("Skillsets")
      .doc(app.auth().currentUser.uid)
      .collection("otherSkills")
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          list.push({ id: doc.id, ...data });
        });
        setOtherSkillsInfo(list);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      {personalInfo &&
      teamInfo &&
      techSkillsInfo &&
      softSkillsInfo &&
      otherSkillsInfo ? (
        <React.Fragment>
          {/*  */}
          <Demo />
          {/*  */}
          <SkillDetails />
          {/*  */}
          <Paper
            elevation={10}
            style={{ marginTop: "40px", marginLeft: "257px", width: "60%" }}
          >
            <Typography
              style={{ paddingTop: "30px" }}
              align="center"
              variant="h4"
              color="primary"
            >
              SKILLSET
            </Typography>
            <Grid
              xs={12}
              container
              spacing={6}
              direction="row"
              wrap="wrap"
              style={{ marginLeft: "30px", marginTop: "10px" }}
            >
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
                        {techSkillsInfo.map((t) => {
                          return (
                            <ListItem>
                              <Typography variant="h6" color="primary">
                                {t.skill_name}
                              </Typography>
                              {/* <Typography variant="h6" color="primary">{t.skill_name}{" "}{`Rating:${t.rate}`}{" "}{`(favourite=${t.fav})`}</Typography> */}
                              <Rating
                                name="half-rating-read"
                                precision={0.5}
                                value={t.rate}
                                disabled
                                className={classes.corner}
                              />
                              {t.fav === "yes" ? (
                                <Favorite
                                  color="secondary"
                                  className={classes.corner}
                                />
                              ) : null}
                              <EditIcon fontSize="small" />
                            </ListItem>
                          );
                        })}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              {/* {o && <SkillDetails data={edit} />} */}
              {/* dialog */}

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
                        {softSkillsInfo.map((t) => {
                          return (
                            <ListItem>
                              <Typography variant="h6" color="primary">
                                {t.skill_name}
                              </Typography>
                              <Rating
                                name="half-rating-read"
                                precision={0.5}
                                value={t.rate}
                                disabled
                                className={classes.corner}
                              />
                              {t.fav === "yes" ? (
                                <Favorite
                                  color="secondary"
                                  className={classes.corner}
                                />
                              ) : null}
                            </ListItem>
                          );
                        })}
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
                      image="https://qphs.fs.quoracdn.net/main-qimg-e3dd50e7b0ce8ea332654f5c92f13d98"
                      title="Other skills"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Other Skills
                      </Typography>
                      <Typography component="p">
                        {otherSkillsInfo.map((t) => {
                          return (
                            <ListItem>
                              <Typography variant="h6" color="primary">
                                {t.skill_name}
                              </Typography>
                              <Rating
                                name="half-rating-read"
                                precision={0.5}
                                value={t.rate}
                                disabled
                                className={classes.corner}
                              />
                              {t.fav === "yes" ? (
                                <Favorite
                                  color="secondary"
                                  className={classes.corner}
                                />
                              ) : null}
                            </ListItem>
                          );
                        })}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>

            <Grid container direction="row-reverse">
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "40px" }}
                onClick={() => history.push("/skillset")}
              >
                <Edit
                  style={{ marginRight: "5px", width: "20px", height: "20px" }}
                />{" "}
                Edit
              </Button>
            </Grid>
          </Paper>
          <TeamDetails />
          {/* <Grid container direction="row-reverse" >
             <Button variant="contained" color="primary" style={{margin:"40px"}} onClick={()=>(history.push('/teamdetails'))} ><Edit style={{marginRight:"5px",width:"20px",height:"20px"}}/> Edit</Button> 
            <EditTeamInfo data={teamInfo} getteaminfo={getTeamInfo} teamdata={prevTeam}/>
            </Grid> */}
        </React.Fragment>
      ) : (
        <Paper elevation={10} style={{ margin: "50px" }}>
          <Typography
            variant="h2"
            color="primary"
            style={{ marginLeft: "10px" }}
          >
            Dear Employee! Kindly enter your details and view the same here!!!
          </Typography>

          <Button
            variant="contained"
            style={{ margin: "25px" }}
            color="secondary"
            onClick={() => history.push("/")}
          >
            Click here to fill details
          </Button>
        </Paper>
      )}
    </div>
  );
}

export default ViewDetails;
