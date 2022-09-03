import { Container, Grid } from "@mui/material";
import { Todo } from "../../models/Todo.model";

import TodoItem from "./TodoItem";

type TodosGridProps = {
  todos: Todo[];
  handleTodoCheckbox: Function;
};

export default function TodosGrid({
  todos,
  handleTodoCheckbox,
}: TodosGridProps) {
  return (
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
        {todos &&
          todos.map((todo: Todo) => {
            return (
              <Grid item xs={12} sm={12} md={12} key={todo.id}>
                <TodoItem todo={todo} handleTodoCheckbox={handleTodoCheckbox} />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
