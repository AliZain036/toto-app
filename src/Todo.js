import React from "react";
import "./Todo.css";
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { List, ListItem, ListItemText, Button } from "@material-ui/core";
import db from "./firebase";
import Modal from '@material-ui/core/Modal';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const [input, setInput] = useState();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const updateTodo = () => {
  // Update the todo with the new input
    db.collection('todos').doc(props.todo.id).set({
      text: input
    }, { merge: true });
  setOpen(false);
}
  return (
    <> 
    <Modal
        open={open}
        onClose={(e) => setOpen(false)}
    >
      <div className = {classes.paper}>
        <h1>I am a model</h1>
        <input placeholder = { props.todo.todo } value = { input } onChange = { event => setInput(event.target.value)} />
        <Button onClick = {updateTodo}>Update TODO</Button>
      </div>
    </Modal>
    <List className="todo_list">
      <ListItem>
        <ListItemText primary={props.todo.todo} secondary={<div><p>Some Description here</p><span role="img" aria-label="Panda">🐼</span></div>} />
      </ListItem>
      <Button onClick={(e) => setOpen(true)}>Edit</Button>
      <DeleteForeverIcon
        onClick={(e) => db.collection("todos").doc(props.todo.id).delete()}
      ></DeleteForeverIcon>
    </List>
    </>
  );
}

export default Todo;
