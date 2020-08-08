/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
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
}));

function PlaceOrder() {
  const classes = useStyles();
  const [values, setValues] = useState({
    order: {},
    error: '',
    redirect: false,
    orderId: '',
  });

  const placeOrder = () => {
    console.log('test');
  };

  if (values.redirect) {
    return <Redirect to={`/order/${values.orderId}`} />;
  }

  return (
    <span>
      <Typography
        type="subheading"
        component="h3"
        className={classes.subheading}
      >
        Card details
      </Typography>
      {/* <CardElement */}
      {/*  className={classes.StripeElement} */}
      {/*  {...{ */}
      {/*    style: { */}
      {/*      base: { */}
      {/*        color: '#424770', */}
      {/*        letterSpacing: '0.025em', */}
      {/*        fontFamily: */}
      {/*          'Source Code Pro, Menlo, monospace', */}
      {/*        '::placeholder': { */}
      {/*          color: '#aab7c4', */}
      {/*        }, */}
      {/*      }, */}
      {/*      invalid: { */}
      {/*        color: '#9e2146', */}
      {/*      }, */}
      {/*    }, */}
      {/*  }} */}
      {/* /> */}
      <div className={classes.checkout}>
        {values.error && (
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
            {values.error}
          </Typography>
        )}
        <Button
          color="secondary"
          variant="contained"
          onClick={placeOrder}
        >
          Place Order
        </Button>
      </div>
    </span>
  );
}

export default PlaceOrder;
