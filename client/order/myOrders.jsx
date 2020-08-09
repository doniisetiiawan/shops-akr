/* eslint-disable react/prop-types,react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';
import auth from '../auth/auth-helper';
import { listByUser } from './api-order';

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: '12px 24px',
    padding: theme.spacing(3),
    backgroundColor: '#3f3f3f0d',
  }),
  title: {
    margin: `${theme.spacing(2)}px 0 12px ${theme.spacing(
      1,
    )}px`,
    color: theme.palette.openTitle,
  },
}));

function MyOrders() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    listByUser(
      {
        userId: jwt.user._id,
      },
      { t: jwt.token },
      signal,
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography type="title" className={classes.title}>
        Your Orders
      </Typography>
      <List dense>
        {orders.map((order, i) => (
          <span key={i}>
            <Link to={`/order/${order._id}`}>
              <ListItem button>
                <ListItemText
                  primary={
                    <strong>{`Order # ${order._id}`}</strong>
                  }
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
  );
}

export default MyOrders;
