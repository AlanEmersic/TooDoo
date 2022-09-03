import { Button, Checkbox, Stack } from "@mui/material";
import { Todo } from "../../models/Todo.model";

type TodoItemProps = {
  todo: Todo;
  handleTodoCheckbox: Function;
};

export default function TodoItem({ todo, handleTodoCheckbox }: TodoItemProps) {
  return (
    <>
      <Stack
        direction="row"
        sx={{
          justifyContent: "center",
        }}
      >
        <Checkbox
          checked={!!todo.completed}
          onClick={(e) => handleTodoCheckbox(e, todo)}
        />
        <Button>{todo.text}</Button>
      </Stack>
    </>
  );
}
