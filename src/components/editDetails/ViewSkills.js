import React, { useEffect, useState } from "react";
// import { Edit, Favorite } from "@material-ui/icons";
// import Rating from "@material-ui/lab/Rating";
// import { database, app } from "../../mockfirebase";
import { Paper, Grid, Typography } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import ListItem from "@material-ui/core/ListItem";
// import IconButton from "@material-ui/core/IconButton";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import UpdateTechSkillInfo from "../edit/UpdateTechSkillsInfo";
// import UpdateSoftSkillInfo from "../edit/UpdateSoftSkillInfo";
import ViewTechSkills from "../edit/ViewTechSkills";
import ViewOtherSkills from "../edit/ViewOtherSkills";
import ViewSoftSkills from "../edit/ViewSoftSkills";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
//   icon: {
//     height: "40px",
//     width: "40px",
//   },
//   card: {
//     width: 345,
//   },
//   media: {
//     height: 140,
//   },
//   corner: {
//     paddingLeft: 20,
//   },
// }));
function ViewSkills() {
  // const [techSkillsInfo, setTechSkillsInfo] = useState([]);
  // const [softSkillsInfo, setSoftSkillsInfo] = useState([]);
  // const [otherSkillsInfo, setOtherSkillsInfo] = useState([]);
  // const [open, setOpen] = useState(false);
  // const [editValue, setEditValue] = useState([]);
  // const [openSoft, setOpenSoft] = useState(false);
  // const [editValueSoft, setEditValueSoft] = useState([]);
  // const classes = useStyles();
  // useEffect(() => {
  //   getTechSkillsInfo();
  //   getSoftSkillsInfo();
  //   getOtherSkillsInfo();
  // }, []);
  // const getTechSkillsInfo = () => {
  //   database
  //     .collection("Skillsets")
  //     .doc(app.auth().currentUser.uid)
  //     .collection("TechSkills")
  //     .get()
  //     .then((querySnapshot) => {
  //       const list = [];
  //       querySnapshot.forEach((doc) => {
  //         const data = doc.data();
  //         list.push({ id: doc.id, ...data });
  //       });
  //       setTechSkillsInfo(list);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  // const getSoftSkillsInfo = () => {
  //   database
  //     .collection("Skillsets")
  //     .doc(app.auth().currentUser.uid)
  //     .collection("softSkills")
  //     .get()
  //     .then((querySnapshot) => {
  //       const list = [];
  //       querySnapshot.forEach((doc) => {
  //         const data = doc.data();
  //         list.push({ id: doc.id, ...data });
  //       });
  //       setSoftSkillsInfo(list);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };
  // const getOtherSkillsInfo = () => {
  //   database
  //     .collection("Skillsets")
  //     .doc(app.auth().currentUser.uid)
  //     .collection("otherSkills")
  //     .get()
  //     .then((querySnapshot) => {
  //       const list = [];
  //       querySnapshot.forEach((doc) => {
  //         const data = doc.data();
  //         list.push({ id: doc.id, ...data });
  //       });
  //       setOtherSkillsInfo(list);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };
  // const handleClick = (t) => {
  //   setOpen(true);
  //   setEditValue(t);
  // };
  // const handleClickSoft = (t) => {
  //   setOpenSoft(true);
  //   setEditValueSoft(t);
  // };
  // const handleClose = (newValue) => {
  //   setOpen(newValue);
  //   setEditValue([]);
  // };
  // const handleCloseSoft = (newValue) => {
  //   setOpenSoft(newValue);
  //   setEditValueSoft([]);
  // };

  return (
    <>
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
            <ViewTechSkills />
          </Grid>
          <Grid item>
            <ViewSoftSkills />
          </Grid>
          <Grid item>
            <ViewOtherSkills />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default ViewSkills;
