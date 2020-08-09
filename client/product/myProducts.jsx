/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
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
import { Edit } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';
import DeleteProduct from './deleteProduct';
import { listByShop } from './api-product';

const useStyles = makeStyles((theme) => ({
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
}));

function MyProducts(props) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    listByShop(
      {
        shopId: props.shopId,
      },
      signal,
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const removeProduct = (product) => {
    const updatedProducts = [...products];
    const index = updatedProducts.indexOf(product);
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <Card className={classes.products}>
      <Typography type="title" className={classes.title}>
        Products
        <span className={classes.addButton}>
          <Link to={`/seller/${props.shopId}/products/new`}>
            <Button color="primary" variant="contained">
              <Icon className={classes.leftIcon}>
                add_box
              </Icon>{' '}
              New Product
            </Button>
          </Link>
        </span>
      </Typography>
      <List dense>
        {products.map((product, i) => (
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
                  Quantity: {product.quantity} | Price: $
                  {product.price}
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
                <DeleteProduct
                  product={product}
                  shopId={props.shopId}
                  onRemove={removeProduct}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </span>
        ))}
      </List>
    </Card>
  );
}

export default MyProducts;
