import { Button, Container, Grid, Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../utils/api";
import TodoListForm from "./TodoListForm";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [lists, setLists] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [openTodoListForm, setOpenTodoListForm] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    getLists();
  }, []);

  const handleOpenTodoListForm = () => setOpenTodoListForm(true);

  const handleNavigateList = (id: number) => {
    navigate(`/list/${id}`);
  };

  const handleDeleteList = (id: number) => {
    deleteList(id);
  };

  const deleteList = async (id: number) => {
    await api
      .delete(`/lists/${id}`)
      .then((res) => {
        setLists(lists.filter((l: any) => l.id !== id));
      })
      .catch((err) => {
        console.log("Delete list error: ", err.response);
      });
  };

  const getLists = async () => {
    setIsFetching(true);

    await api
      .get("/lists")
      .then((res) => {
        setLists(res.data);
      })
      .catch((err) => {
        console.log("Get lists error: ", err.response);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  return isFetching ? (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  ) : (
    <>
      <Button
        variant="outlined"
        sx={{ my: "2rem" }}
        onClick={handleOpenTodoListForm}
      >
        Add new list
      </Button>
      <TodoListForm
        openTodoListForm={openTodoListForm}
        setOpenTodoListForm={setOpenTodoListForm}
        getLists={getLists}
      />

      <Container>
        <Grid container spacing={5} mb={15}>
          {lists &&
            lists.map((l: any) => {
              return (
                <Grid item xs={12} sm={6} md={3} key={l.id}>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      border: "#1976D2 solid 2px",
                      justifyContent: "center",
                    }}
                  >
                    <Button onClick={() => handleNavigateList(l.id)}>
                      {l.name}
                    </Button>
                    <Button onClick={() => handleDeleteList(l.id)}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </Button>
                  </Stack>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
}
