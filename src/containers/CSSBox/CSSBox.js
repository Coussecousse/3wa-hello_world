import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { css } from "@codemirror/lang-css";

import { useState, useCallback } from 'react';

export default function CSSBox() {
    const [code, setCode] = useState('');

    const handleChange = useCallback(val => {
        setCode(val);
    }, [])
    return (
        <div className="codeMirror-container">
            <div className="typeCode CSS">CSS</div>
            <CodeMirror
                value={code}
                height="200px"
                onChange={handleChange}
                theme={vscodeDark}
                extensions={[css()]}
            />
        </div>
    )
}