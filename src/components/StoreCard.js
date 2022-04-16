import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { SERVER } from '../api';
import Image from "@material-tailwind/react/Image";

import clsx from "clsx";
//import prod from "../assets/img/map.jpg";
//import loja from "../assets/img/loja.png";
import Collapse from "@material-ui/core/Collapse";

import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 300,
    margin: "2%",
    flex: 1,
  },

  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  submedia: {
    height: 0,
    paddingTop: "40%", // 16:9
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const MediaCard = (props) => {

const imagem =  `${SERVER}/${props.photo}`;

const foto = props.photo === null ? "https://images.tcdn.com.br/img/img_prod/696987/fosfato_monoamonico_map_dripsol_sqm_sc_25kg_263_1_20191116163351.jpg" : imagem
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card className={classes.root}>
      <CardActionArea>
       

         <Image src={foto} />
         

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.category}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <div>Detalhes: </div>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <b>Valor:</b> R$ {props.value}
          </Typography>
          <Typography paragraph>
            <b>Unidade:</b> {props.unit}
          </Typography>
          <Typography paragraph>
            <b>Detalhes:</b> {props.describe}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default MediaCard;
