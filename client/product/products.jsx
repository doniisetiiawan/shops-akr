/* eslint-disable react/prop-types,react/no-array-index-key */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Link } from 'react-router-dom';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import AddToCart from '../cart/addToCart';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    textAlign: 'left',
    padding: '0 8px',
  },
  container: {
    minWidth: '100%',
    paddingBottom: '14px',
  },
  gridList: {
    width: '100%',
    minHeight: 200,
    padding: '16px 0 10px',
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(
      2.5,
    )}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: '100%',
  },
  tile: {
    textAlign: 'center',
  },
  image: {
    height: '100%',
  },
  tileBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    textAlign: 'left',
  },
  tileTitle: {
    fontSize: '1.1em',
    marginBottom: '5px',
    color: 'rgb(189, 222, 219)',
    display: 'block',
  },
});

function Products(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      {props.products.length > 0 ? (
        <div>
          <GridList cellHeight={200} cols={3}>
            {props.products.map((product, i) => (
              <GridListTile key={i}>
                <Link to={`/product/${product._id}`}>
                  <img
                    src={`/api/product/image/${product._id}`}
                    alt={product.name}
                  />
                </Link>
                <GridListTileBar
                  title={(
                    <Link to={`/product/${product._id}`}>
                      {product.name}
                    </Link>
                  )}
                  subtitle={
                    <span>$ {product.price}</span>
                  }
                  actionIcon={<AddToCart item={product} />}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      ) : (
        props.searched && (
          <Typography type="subheading" component="h4">
            No products found! :(
          </Typography>
        )
      )}
    </div>
  );
}

export default withStyles(styles)(Products);
