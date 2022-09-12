import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import "./Jokes.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function JokesComponent() {
  const [jokes, setJokes] = useState<any[]>([]);
  const [search, setSearch] = useState<String>("");
  const [page, setPage] = useState<number>(1);

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
  }, []);

  const getpage = (id: number) => {
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
  };

  const change = (e: { target: { value: React.SetStateAction<String>; }; }) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getsearch = (search: String) => {
    var config = {
      method: "get",
      url: `https://icanhazdadjoke.com/search?term=${search}`,
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
  };

  const nextpage = () => {
    setPage(page + 1);
    getpage(page);
    console.log(page);
  };

  const prevpage = () => {
    if (page > 1) {
      setPage(page - 1);
      getpage(page);
      console.log(page);
    }
  };

  return (
    <div className="jokes-body" data-testid="jokes-1">
      <h1 className="heading">Dad Joke</h1>
      <div className="search_main_div">
        <Search className="search-main">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            type="text"
            data-testid="inputBar"
            name="seatch"
            value={search}
            onChange={change}
          />
        </Search>
        <Button
          variant="contained"
          data-testid="searchBtn"
          onClick={() => getsearch(search)}
        >
          search
        </Button>
      </div>
      <div
        className="joke-main"
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {jokes.map((joke, index) => (
          <List
            key={index}
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
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
      </div>
      <ul className="ul-btn">
        <Button variant="contained" onClick={() => prevpage()}>
          Prev
        </Button>
        <Button variant="contained" onClick={() => nextpage()}>
          Next
        </Button>
      </ul>
    </div>
  );
}
