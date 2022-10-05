import { useState } from 'react';
import './App.scss';

import Node from './components/Node/Node';
import Button from './components/UI/Button/Button';
import { tree } from './tree';

function App() {
    const [nodes, setNodes] = useState(tree);

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
                    />

                )
            }
        </div>
    );
}

export default App;
