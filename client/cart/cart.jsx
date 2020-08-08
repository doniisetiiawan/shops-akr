/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import CartItems from './cartItems';
import Checkout from './checkout';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
}));

function Cart() {
  const classes = useStyles();
  const [checkout, setCheckout] = useState(false);

  const showCheckout = (val) => {
    setCheckout(val);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={6} sm={6}>
          <CartItems
            checkout={checkout}
            setCheckout={showCheckout}
          />
        </Grid>
        {checkout && (
          <Grid item xs={6} sm={6}>
            {/* <StripeProvider apiKey={config.stripe_test_api_key}> */}
            <Checkout />
            {/* </StripeProvider> */}
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Cart;
