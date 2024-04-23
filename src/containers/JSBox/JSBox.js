import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";

import { useState, useCallback } from 'react';

export default function JSBox({ handleChangeCode }) {
    const [code, setCode] = useState('');

    const handleChange = useCallback(val => {
        setCode(val);
        handleChangeCode(val, 'js');
    })

    return (
        <div className="codeMirror-container">
            <div className="typeCode Javascript">JS</div>
            <CodeMirror
                value={code}
                height="200px"
                onChange={handleChange}
                theme={vscodeDark}
                extensions={[javascript()]}
            />
        </div>
    )
}