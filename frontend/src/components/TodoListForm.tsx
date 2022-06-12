import { useState } from "react";
import {
  Box,
  Modal,
  Fade,
  Stack,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import api from "../utils/api";

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

export default function TodoListForm({
  openTodoListForm,
  setOpenTodoListForm,
  getLists,
}: any) {
  const [name, setName] = useState(null);
  const handleCloseTodoListForm = () => setOpenTodoListForm(false);

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const postList = async () => {
      await api
        .post("/lists", { name })
        .then((res: any) => {
          setOpenTodoListForm(false);
          getLists();
        })
        .catch((err) => {
          console.log("Login user error: ", err.response);
        });
    };

    postList();
  };

  return (
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
  );
}
