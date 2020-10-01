import React, { useState } from "react";
import * as firebase from "firebase/app";
import { ListItem, TextField, Grid } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { db } from "./firebase";

interface PROPS {
  id: string;
  title: string;
}

const TaskItem: React.FC<PROPS> = (props) => {
  const [title, setTitle] = useState(props.title);

  const editTask = () => {
    db.collection("tasks").doc(props.id).set({ title: title }, { merge: true });
  };

  const deleteTask = () => {
    db.collection("tasks").doc(props.id).delete();
  };

  return (
    <div>
      <ListItem>
        <h2>{props.title}</h2>
        <Grid container justify="flex-end">
          <TextField
            label="Edit Task"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </Grid>
        <button onClick={editTask}>
          <EditOutlinedIcon />
        </button>
        <button onClick={deleteTask}>
          <DeleteOutlineOutlinedIcon />
        </button>
      </ListItem>
    </div>
  );
};

export default TaskItem;
