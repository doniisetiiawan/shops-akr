/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Search as SearchIcon } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import { list } from './api-product';
import Products from './products';

const styles = (theme) => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    paddingTop: 10,
    backgroundColor: '#80808024',
  },
  menu: {
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 130,
    verticalAlign: 'bottom',
    marginBottom: '20px',
  },
  searchField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 300,
    marginBottom: '20px',
  },
  searchButton: {
    minWidth: '20px',
    height: '30px',
    padding: '0 8px',
  },
});

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      search: '',
      results: [],
      searched: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  search = () => {
    if (this.state.search) {
      list({
        search: this.state.search || undefined,
        category: this.state.category,
      }).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({ results: data, searched: true });
        }
      });
    }
  };

  enterKey = (event) => {
    if (event.keyCode == 13) {
      event.preventDefault();
      this.search();
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Card className={classes.card}>
          <TextField
            id="select-category"
            select
            label="Select category"
            className={classes.textField}
            value={this.state.category}
            onChange={this.handleChange('category')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            <MenuItem value="All">All</MenuItem>
            {this.props.categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="search"
            label="Search products"
            type="search"
            onKeyDown={this.enterKey}
            onChange={this.handleChange('search')}
            className={classes.searchField}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.searchButton}
            onClick={this.search}
          >
            <SearchIcon />
          </Button>
          <Divider />
          <Products
            products={this.state.results}
            searched={this.state.searched}
          />
        </Card>
      </>
    );
  }
}

export default withStyles(styles)(Search);
