import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Suggestions from '../product/suggestions';
import { listLatest, listCategories } from '../product/api-product';
import Search from '../product/search';
import Categories from '../product/categories';

const styles = () => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestionTitle: 'Latest Products',
      suggestions: [],
      categories: [],
    };
  }

  componentDidMount = () => {
    listLatest().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ suggestions: data });
      }
    });
    listCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ categories: data });
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={8} sm={8}>
            <Search categories={this.state.categories} />
            <Categories categories={this.state.categories} />
          </Grid>
          <Grid item xs={4} sm={4}>
            <Suggestions
              products={this.state.suggestions}
              title={this.state.suggestionTitle}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Home);

Home.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};
