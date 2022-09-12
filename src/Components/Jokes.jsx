import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import StarIcon from '@mui/icons-material/Star';
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import './Jokes.css'


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function JokesComponent() {
  const [jokes, setJokes] = useState([]);
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    var config = {
      method: "get",
      url: "https://icanhazdadjoke.com/search",
      headers: {
        Accept: "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setJokes(response.data.results);

      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])


  const getpage = (id) => {
    var config = {
      method: "get",
      url: `https://icanhazdadjoke.com/search?page=${id}`,
      headers: {
        Accept: "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setJokes(response.data.results);
        console.log(jokes);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const change = e => {
    setSearch(e.target.value)
    console.log(search)
  };

  const getsearch = (search) => {
    var config = {
      method: "get",
      url: `https://icanhazdadjoke.com/search?term=${search}`,
      // url: `https://icanhazdadjoke.com/${search}`,
      headers: {
        Accept: "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setJokes(response.data.results);
        console.log(jokes);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const nextpage = () => {
    setPage(page + 1)
    getpage(page)
    console.log(page)
  }

  const prevpage = () => {
    if (page > 1) {
      setPage(page - 1)
      getpage(page)
      console.log(page)
    }
  }

  return (
    <div className="jokes-body" data-testid='jokes-1'>
      <h1 className="heading">Dad Joke</h1>
      <div className="search_main_div">
        {/* <input type="text"
          data-testid='inputBar'
          name="seatch"
          placeholder="search"
          value={search}
          onChange={change}
        /> */}
        <Search className="search-main">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            type="text"
            data-testid='inputBar'
            name="seatch"
            value={search}
            onChange={change}
          />
        </Search>
        <Button variant="contained" data-testid='searchBtn' onClick={() => getsearch(search)}>search</Button>
      </div>
      <div className="joke-main" style={{
        display: 'flex',
        flexDirection: "column",
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        {jokes.map((joke, index) => (
          <List key={index}
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            aria-label="contacts"
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={joke.joke} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        ))}
        {/* {jokes.map((joke, index) => (
            <List key={index} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem data-testid='jokeslist' alignItems="flex-start">
                {joke.joke}
              </ListItem>
              <Divider className="divider" variant="inset" component="li" sx={{ margin: '0 !important' }} />
            </List>
          ))} */}

      </div>
      <ul className="ul-btn">
        <Button variant="contained" onClick={() => prevpage()}>Prev</Button>
        <Button variant="contained" onClick={() => nextpage()}>Next</Button>
      </ul>


    </div >
  );
}
