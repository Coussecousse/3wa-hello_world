import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { html } from "@codemirror/lang-html";

import { useState, useCallback } from 'react';

export default function HTMLBox() {
    const [code, setCode] = useState('');

    const handleChange = useCallback(val => {
        setCode(val);
    }, [])

    return (
        <div className="codeMirror-container">
            <div className="typeCode HTML">HTML</div>
            <CodeMirror
                value={code}
                height="200px"
                onChange={handleChange}
                theme={vscodeDark}
                extensions={[html()]}
            />
        </div>
    )
}