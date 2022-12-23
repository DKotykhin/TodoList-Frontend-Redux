import { ITask } from "types/taskTypes";

const SortAction = (taskdata: ITask[], data: string, sort: string) => {
    let newData: ITask[] = [];

    const createdA = [...taskdata].sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : -1
    );
    const deadlineA = [...taskdata].sort((a, b) =>
        (a.deadline ? a.deadline : "") < (b.deadline ? b.deadline : "") ? 1 : -1
    );
    const titleA = [...taskdata].sort((a, b) => (a.title > b.title ? 1 : -1));

    const createdZ = [...taskdata].sort((a, b) =>
        a.createdAt > b.createdAt ? 1 : -1
    );
    const deadlineZ = [...taskdata].sort((a, b) =>
        (a.deadline ? a.deadline : "") > (b.deadline ? b.deadline : "") ? 1 : -1
    );
    const titleZ = [...taskdata].sort((a, b) => (a.title < b.title ? 1 : -1));

    if (sort === "Z-a") {
        switch (data) {
            case "created":
                newData = createdZ;
                break;
            case "deadline":
                newData = deadlineZ;
                break;
            case "title":
                newData = titleZ;
                break;
            default:
                newData = createdZ;
        }
    } else {
        switch (data) {
            case "created":
                newData = createdA;
                break;
            case "deadline":
                newData = deadlineA;
                break;
            case "title":
                newData = titleA;
                break;
            default:
                newData = createdA;
        }
    }
    return newData;
};

export default SortAction;
