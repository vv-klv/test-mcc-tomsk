import React, { useEffect, useState, useRef } from 'react';
import { AiFillDelete, AiOutlineClear } from 'react-icons/ai';
import { RiPlayListAddLine } from 'react-icons/ri';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import addNewNode from '../../utils/addNewNode';
import './Node.scss';

const TOP = 'top';
const END = 'end';

const Node = ({ name, children, pid, isRootNode, deleteNode }) => {
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

    const addNode = (order) => {
        switch (order) {
            case 'top':
                setChildrenToRender(prev => [addNewNode(pid), ...prev]);
                break;
            case 'end':
                setChildrenToRender(prev => [...prev, addNewNode(pid)]);
                break;
        }
    }

    const handleRename = () => {
        const newName = prompt('Введите имя для ноды');
        // игнорирование ввода пустой строки и текущего имени
        if (nameToRender !== newName && newName.trim() !== '') {
            setNameToRender(newName)
        } else alert('Введено старое или пустое имя ноды!');
    }

    const clearNode = () => {
        setChildrenToRender([]);
    }

    return (
        <div className={`node ${isRootNode ? 'root-node' : 'child-node'}`}>
            <div className="node__inner">
                <div className="node__title">{nameToRender}</div>
                <span className="node__controls">
                    <RiPlayListAddLine
                        onClick={() => addNode(TOP)}
                        className="reversedY"
                        title='Add node to the top'
                    />
                    <RiPlayListAddLine onClick={() => addNode(END)} title='Add node to the end' />
                    {childrenToRender.length > 0 &&
                        <AiOutlineClear onClick={clearNode} title='Clear node' />}
                    {!isRootNode &&
                        <AiFillDelete onClick={() => deleteNode(pid)} title='Delete node' />}
                    <MdDriveFileRenameOutline onClick={handleRename} title='Rename node' />
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
