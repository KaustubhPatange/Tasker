import React from "react";
import { convertToTaskItemFrom } from "../utils/common";
import { firebaseData } from "../utils/firebaseConfig";
import TaskItem from "./TaskItem";

function RenderTask(props: RenderProps) {
  const filter = props.searchFilter.toLocaleLowerCase();

  const title = props.data.data().title.toLocaleLowerCase();
  const description = props.data.data().description.toLocaleLowerCase();

  if (
    filter != "" &&
    !(title.includes(filter) || description.includes(filter))
  ) {
    return <div key={props.data.id}></div>;
  } else {
    return (
      <TaskItem
        key={props.data.id}
        taskData={convertToTaskItemFrom(props.data)}
        onEditItemClick={() => props.onEditClick(props.data)}
      />
    );
  }
}

export interface RenderProps {
  searchFilter: string;
  data: firebaseData;
  onEditClick: (e: firebaseData) => void;
}

export default RenderTask;
