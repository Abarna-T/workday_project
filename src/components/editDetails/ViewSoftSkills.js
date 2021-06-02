import React, { useEffect, useState } from "react";
import { Edit, Favorite } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import { database, app } from "../../mockfirebase";
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import UpdateSoftSkillInfo from "../edit/UpdateSoftSkillInfo";

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
function ViewSoftSkills() {
  const [softSkillsInfo, setSoftSkillsInfo] = useState([]);
  const [open, setOpen] = useState(false);
  const [editValue, setEditValue] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    getSoftSkillsInfo();
  }, []);
  const getSoftSkillsInfo = () => {
    database
      .collection("Skillsets")
      .doc(app.auth().currentUser.uid)
      .collection("SoftSkills")
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

  const handleClick = (t) => {
    setOpen(true);
    setEditValue(t);
  };
  const handleClose = (newValue) => {
    setOpen(newValue);
    setEditValue([]);
  };

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://www.nojitter.com/sites/default/files/Visual%20Generation_AdobeStock_297401980_0.jpeg"
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
                    {/* <Typography variant="h6" color="primary">{t.skill_name}{" "}{`Rating:${t.rate}`}{" "}{`(favourite=${t.fav})`}</Typography> */}
                    <Rating
                      name="half-rating-read"
                      precision={0.5}
                      value={t.rate}
                      disabled
                      className={classes.corner}
                    />
                    {t.fav === "yes" ? (
                      <Favorite color="secondary" className={classes.corner} />
                    ) : (
                      <FavoriteBorderIcon
                        color="secondary"
                        className={classes.corner}
                      />
                    )}
                    <IconButton
                      component="span"
                      color="primary"
                      onClick={() => handleClick(t)}
                    >
                      <Edit />
                    </IconButton>
                  </ListItem>
                );
              })}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {open && (
        <UpdateSoftSkillInfo
          open={open}
          t={editValue}
          getsoftinfo={getSoftSkillsInfo}
          onChange={handleClose}
        />
      )}
    </>
  );
}

export default ViewSoftSkills;
