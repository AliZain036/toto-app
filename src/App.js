import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import "./App.css";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  //When the app.js loads, we listen to the database and fetch new todos as they get added/removed;
  useEffect(() => {
    //This code runs.. whenever the app.js loads;
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map((doc) => doc.data().text)); //Returns the flat string of todos or texts;
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().text,
          }))
        );
      });
    // return () => {
    //   cleanup;
    // };
  }, []);
  // const deleteItem = (todo) => {
  //   db.collection("todos").doc(todo.id).delete();
  // };
  const addTodo = (event) => {
    //This will fire off the click event
    //Change the default behaviour of enter button i.e. prevent autorefresh;
    event.preventDefault(); //It'll stop the refresh;
    // if (input !== "") {
    //   //When there is no input just do this or disable the button;
    // setTodos([...todos, input]);
    // }
    db.collection("todos").add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput(""); //Clear up the input after hitting submit!;
  };
  return (
    <div className="App">
      <h1>TODO Application with React JS and Firebase!🔥</h1>
      <form>
        <FormControl>
          <InputLabel>
            <span>✅</span>Write a Todo
          </InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
          disabled={!input} //Do this to disable the button when there is no input;
        >
          Add TODO
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
