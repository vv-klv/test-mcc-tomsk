import generateID from '../../utils/generateID';

const addNewNode = (pid) => {
    return {
        "id": generateID(),
        "name": "New Node",
        "pid": pid,
        "children": []
    }
}

export default addNewNode;