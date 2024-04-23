export default function OutputBox({ code }) {
    
    return (
        <iframe id="output-frame"
            height="100%"
            width="100%"
            srcDoc={code}>
        </iframe>
    )
}