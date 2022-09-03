import { Button, Container, Grid, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TodoList } from "../../models/TodoList.model";


type TodoListsGridProps = {
  lists: TodoList[];
  handleNavigateList: Function;
  handleDeleteList: Function;
};

export default function TodoListsGrid({
  lists,
  handleNavigateList,
  handleDeleteList,
}: TodoListsGridProps) {
  return (
    <Container>
      <Grid container spacing={5} mb={15}>
        {lists &&
          lists.map((list: TodoList) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={list.id}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    border: "#1976D2 solid 2px",
                    justifyContent: "center",
                  }}
                >
                  <Button onClick={() => handleNavigateList(list.id)}>
                    {list.name}
                  </Button>
                  <Button onClick={() => handleDeleteList(list.id)}>
                    <DeleteIcon sx={{ color: "red" }} />
                  </Button>
                </Stack>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
