/* eslint-disable react/prop-types,react/no-array-index-key */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import auth from '../auth/auth-helper';
import {
  cancelProduct,
  getStatusValues,
  processCharge,
  update,
} from './api-order';

const styles = (theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
    paddingBottom: 0,
  },
  listImg: {
    width: '70px',
    verticalAlign: 'top',
    marginRight: '10px',
  },
  listDetails: {
    display: 'inline-block',
  },
  listQty: {
    margin: 0,
    fontSize: '0.9em',
    color: '#5f7c8b',
  },
  textField: {
    width: '160px',
    marginRight: '16px',
  },
  statusMessage: {
    position: 'absolute',
    zIndex: '12',
    right: '5px',
    padding: '5px',
  },
});

class ProductOrderEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: 0,
      statusValues: [],
      error: '',
    };
  }

  loadStatusValues = () => {
    getStatusValues().then((data) => {
      if (data.error) {
        this.setState({ error: 'Could not get status' });
      } else {
        this.setState({ statusValues: data, error: '' });
      }
    });
  };

  componentDidMount = () => {
    this.loadStatusValues();
  };

  handleStatusChange = (productIndex) => (event) => {
    const { order } = this.props;
    order.products[productIndex].status = event.target.value;
    const product = order.products[productIndex];
    const jwt = auth.isAuthenticated();

    if (event.target.value == 'Cancelled') {
      cancelProduct(
        {
          shopId: this.props.shopId,
          productId: product.product._id,
        },
        { t: jwt.token },
        {
          cartItemId: product._id,
          status: event.target.value,
          quantity: product.quantity,
        },
      ).then((data) => {
        if (data.error) {
          this.setState({
            error: 'Status not updated, try again',
          });
        } else {
          this.props.updateOrders(
            this.props.orderIndex,
            order,
          );
          this.setState({ error: '' });
        }
      });
    } else if (event.target.value == 'Processing') {
      processCharge(
        {
          userId: jwt.user._id,
          shopId: this.props.shopId,
          orderId: order._id,
        },
        { t: jwt.token },
        {
          cartItemId: product._id,
          status: event.target.value,
          amount: product.quantity * product.product.price,
        },
      ).then((data) => {
        if (data.error) {
          this.setState({
            error: 'Status not updated, try again',
          });
        } else {
          this.props.updateOrders(
            this.props.orderIndex,
            order,
          );
          this.setState({ error: '' });
        }
      });
    } else {
      update(
        {
          shopId: this.props.shopId,
        },
        { t: jwt.token },
        {
          cartItemId: product._id,
          status: event.target.value,
        },
      ).then((data) => {
        if (data.error) {
          this.setState({
            error: 'Status not updated, try again',
          });
        } else {
          this.props.updateOrders(
            this.props.orderIndex,
            order,
          );
          this.setState({ error: '' });
        }
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Typography
          component="span"
          color="error"
          className={classes.statusMessage}
        >
          {this.state.error}
        </Typography>
        <List
          disablePadding
          style={{ backgroundColor: '#f8f8f8' }}
        >
          {this.props.order.products.map((item, index) => (
            <span key={index}>
              {item.shop == this.props.shopId && (
                <ListItem button className={classes.nested}>
                  <ListItemText
                    primary={(
                      <div>
                        <img
                          className={classes.listImg}
                          src={`/api/product/image/${item.product._id}`}
                          alt="product"
                        />
                        <div
                          className={classes.listDetails}
                        >
                          {item.product.name}
                          <p
                            className={classes.listQty}
                          >{`Quantity: ${item.quantity}`}
                          </p>
                        </div>
                      </div>
                    )}
                  />
                  <TextField
                    id="select-status"
                    select
                    label="Update Status"
                    className={classes.textField}
                    value={item.status}
                    onChange={this.handleStatusChange(
                      index,
                    )}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                  >
                    {this.state.statusValues.map(
                      (option) => (
                        <MenuItem
                          key={option}
                          value={option}
                        >
                          {option}
                        </MenuItem>
                      ),
                    )}
                  </TextField>
                </ListItem>
              )}
              <Divider
                style={{ margin: 'auto', width: '80%' }}
              />
            </span>
          ))}
        </List>
      </>
    );
  }
}

export default withStyles(styles)(ProductOrderEdit);
