/* eslint-disable react/prop-types,react/no-array-index-key */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { listByUser } from './api-order';
import auth from '../auth/auth-helper';

const styles = (theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: '12px 24px',
    padding: theme.spacing(3),
    backgroundColor: '#3f3f3f0d',
  }),
  title: {
    margin: `${theme.spacing(
      2,
    )}px 0 12px ${theme.spacing()}px`,
    color: theme.palette.openTitle,
  },
});

class MyOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
    };
  }

  loadOrders = () => {
    const jwt = auth.isAuthenticated();
    listByUser(
      {
        userId: jwt.user._id,
      },
      { t: jwt.token },
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ orders: data });
      }
    });
  };

  componentDidMount = () => {
    this.loadOrders();
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography
            type="title"
            className={classes.title}
          >
            Your Orders
          </Typography>
          <List dense>
            {this.state.orders.map((order, i) => (
              <span key={i}>
                <Link to={`/order/${order._id}`}>
                  <ListItem button>
                    <ListItemText
                      primary={(
                        <strong>
                          {`Order # ${order._id}`}
                        </strong>
                        )}
                      secondary={new Date(
                        order.created,
                      ).toDateString()}
                    />
                  </ListItem>
                </Link>
                <Divider />
              </span>
            ))}
          </List>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(MyOrders);
