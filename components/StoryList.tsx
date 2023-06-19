import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import StoryItem, { IItem } from "./StoryItem";

export default function StoryList() {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const timeoutLoading = useRef<NodeJS.Timeout | null>(null);
  const { query } = useRouter();
  const [ready, setReady] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [ids, setIds] = useState<number[]>([]);
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const filteredItems = useMemo<IItem[]>(() => {
    // this is where the top stories being filtered
    // this filteredItems state is subscribing the query string state that being pushed from SearchBar component
    let searchParams = query.s as string;
    if (!searchParams) return items.sort((a, b) => b.time - a.time);
    return items
      .filter((item) => {
        if (!isNaN(+searchParams)) return item.id === Number(searchParams);
        return item.title.toLowerCase().includes(searchParams.toLowerCase());
      })
      .sort((a, b) => b.time - a.time);
  }, [items, query.s]);

  useEffect(() => {
    // to prevent nextjs from double rendering component in client side
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    // prepare top stories
    (async () => {
      try {
        let ids = await getTopStories();
        setIds(ids);
        // due to the API limitation that unable to provide text-based search
        // we need to populate fetched top stories so that we can perform text-based search on line 16 - 19.
        // the populating process for all top stories won't affect the user's experience, since we use pagination on rendering the items on line 53.
        for (let id of ids) {
          // perform async loop so that each id doesn't have to wait for other ids to be done populated.
          populateStory(id);
        }
      } catch (err) {
        console.error(err);
        setError((err as any).toString());
      }
    })();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ready]);

  useEffect(() => {
    // will display loading indicator on query string change (on performing search)
    // and if page updated
    if (timeoutLoading.current) clearTimeout(timeoutLoading.current);
    setLoading(true);
    timeoutLoading.current = setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [query.s, page]);

  async function populateStory(id: number) {
    // this is where we populate the fetched top stories so that we can perform text-based search on line 16 - 19
    try {
      let res = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      if (!res.ok) throw res;
      let parsed = await res.json();
      let story = {
        id: parsed.id,
        time: parsed.time,
        by: parsed.by,
        title: parsed.title,
        url: parsed.url,
      };
      setItems((v) => [...v, story as IItem]);
    } catch (err) {
      console.log(err);
      setError((err as any).toString());
    }
  }

  function handleScroll() {
    // pagination handler
    // will render every 10 stories on scrolling to bottom with debounce 1000ms
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (isBottom) setPage((v) => v + 1);
    }, 1000);
  }

  return (
    <>
      <Container maxWidth="md" sx={{ mb: 5 }}>
        {filteredItems.slice(0, page * 10 + 10).map((item, i) => (
          <StoryItem key={i} {...item} />
        ))}
        {loading && (
          <Box
            sx={{
              my: 2,
              textAlign: "center",
              width: "100%",
              position: "fixed",
              bottom: 0,
              left: 0,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Container>
      <Snackbar
        open={items.length !== ids.length}
        message={`${items.length} / ${ids.length} stories populated`}
      />

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={() => {
          setError("");
        }}
      >
        <Alert
          onClose={() => {
            setError("");
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

async function getTopStories(): Promise<number[]> {
  // this service will fetch all top stories ids
  let res = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  if (!res.ok) throw res;
  let ids = (await res.json()) as number[];
  return ids;
}
