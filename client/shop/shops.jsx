/* eslint-disable react/no-array-index-key,react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { list } from './api-shop';

const styles = (theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
    textAlign: 'center',
    fontSize: '1.2em',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  subheading: {
    color: theme.palette.text.secondary,
  },
  shopTitle: {
    fontSize: '1.2em',
    marginBottom: '5px',
  },
  details: {
    padding: '24px',
  },
});

class Shops extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shops: [],
    };
  }

  loadShops = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ shops: data });
      }
    });
  };

  componentDidMount = () => {
    this.loadShops();
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Paper className={classes.root} elevation={4}>
          <Typography
            type="title"
            className={classes.title}
          >
            All Shops
          </Typography>
          <List dense>
            {this.state.shops.map((shop, i) => (
              <Link to={`/shops/${shop._id}`} key={i}>
                <Divider />
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      src={`/api/shops/logo/${
                        shop._id
                      }?${new Date().getTime()}`}
                    />
                  </ListItemAvatar>
                  <div>
                    <Typography
                      type="headline"
                      component="h2"
                      color="primary"
                    >
                      {shop.name}
                    </Typography>
                    <Typography
                      type="subheading"
                      component="h4"
                    >
                      {shop.description}
                    </Typography>
                  </div>
                </ListItem>
                <Divider />
              </Link>
            ))}
          </List>
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(Shops);
