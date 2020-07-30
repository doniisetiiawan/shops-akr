/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { read } from './api-shop';
import Products from '../product/products';
import { listByShop } from '../product/api-product';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: 'center',
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em',
  },
  subheading: {
    marginTop: theme.spacing(),
    color: theme.palette.openTitle,
  },
  bigAvatar: {
    width: 100,
    height: 100,
    margin: 'auto',
  },
  productTitle: {
    padding: `${theme.spacing(3)}px ${theme.spacing(
      2.5,
    )}px ${theme.spacing()}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: '100%',
    fontSize: '1.2em',
  },
});

class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shop: '',
      products: [],
    };
  }

  loadProducts = () => {
    listByShop({
      shopId: this.props.match.params.shopId,
    }).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ products: data });
      }
    });
  };

  componentDidMount = () => {
    this.loadProducts();
    read({
      shopId: this.props.match.params.shopId,
    }).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ shop: data });
      }
    });
  };

  render() {
    const logoUrl = this.state.shop._id
      ? `/api/shops/logo/${
        this.state.shop._id
      }?${new Date().getTime()}`
      : '/api/shops/defaultphoto';
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={4} sm={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography
                  type="headline"
                  component="h2"
                  className={classes.title}
                >
                  {this.state.shop.name}
                </Typography>
                <br />
                <Avatar
                  src={logoUrl}
                  className={classes.bigAvatar}
                />
                <br />
                <Typography
                  type="subheading"
                  component="h2"
                >
                  {this.state.shop.description}
                </Typography>
                <br />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8} sm={8}>
            <Card>
              <Typography
                type="title"
                component="h2"
                className={classes.productTitle}
              >
                Products
              </Typography>
              <Products
                products={this.state.products}
                searched={false}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Shop);
