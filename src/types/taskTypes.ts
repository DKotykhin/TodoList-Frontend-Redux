export interface IAddTask {
    title: string;
    subtitle?: string;
    description?: string;
    deadline?: string;
    completed: boolean;
}

export interface IUpdateTask extends IAddTask {
    _id: string;
}

export interface ICompleteTask {
    _id: string;
    title: string;
    completed: boolean;
}

export interface ITask extends IUpdateTask {
    createdAt: string;
    updatedAt: string;
}

export interface IQueryData {
    limit: number;
    page: number;
    tabKey: number;
    sortField: string;
    sortOrder: number;
    search: string;
}