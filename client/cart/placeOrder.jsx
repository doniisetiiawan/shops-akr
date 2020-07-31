/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import auth from '../auth/auth-helper';
import { create } from '../order/api-order';
import cart from './cart-helper';

const styles = () => ({
  subheading: {
    color: 'rgba(88, 114, 128, 0.87)',
    marginTop: '20px',
  },
  checkout: {
    float: 'right',
    margin: '20px 30px',
  },
  error: {
    display: 'inline',
    padding: '0px 10px',
  },
  errorIcon: {
    verticalAlign: 'middle',
  },
  StripeElement: {
    display: 'block',
    margin: '24px 0 10px 10px',
    maxWidth: '408px',
    padding: '10px 14px',
    boxShadow:
      'rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px',
    borderRadius: '4px',
    background: 'white',
  },
});

class PlaceOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: {},
      error: '',
      redirect: false,
    };
  }

  placeOrder = () => {
    const jwt = auth.isAuthenticated();
    create(
      { userId: jwt.user._id },
      {
        t: jwt.token,
      },
      this.props.checkoutDetails,
      'payload.token.id',
    ).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        cart.emptyCart(() => {
          this.setState({
            orderId: data._id,
            redirect: true,
          });
        });
      }
    });
  };

  render() {
    const { classes } = this.props;
    if (this.state.redirect) {
      return (
        <Redirect to={`/order/${this.state.orderId}`} />
      );
    }

    return (
      <>
        <span>
          <Typography
            type="subheading"
            component="h3"
            className={classes.subheading}
          >
            Card details
          </Typography>
          <div className={classes.checkout}>
            {this.state.error && (
              <Typography
                component="span"
                color="error"
                className={classes.error}
              >
                <Icon
                  color="error"
                  className={classes.errorIcon}
                >
                  error
                </Icon>
                {this.state.error}
              </Typography>
            )}
            <Button
              color="secondary"
              variant="contained"
              onClick={this.placeOrder}
            >
              Place Order
            </Button>
          </div>
        </span>
      </>
    );
  }
}

export default withStyles(styles)(PlaceOrder);
