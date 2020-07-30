/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CartItems from './cartItems';

const styles = () => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
});

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkout: false,
    };
  }

  setCheckout = (val) => {
    this.setState({ checkout: val });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={6} sm={6}>
            <CartItems
              checkout={this.state.checkout}
              setCheckout={this.setCheckout}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Cart);
