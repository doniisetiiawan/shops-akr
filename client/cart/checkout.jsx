/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import auth from '../auth/auth-helper';
import cart from './cart-helper';
import PlaceOrder from './placeOrder';

const styles = (theme) => ({
  card: {
    margin: '24px 0px',
    padding: '16px 40px 90px 40px',
    backgroundColor: '#80808017',
  },
  title: {
    margin: '24px 16px 8px 0px',
    color: theme.palette.openTitle,
  },
  subheading: {
    color: 'rgba(88, 114, 128, 0.87)',
    marginTop: '20px',
  },
  addressField: {
    marginTop: '4px',
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: '45%',
  },
  streetField: {
    marginTop: '4px',
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: '93%',
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: '90%',
  },
});

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkoutDetails: {
        customer_name: '',
        customer_email: '',
        delivery_address: {
          street: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
        },
      },
      error: '',
    };
  }

  componentDidMount = () => {
    const { user } = auth.isAuthenticated();
    const { checkoutDetails } = this.state;
    checkoutDetails.products = cart.getCart();
    checkoutDetails.customer_name = user.name;
    checkoutDetails.customer_email = user.email;
    this.setState({ checkoutDetails });
  };

  handleCustomerChange = (name) => (event) => {
    const { checkoutDetails } = this.state;
    checkoutDetails[name] = event.target.value || undefined;
    this.setState({ checkoutDetails });
  };

  handleAddressChange = (name) => (event) => {
    const { checkoutDetails } = this.state;
    checkoutDetails.delivery_address[name] = event.target.value || undefined;
    this.setState({ checkoutDetails });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Card className={classes.card}>
          <Typography
            type="title"
            className={classes.title}
          >
            Checkout
          </Typography>
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={this.state.checkoutDetails.customer_name}
            onChange={this.handleCustomerChange(
              'customer_name',
            )}
            margin="normal"
          />
          <br />
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={
              this.state.checkoutDetails.customer_email
            }
            onChange={this.handleCustomerChange(
              'customer_email',
            )}
            margin="normal"
          />
          <br />
          <Typography
            type="subheading"
            component="h3"
            className={classes.subheading}
          >
            Delivery Address
          </Typography>
          <TextField
            id="street"
            label="Street Address"
            className={classes.streetField}
            value={
              this.state.checkoutDetails.delivery_address
                .street
            }
            onChange={this.handleAddressChange('street')}
            margin="normal"
          />
          <br />
          <TextField
            id="city"
            label="City"
            className={classes.addressField}
            value={
              this.state.checkoutDetails.delivery_address
                .city
            }
            onChange={this.handleAddressChange('city')}
            margin="normal"
          />
          <TextField
            id="state"
            label="State"
            className={classes.addressField}
            value={
              this.state.checkoutDetails.delivery_address
                .state
            }
            onChange={this.handleAddressChange('state')}
            margin="normal"
          />
          <br />
          <TextField
            id="zipcode"
            label="Zip Code"
            className={classes.addressField}
            value={
              this.state.checkoutDetails.delivery_address
                .zipcode
            }
            onChange={this.handleAddressChange('zipcode')}
            margin="normal"
          />
          <TextField
            id="country"
            label="Country"
            className={classes.addressField}
            value={
              this.state.checkoutDetails.delivery_address
                .country
            }
            onChange={this.handleAddressChange('country')}
            margin="normal"
          />
          <br />
          {this.state.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {this.state.error}
            </Typography>
          )}
          <div>
            <PlaceOrder checkoutDetails={this.state.checkoutDetails} />
          </div>
        </Card>
      </>
    );
  }
}

export default withStyles(styles)(Checkout);
