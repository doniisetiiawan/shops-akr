import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import Suggestions from '../product/suggestions';
import Search from '../product/search';
import Categories from '../product/categories';
import {
  listCategories,
  listLatest,
} from '../product/api-product';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
}));

function Home() {
  const classes = useStyles();
  const [suggestionTitle, setSuggestionTitle] = useState(
    'Latest Products',
  );
  const [categories, setCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    listLatest(signal).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setSuggestions(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    listCategories(signal).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={8}>
          <Search categories={categories} />
          <Categories categories={categories} />
        </Grid>
        <Grid item xs={4} sm={4}>
          <Suggestions
            products={suggestions}
            title={suggestionTitle}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
