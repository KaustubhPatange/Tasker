import { taskSortTypes } from "../provider/reducer";
import { firebaseData, firebaseTaskData } from "./firebaseConfig"

export function convertToTaskItemFrom(data: firebaseData): firebaseTaskData {
    return {
        title: data.data().title,
        description: data.data().description,
        isDue: data.data().isDue,
        isCompleted: data.data().isCompleted,
        created: data.data().created,
        dateString: data.data().dateString,
        isImportant: data.data().isImportant,
        id: data.id,
    }
}
export function applyStripFilter(data: firebaseData[], type: string): firebaseData[] {
    switch (type) {
        case taskSortTypes.COMPLETED:
            return data.filter(e => e.data().isCompleted);
        case taskSortTypes.IMPORTANT:
            return data.filter(e => e.data().isImportant);
        case taskSortTypes.DUE_DATE:
            return data.filter(e => e.data().isDue);
        default:
            return data;
    }
}

export function applyDocFilter(data: firebaseData[], type: string): firebaseData[] {
    switch (type) {
        case taskSortTypes.ALPHABETICALLY:
            return data?.sort((a, b) => {
                return a.data().title.localeCompare(b.data().title)
            });
        case taskSortTypes.COMPLETED:
            return data?.sort((a, b) => {
                if (a.data().isCompleted > b.data().isCompleted) return -1
                if (a.data().isCompleted < b.data().isCompleted) return 1
                return 0
            });
        case taskSortTypes.DUE_DATE:
            return data?.sort((a, b) => {
                if (a.data().isDue > b.data().isDue) return -1
                if (a.data().isDue < b.data().isDue) return 1
                return 0
            });
        case taskSortTypes.IMPORTANT:
            return data?.sort((a, b) => {
                if (a.data().isImportant > b.data().isImportant) return -1
                if (a.data().isImportant < b.data().isImportant) return 1
                return 0
            });
        case taskSortTypes.CREATION_DATE:
            return data?.sort((a, b) => {
                const firstDate = new Date(a.data().created);
                const secondDate = new Date(b.data().created);

                return secondDate.getTime() - firstDate.getTime();
            });
        default:
            return data;
    }
}