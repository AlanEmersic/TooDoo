import { Button, Stack, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import { FormEventHandler } from "react";

type TodoListEditFormProps = {
  handleEditListSubmit: FormEventHandler;
  handleInputTextEdit: FormEventHandler;
  inputTextEdit: string | null;
  setEdit: (edit: boolean) => void;
};

export default function TodoListEditForm({
  handleEditListSubmit,
  handleInputTextEdit,
  inputTextEdit,
  setEdit,
}: TodoListEditFormProps) {
  return (
    <form onSubmit={handleEditListSubmit}>
      <Stack
        direction="row"
        sx={{ justifyContent: "center", margin: "1rem 0" }}
      >
        <TextField
          id="inputTextEdit"
          label="Edit list"
          variant="outlined"
          onChange={handleInputTextEdit}
        />
        <Button variant="outlined" type="submit" disabled={!inputTextEdit}>
          <CheckIcon />
        </Button>
        <Button variant="outlined" onClick={() => setEdit(false)}>
          <CancelIcon />
        </Button>
      </Stack>
    </form>
  );
}
