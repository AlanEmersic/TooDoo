import {
  Box,
  Button,
  Fade,
  InputLabel,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { ChangeEvent, FormEventHandler, MouseEvent, useState } from "react";
import { getTodoLists } from "../../api/todoList/getTodoLists";
import { postTodoList } from "../../api/todoList/postTodoList";
import { TodoList } from "../../models/TodoList.model";

const style = {
  position: "absolute",
  width: "550px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#fff",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

type TodoListFormProps = {
  setLists: (lists: TodoList[]) => void;
  handleOpenTodoListForm: FormEventHandler;
  openTodoListForm: boolean;
  setOpenTodoListForm: (openTodoListForm: boolean) => void;
};

export default function TodoListForm({
  setLists,
  handleOpenTodoListForm,
  openTodoListForm,
  setOpenTodoListForm,
}: TodoListFormProps) {
  const [name, setName] = useState("");
  const handleCloseTodoListForm = () => setOpenTodoListForm(false);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    postTodoList(name)
      .then(() => {
        setOpenTodoListForm(false);
        getTodoLists().then(setLists);
      })
      .catch((err) => {
        console.log("Login user error: ", err.response);
      });
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{ my: "2rem" }}
        onClick={handleOpenTodoListForm}
      >
        Add new list
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openTodoListForm}
        onClose={handleCloseTodoListForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openTodoListForm}>
          <Box component="form" sx={style} noValidate autoComplete="off">
            <InputLabel htmlFor="name">Name</InputLabel>
            <TextField
              id="name"
              label="Enter list name"
              variant="outlined"
              onChange={handleNameChange}
            />

            <Stack spacing={2} direction="row">
              <Button variant="outlined" onClick={handleSubmit}>
                Add
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
