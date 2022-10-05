import React, { useEffect, useState, useRef } from 'react';
import { AiFillDelete, AiOutlineClear } from 'react-icons/ai';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { BsFolderPlus } from 'react-icons/bs';
import addNewNode from '../../utils/addNewNode';
import './Node.scss';


const Node = ({ name, children, pid, isRootNode, deleteRootNode, deleteNode }) => {
    const [childrenToRender, setChildrenToRender] = useState(children);
    const [nameToRender, setNameToRender] = useState(name);

    const ref = useRef(false);
    useEffect(() => {
        // устранение перерендера
        if (ref.current) {
            setChildrenToRender(children);
            setNameToRender(name);
        } else ref.current = true;
    }, [children]);

    const deleteChildren = (id) => {
        const filteredChildren = childrenToRender.filter(node => node.id !== id);
        setChildrenToRender(filteredChildren);
    }

    const addNode = () => {
        setChildrenToRender(prev => [...prev, addNewNode(pid)]);
    }

    //? подумать, можно ли удалять rootNode
    const handleDelete = (id) => {
        isRootNode
            ? deleteRootNode(id)
            : deleteNode(id);
    }

    const handleRename = () => {
        const newName = prompt('Введите имя для ноды');
        // недопущение ввода пустой строки
        newName.trim() === ''
            ? setNameToRender(prev => prev)
            : setNameToRender(newName);
    }

    const clearNode = () => {
        setChildrenToRender([]);
    }

    return (
        <div className={`node ${isRootNode ? 'root-node' : 'child-node'}`}>
            <div className="node__inner">
                <div className="node__title">{nameToRender}</div>
                <span className="node__controls">
                    <BsFolderPlus onClick={addNode} title='Add Node'/>
                    {childrenToRender.length > 0 &&
                        <AiOutlineClear onClick={clearNode} title='Clear Node' />}
                    <AiFillDelete onClick={() => handleDelete(pid)} title='Delete Node' />
                    <MdDriveFileRenameOutline onClick={handleRename} title='Rename Node' />
                </span>
            </div>
            {
                childrenToRender && childrenToRender.map(node =>
                    <Node
                        {...node}
                        key={node.id}
                        pid={node.id}
                        isRootNode={false}
                        deleteNode={() => deleteChildren(node.id)}
                    />
                )
            }

        </div>
    );
};

export default Node;
