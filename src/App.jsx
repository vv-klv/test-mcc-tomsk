import { useState } from 'react';
import './App.scss';

import Node from './components/Node/Node';
import Button from './components/UI/Button/Button';
import { tree } from './tree';

function App() {
    // const [data, setData] = useState([]);
    // const randomData = () => {const t = (t, e) => t > e || t < 0 ? 0 : Math.floor(Math.random() * (e - t + 1) + t);const e = () => Math.random().toString(36).slice(-5);const n = [];for (let o = 0; o < t(2, 2); o++) {const o = [];for (let n = 0; n < t(2, 3); n++) {const n = [];for (let o = 0; o < t(2, 2); o++) {const o = [];n.push({title: e(), subTitle: e(), data: o})}o.push({title: e(), items: n})}n.push({title: e(), items: o})}return n};
    // useEffect(() => setData(randomData()), []);
    const [nodes, setNodes] = useState(tree);

    const deleteRootNode = (id) => {
        const filteredNodes = nodes.filter(node => node.id !== id);
        filteredNodes.length === 0
            ? alert('Нельзя удалять последнюю корневую ноду!')
            : setNodes(nodes.filter(node => node.id !== id));
    }

    const resetHandler = () => {
        setNodes(JSON.parse(JSON.stringify(tree)));
    };

    return (
        <div className="App">
            <Button handler={resetHandler}>Reset</Button>
            {
                nodes.map(node =>
                    <Node
                        {...node}
                        key={node.id}
                        pid={node.id}
                        isRootNode={true}
                        deleteRootNode={deleteRootNode}
                    />

                )
            }
        </div>
    );
}

export default App;
