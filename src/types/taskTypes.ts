export interface IAddTask {    
    title: string;
    subtitle?: string;
    description?: string;    
    deadline?: string;    
}

export interface IUpdateTask extends IAddTask {    
    _id: string;
    completed: boolean;  
}

export interface ICompleteTask {    
    _id: string;
    completed: boolean;  
}

export interface ITask extends IUpdateTask {   
    createdAt: string;
}