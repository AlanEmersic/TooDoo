import AddIcon from "@mui/icons-material/Add";
import { Button, Stack, TextField } from "@mui/material";
import { FormEventHandler } from "react";

type TodoFormProps = {
  handleAddTodo: FormEventHandler;
  handleInputText: FormEventHandler;
  inputText: string | null;
};

export default function TodoForm({
  handleAddTodo,
  handleInputText,
  inputText,
}: TodoFormProps) {
  return (
    <form onSubmit={handleAddTodo}>
      <Stack
        direction="row"
        sx={{ justifyContent: "center", margin: "1rem 0" }}
      >
        <TextField
          id="inputText"
          label="Add a to-do"
          variant="outlined"
          onChange={handleInputText}
        />
        <Button variant="outlined" type="submit" disabled={!inputText}>
          <AddIcon />
        </Button>
      </Stack>
    </form>
  );
}
