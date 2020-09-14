import { TaskItemProps } from "../components/TaskItem";
import { firebaseData, firebaseTaskData } from "./config"

export function convertToTaskItemFrom(data: firebaseData): firebaseTaskData {
    return {
        title: data.data().title,
        description: data.data().description,
        isDue: data.data().isDue,
        isCompleted: data.data().isCompleted,
        dateString: data.data().dateString,
        isImportant: data.data().isImportant,
        id: data.id,
    }
}