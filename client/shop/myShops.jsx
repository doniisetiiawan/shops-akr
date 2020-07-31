/* eslint-disable react/no-array-index-key,react/no-access-state-in-setstate,react/prop-types */
import React, { Component } from 'react';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Link, Redirect } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { Edit } from '@material-ui/icons';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import auth from '../auth/auth-helper';
import { listByOwner } from './api-shop';
import DeleteShop from './deleteShop';

const styles = (theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(
      3,
    )}px ${theme.spacing()}px`,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em',
  },
  addButton: {
    float: 'right',
  },
  leftIcon: {
    marginRight: '8px',
  },
});

class MyShops extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shops: [],
      redirectToSignin: false,
    };
  }

  loadShops = () => {
    const jwt = auth.isAuthenticated();
    listByOwner(
      {
        userId: jwt.user._id,
      },
      { t: jwt.token },
    ).then((data) => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ shops: data });
      }
    });
  };

  removeShop = (shop) => {
    const updatedShops = this.state.shops;
    const index = updatedShops.indexOf(shop);
    updatedShops.splice(index, 1);
    this.setState({ shops: updatedShops });
  };

  componentDidMount = () => {
    this.loadShops();
  };

  render() {
    const { classes } = this.props;
    const { redirectToSignin } = this.state;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }

    return (
      <>
        <Paper className={classes.root} elevation={4}>
          <Typography
            type="title"
            className={classes.title}
          >
            Your Shops
            <span className={classes.addButton}>
              <Link to="/seller/shop/new">
                <Button color="primary" variant="contained">
                  <Icon className={classes.leftIcon}>
                    add_box
                  </Icon>
                  New Shop
                </Button>
              </Link>
            </span>
          </Typography>
          <List dense>
            {this.state.shops.map((shop, i) => (
              <span key={i}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      src={`/api/shops/logo/${
                        shop._id
                      }?${new Date().getTime()}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={shop.name}
                    secondary={shop.description}
                  />
                  {auth.isAuthenticated().user
                    && auth.isAuthenticated().user._id
                      == shop.owner._id && (
                      <ListItemSecondaryAction>
                        <Link to={`/seller/orders/${shop.name}/${shop._id}`}>
                          <Button aria-label="Orders" color="primary">
                            View Orders
                          </Button>
                        </Link>
                        <Link
                          to={`/seller/shop/edit/${shop._id}`}
                        >
                          <IconButton
                            aria-label="Edit"
                            color="primary"
                          >
                            <Edit />
                          </IconButton>
                        </Link>
                        <DeleteShop
                          shop={shop}
                          onRemove={this.removeShop}
                        />
                      </ListItemSecondaryAction>
                  )}
                </ListItem>
                <Divider />
              </span>
            ))}
          </List>
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(MyShops);
