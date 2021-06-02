import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import logo from "../assests/candidate.svg";
import soft from "..assests/skills.svg";
import sport from "../assests/sports.svg";
import { ListItem, Typography } from "@material-ui/core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Emoji from "@material-ui/icons/SentimentVerySatisfiedOutlined";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Favorite from "@material-ui/icons/Favorite";
import Avatar from "@material-ui/core/Avatar";
import { database, app } from "../mockfirebase";

const useStyles = makeStyles({
  div: {
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
  },
  root: {
    backgroundColor: blue[800],
    color: "white",
  },
  text: {
    color: blue[900],
  },
  text1: {
    color: red[900],
  },
  corner: {
    paddingLeft: 20,
  },
});

function SkillSet() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false); //initial the state for dialog to open & close

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //TODO
  const [task, setTask] = React.useState(""); //value of textField
  const [rate, setRate] = React.useState(""); //value of rating
  const [fav, setFav] = React.useState(""); //value of rating
  const [toDoList, setTodoList] = React.useState([]); //updating to the array
  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const rateChange = (e) => {
    setRate(e.target.value);
  };
  const handleFavorite = (e) => {
    setFav(e.target.value);
  };
  const AddTask = () => {
    console.log(task);
    const taskDetails = {
      skill_name: task,
      rate: rate,
      fav: fav,
    };
    setTodoList([...toDoList, taskDetails]);

    // database.collection('details').doc('QTv6ThZefNifWJNSYabn').collection('SkillSet').doc('vRaye7JSuZwopewlc4FK').collection('TechSkill').add(taskDetails)
    // // db.collection("tech_skill").add(taskDetails)
    // .then((docRef)=>{alert("skill_name "+taskDetails.skill_name+"\nrate "+taskDetails.rate+"\nfav "+taskDetails.fav)});
    // setOpen(false);
    database
      .collection("Skillsets")
      .doc(app.auth().currentUser.uid)
      .collection("TechSkills")
      .add(taskDetails)
      .then(() => {
        alert("TeamDetails have been submitted successfully 😁😎");
      })
      .catch((error) => {
        alert(error.message);
      });
    setOpen(false);
  };

  //FOR soft skills

  const [opens, setOpens] = React.useState(false); //initial the state for dialog to open & close

  const handleClickOpen_s = () => {
    setOpens(true);
  };

  const handleClose_s = () => {
    setOpens(false);
  };

  //TODO
  const [task_s, setTask_s] = React.useState(""); //value of textField
  const [rate_s, setRate_s] = React.useState(""); //value of rating
  const [fav_s, setFav_s] = React.useState(""); //value of fav
  const [toDoList_s, setTodoList_s] = React.useState([]); //updating to the array

  const handleChange_s = (e) => {
    setTask_s(e.target.value);
  };
  const rateChange_s = (e) => {
    setRate_s(e.target.value);
  };
  const handleFavorite_s = (e) => {
    setFav_s(e.target.value);
  };
  const AddTask_s = () => {
    console.log(task);
    const taskDetails_s = {
      skill_name: task_s,
      rate: rate_s,
      fav: fav_s,
    };
    setTodoList_s([...toDoList_s, taskDetails_s]);
    database
      .collection("Skillsets")
      .doc(app.auth().currentUser.uid)
      .collection("softSkills")
      .add(taskDetails_s)
      .then(() => {
        alert("TeamDetails have been submitted successfully 😁😎");
      })
      .catch((error) => {
        alert(error.message);
      });
    //arrow function with document as argument in firestore
    setOpens(false);
  };

  //for others

  const handleClickOpen_o = () => {
    setOpen_o(true);
  };

  const handleClose_o = () => {
    setOpen_o(false);
  };

  //TODO
  const [open_o, setOpen_o] = React.useState(false); //initial the state for dialog to open & close
  const [task_o, setTask_o] = React.useState(""); //value of textField
  const [rate_o, setRate_o] = React.useState(""); //value of rating
  const [fav_o, setFav_o] = React.useState(""); //value of rating
  const [toDoList_o, setTodoList_o] = React.useState([]); //updating to the array

  const handleChange_o = (e) => {
    setTask_o(e.target.value);
  };
  const rateChange_o = (e) => {
    setRate_o(e.target.value);
  };
  const handleFavorite_o = (e) => {
    setFav_o(e.target.value);
  };
  const AddTask_o = () => {
    console.log(task);
    const taskDetails_o = {
      skill_name: task_o,
      rate: rate_o,
      fav: fav_o,
    };
    setTodoList_o([...toDoList_o, taskDetails_o]);
    database
      .collection("Skillsets")
      .doc(app.auth().currentUser.uid)
      .collection("otherSkills")
      .add(taskDetails_o)
      .then(() => {})
      .catch((error) => {
        alert(error.message);
      });
    setOpen_o(false);
  };

  console.log("toDolist", toDoList);
  return (
    <div>
      <Typography variant="h4" color="primary">
        Skills
      </Typography>
      <Grid container style={{ justifyContent: "space-evenly" }}>
        <Grid xs={3} className={classes.div}>
          <div>
            <Typography variant="h5" style={{ float: "left" }}>
              Tech Skills
              <Avatar src={logo} />
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ float: "right" }}
              startIcon={<AddCircleOutlinedIcon font-size="large" />}
              onClick={handleClickOpen}
            >
              Add Skills
            </Button>
          </div>
          {/* <Divider variant="middle" /> */}
          <div>
            {toDoList.map((t) => {
              return (
                <ListItem>
                  <Typography variant="h6" color="primary">
                    {t.skill_name}
                  </Typography>
                  <Rating
                    name="half-rating-read"
                    precision={0.5}
                    value={t.rate}
                    className={classes.corner}
                  />
                  {t.fav === "yes" ? (
                    <Favorite color="secondary" className={classes.corner} />
                  ) : null}
                </ListItem>
              );
            })}
          </div>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className={classes.root}>
            Enter the Technical Skill {<Emoji fontSize="small" />}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div className={classes.field}>
                <TextField
                  value={task}
                  onChange={handleChange}
                  autoFocus
                  className={classes.text}
                  label="Name of the Technology"
                  required
                />
              </div>
              <div>
                <Typography className={classes.text}>
                  Rate Your Skill
                </Typography>
                <Rating
                  name="half-rating"
                  onChange={rateChange}
                  precision={0.5}
                />
              </div>
              <div className={classes.field}>
                <FormLabel component="legend" className={classes.text}>
                  Favorite
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="favorite"
                  name="favorite"
                  value={fav}
                  onChange={handleFavorite}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                    className={classes.text}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No"
                    className={classes.text1}
                  />
                </RadioGroup>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" onClick={handleClose}>
              Close
            </Button>
            <Button color="secondary" variant="contained" onClick={AddTask}>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* <Divider orientation="vertical" flexItem className={classes.dividerColor}/> */}

        {/* soft skills */}
        <Grid xs={3} className={classes.div}>
          <div>
            <Typography variant="h5" style={{ float: "left" }}>
              Soft Skills
              <Avatar src={soft} />
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ float: "right" }}
              startIcon={<AddCircleOutlinedIcon font-size="large" />}
              onClick={handleClickOpen_s}
            >
              Add Skills{" "}
            </Button>
          </div>
          <div>
            {toDoList_s.map((t) => {
              return (
                <ListItem>
                  <Typography variant="h6" color="primary">
                    {t.skill_name}
                  </Typography>
                  <Rating
                    name="half-rating-read"
                    precision={0.5}
                    value={t.rate}
                    className={classes.corner}
                  />
                  {t.fav === "yes" ? (
                    <Favorite color="secondary" className={classes.corner} />
                  ) : null}
                </ListItem>
              );
            })}
          </div>

          <Dialog open={opens} onClose={handleClose_s}>
            <DialogTitle className={classes.root}>
              Enter the Soft Skill {<Emoji fontSize="small" />}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <div className={classes.field}>
                  <TextField
                    value={task_s}
                    onChange={handleChange_s}
                    autoFocus
                    className={classes.text}
                    label="Name of the Technology"
                    required
                  />
                </div>
                <div>
                  <Typography className={classes.text}>
                    Rate Your Skill
                  </Typography>
                  <Rating
                    name="half-rating"
                    onChange={rateChange_s}
                    precision={0.5}
                  />
                </div>
                <div className={classes.field}>
                  <FormLabel component="legend" className={classes.text}>
                    Favorite
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="favorite"
                    name="favorite"
                    value={fav_s}
                    onChange={handleFavorite_s}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                      className={classes.text}
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                      className={classes.text1}
                    />
                  </RadioGroup>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                onClick={handleClose_s}
              >
                Close
              </Button>
              <Button color="secondary" variant="contained" onClick={AddTask_s}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>

        {/* <Divider orientation="vertical" flexItem /> */}

        {/* other */}
        <Grid xs={3} className={classes.div}>
          <div>
            <Typography variant="h5" style={{ float: "left" }}>
              Other Skills
              <Avatar src={sport} />
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ float: "right" }}
              startIcon={<AddCircleOutlinedIcon font-size="large" />}
              onClick={handleClickOpen_o}
            >
              Add Skills{" "}
            </Button>
          </div>
          <div>
            {toDoList_o.map((t) => {
              return (
                <ListItem>
                  <Typography variant="h6" color="primary">
                    {t.skill_name}
                  </Typography>
                  <Rating
                    name="half-rating-read"
                    precision={0.5}
                    value={t.rate}
                    className={classes.corner}
                  />
                  {t.fav === "yes" ? (
                    <Favorite color="secondary" className={classes.corner} />
                  ) : null}
                </ListItem>
              );
            })}
          </div>
          <Dialog open={open_o} onClose={handleClose_o}>
            <DialogTitle className={classes.root} size="small">
              Other Skills {<Emoji fontSize="small" />}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <div className={classes.field}>
                  <TextField
                    value={task_o}
                    onChange={handleChange_o}
                    autoFocus
                    className={classes.text}
                    label="Enter the Skill"
                    required
                  />
                </div>
                <div>
                  <Typography className={classes.text}>
                    Rate Your Skill
                  </Typography>
                  <Rating
                    name="half-rating"
                    onChange={rateChange_o}
                    precision={0.5}
                  />
                </div>
                <div className={classes.field}>
                  <FormLabel component="legend" className={classes.text}>
                    Favorite
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="favorite"
                    name="favorite"
                    value={fav_o}
                    onChange={handleFavorite_o}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                      className={classes.text}
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                      className={classes.text1}
                    />
                  </RadioGroup>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                onClick={handleClose_o}
              >
                Close
              </Button>
              <Button color="secondary" variant="contained" onClick={AddTask_o}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </div>
  );
}

export default SkillSet;
