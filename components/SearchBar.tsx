import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Theme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const { push, query } = useRouter();
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    // this effect only to update input value in case the input value and query string doesn't match
    // eg: on browser load, or on navigating browser history, the input value will reflect to the current query string value.
    let searchParams = query.s as string;
    setSearch((v) => {
      if (searchParams && v !== searchParams) return searchParams;
      return v;
    });
  }, [query.s]);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    // due to the API limitation that unable to provide text-based search
    // instead of debouncing for fetching the API anytime we type, we simply debouncing on push query string to browser history
    // and directly filter the top story inside StoryList component using the query string provided.
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      push({
        query: { ...query, s: e.target.value },
      });
    }, 3000);
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Container maxWidth="md">
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              value={search}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Container>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          minHeight: (theme: Theme) => theme.mixins.toolbar.minHeight,
          mb: 3,
        }}
      />
    </>
  );
}
