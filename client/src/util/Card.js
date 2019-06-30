// Component to show cards
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: '100%',
    marginTop:'1%',
    marginLeft:'20%',
    marginRight:'20%',
    backgroundColor:'#f0f3f6'
    // backgroundColor:'#3d70b2'
    // backgroundColor:'#747275'
  },
  right:{
      float:'right',
      marginLeft:'auto'
  }
});

 const CustomCard = ({thread:{title,description,tags,date}}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
          {tags && tags.map(tag =>{
              return(
                <Button size="small" color="primary" key={tag}>
                    {tag}
                </Button>
              )
          })}
          <Typography component="h6" className={classes.right}>{new Date(date).toLocaleDateString()}</Typography>
      </CardActions>
    </Card>
  );
}
export default CustomCard;