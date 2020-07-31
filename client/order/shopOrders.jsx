/* eslint-disable react/prop-types,react/no-array-index-key */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import { listByShop } from './api-order';
import auth from '../auth/auth-helper';
import ProductOrderEdit from './productOrderEdit';

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
  subheading: {
    marginTop: theme.spacing(),
    color: '#434b4e',
    fontSize: '1.1em',
  },
  customerDetails: {
    paddingLeft: '36px',
    paddingTop: '16px',
    backgroundColor: '#f8f8f8',
  },
});

class ShopOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: 0,
      orders: [],
    };
  }

  loadOrders = () => {
    const jwt = auth.isAuthenticated();
    listByShop(
      {
        shopId: this.props.match.params.shopId,
      },
      { t: jwt.token },
    ).then((data) => {
      if (data.error) {
        console.log(data);
      } else {
        this.setState({ orders: data });
      }
    });
  };

  componentDidMount = () => {
    this.loadOrders();
  };

  handleClick = (index) => {
    this.setState({ open: index });
  };

  updateOrders = (index, updatedOrder) => {
    const { orders } = this.state;
    orders[index] = updatedOrder;
    this.setState({ orders });
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
            Orders in {this.props.match.params.shop}
          </Typography>
          <List dense>
            {this.state.orders.map((order, index) => (
              <span key={index}>
                <ListItem
                  button
                  onClick={() => this.handleClick(index)}
                >
                  <ListItemText
                    primary={`Order # ${order._id}`}
                    secondary={new Date(
                      order.created,
                    ).toDateString()}
                  />
                  {this.state.open == index ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItem>
                <Divider />
                <Collapse
                  component="li"
                  in={this.state.open == index}
                  timeout="auto"
                  unmountOnExit
                >
                  <ProductOrderEdit
                    shopId={this.props.match.params.shopId}
                    order={order}
                    orderIndex={index}
                    updateOrders={this.updateOrders}
                  />
                  <div className={classes.customerDetails}>
                    <Typography
                      type="subheading"
                      component="h3"
                      className={classes.subheading}
                    >
                      Deliver to:
                    </Typography>
                    <Typography
                      type="subheading"
                      component="h3"
                      color="primary"
                    >
                      <strong>{order.customer_name}</strong>{' '}
                      ({order.customer_email})
                    </Typography>
                    <Typography
                      type="subheading"
                      component="h3"
                      color="primary"
                    >
                      {order.delivery_address.street}
                    </Typography>
                    <Typography
                      type="subheading"
                      component="h3"
                      color="primary"
                    >
                      {order.delivery_address.city},{' '}
                      {order.delivery_address.state}{' '}
                      {order.delivery_address.zipcode}
                    </Typography>
                    <Typography
                      type="subheading"
                      component="h3"
                      color="primary"
                    >
                      {order.delivery_address.country}
                    </Typography>
                    <br />
                  </div>
                </Collapse>
                <Divider />
              </span>
            ))}
          </List>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ShopOrders);
