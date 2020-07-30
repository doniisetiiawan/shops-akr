/* eslint-disable react/prop-types,react/no-array-index-key */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CardMedia from '@material-ui/core/CardMedia';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { AttachFile as FileUpload, Edit } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import { listByShop } from './api-product';

const styles = (theme) => ({
  products: {
    padding: '24px',
  },
  addButton: {
    float: 'right',
  },
  leftIcon: {
    marginRight: '8px',
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em',
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  cover: {
    width: 110,
    height: 100,
    margin: '8px',
  },
  details: {
    padding: '10px',
  },
});

class MyProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  loadProducts = () => {
    listByShop({
      shopId: this.props.shopId,
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
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Card className={classes.products}>
          <Typography
            type="title"
            className={classes.title}
          >
            Products
            <span className={classes.addButton}>
              <Link
                to={`/seller/${this.props.shopId}/products/new`}
              >
                <Button color="primary" variant="raised">
                  <Icon className={classes.leftIcon}>
                    add_box
                  </Icon>
                  New Product
                </Button>
              </Link>
            </span>
          </Typography>
          <List dense>
            {this.state.products.map((product, i) => (
              <span key={i}>
                <ListItem>
                  <CardMedia
                    className={classes.cover}
                    image={`/api/product/image/${
                      product._id
                    }?${new Date().getTime()}`}
                    title={product.name}
                  />
                  <div className={classes.details}>
                    <Typography
                      type="headline"
                      component="h2"
                      color="primary"
                      className={classes.productTitle}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      type="subheading"
                      component="h4"
                      className={classes.subheading}
                    >
                      Quantity: {product.quantity} | Price:
                      ${product.price}
                    </Typography>
                  </div>
                  <ListItemSecondaryAction>
                    <Link
                      to={`/seller/${product.shop._id}/${product._id}/edit`}
                    >
                      <IconButton
                        aria-label="Edit"
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                    </Link>
                    {/* <DeleteProduct */}
                    {/*  product={product} */}
                    {/*  shopId={this.props.shopId} */}
                    {/*  onRemove={this.removeProduct} */}
                    {/* /> */}
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </span>
            ))}
          </List>
        </Card>
      </>
    );
  }
}

export default withStyles(styles)(MyProducts);
