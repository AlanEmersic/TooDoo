import {
  Button,
  Checkbox,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import PageNotFound from "./PageNotFound";

export default function SharedTodoList() {
  const [todos, setTodos] = useState<any>([]);
  const [isFetching, setIsFetching] = useState(false);
  const { uuid } = useParams();

  useEffect(() => {
    shareTodoList();
  }, []);

  const shareTodoList = async () => {
    setIsFetching(true);

    await api
      .get(`/lists/share/${uuid}`)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log("Share todo list error: ", err.response);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  return isFetching ? (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  ) : todos?.length === 0 ? (
    <PageNotFound />
  ) : (
    <>
      <Container
        sx={{
          justifyContent: "center",
          textAlign: "center",
          margin: "1rem 0",
        }}
      >
        <Typography variant="h4">{todos && todos[0]?.name}</Typography>
      </Container>
      <Container
        sx={{
          my: "2rem",
        }}
      >
        <Grid
          container
          spacing={5}
          mb={15}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          {todos?.[0]?.todoId &&
            todos.map((t: any, index: number) => {
              return (
                <Grid item xs={12} sm={12} md={12} key={index}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "center",
                    }}
                  >
                    <Checkbox checked={!!t.completed} disabled />
                    <Button>{t.text}</Button>
                  </Stack>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
}
