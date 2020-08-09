// eslint-disable-next-line max-len
/* eslint-disable react/no-array-index-key,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';
import Products from './products';
import { list } from './api-product';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    width: '100%',
    transform: 'translateZ(0)',
  },
  tileTitle: {
    verticalAlign: 'middle',
    lineHeight: 2.5,
    textAlign: 'center',
    fontSize: '1.35em',
    margin: '0 4px 0 0',
  },
  card: {
    margin: 'auto',
    marginTop: 20,
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(
      2.5,
    )}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    backgroundColor: '#80808024',
    fontSize: '1.1em',
  },
  icon: {
    verticalAlign: 'sub',
    color: '#738272',
    fontSize: '0.9em',
  },
  link: {
    color: '#4d6538',
    textShadow: '0px 2px 12px #ffffff',
    cursor: 'pointer',
  },
}));

function Categories(props) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(
    props.categories[0],
  );

  useEffect(() => {
    const abortController = new AbortController();

    list({
      category: props.categories[0],
    }).then((data) => {
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

  const listbyCategory = (category) => () => {
    setSelected(category);
    list({
      category,
    }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  return (
    <div>
      <Card className={classes.card}>
        <Typography type="title" className={classes.title}>
          Explore by category
        </Typography>
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={4}>
            {props.categories.map((tile, i) => (
              <GridListTile
                key={i}
                className={classes.tileTitle}
                style={{
                  height: '64px',
                  backgroundColor:
                    selected == tile
                      ? 'rgba(95, 139, 137, 0.56)'
                      : 'rgba(95, 124, 139, 0.32)',
                }}
              >
                <span
                  className={classes.link}
                  onClick={listbyCategory(tile)}
                >
                  {tile}{' '}
                  <Icon className={classes.icon}>
                    {selected == tile && 'arrow_drop_down'}
                  </Icon>
                </span>
              </GridListTile>
            ))}
          </GridList>
        </div>
        <Divider />
        <Products products={products} searched={false} />
      </Card>
    </div>
  );
}

export default Categories;
