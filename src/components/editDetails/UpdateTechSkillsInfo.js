import React, { useState } from "react";
import { database, app } from "../../mockfirebase";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Favorite from "@material-ui/icons/Favorite";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
function UpdateTechSkillsInfo(props) {
  console.log("opened update dialog");
  const t = props.t; //line 1
  console.log(props.open);
  console.log("in update", t);
  const [updatetechskillsinfo, setUpdateTechSkillsInfo] = useState(t);

  const handleOnChange = (e) => {
    setUpdateTechSkillsInfo({
      ...updatetechskillsinfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    //setOpen(false);
    props.onChange(false);
  };
  const update = () => {
    database
      .collection("Skillsets")
      .doc(app.auth().currentUser.uid)
      .collection("TechSkills")
      .doc(t.id)
      .update({
        skill_name: updatetechskillsinfo.skill_name,
        rate: updatetechskillsinfo.rate,
        fav: updatetechskillsinfo.fav,
      })

      .then(() => {
        //setOpen(false);
        console.log(updatetechskillsinfo.fav);
        props.onChange(false);
        alert("updated");
        props.gettechnicalinfo();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      {/* {open && (<>)} */}

      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update TechSkillsInfo</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the update values</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="skill_name"
            fullWidth
            value={updatetechskillsinfo.skill_name}
            onChange={handleOnChange}
          />
          <Rating
            name="half-rating-read"
            precision={0.5}
            value={updatetechskillsinfo.rate}
            // className={classes.corner}
            name="rate"
            onChange={handleOnChange}
          />
          {/* <Favorite
            color="secondary"
            value={updatetechskillsinfo.fav}
            name="fav"
            onChange={handleOnChange}
          /> */}
          <div>
            <FormLabel component="legend">Favorite</FormLabel>
            <RadioGroup
              row
              aria-label="favorite"
              value={updatetechskillsinfo.fav}
              name="fav"
              onChange={handleOnChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={update} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateTechSkillsInfo;
