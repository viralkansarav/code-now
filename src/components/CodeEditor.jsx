import React, { useState, useRef } from 'react';
import './css/codeEditor.css';

const CodeEditor = () => {
  const [htmlCode, setHtmlCode] = useState(''); // State to hold the HTML code
  const [cssCode, setCssCode] = useState(''); // State to hold the CSS code
  const [jsCode, setJsCode] = useState(''); // State to hold the JavaScript code
  const [locked, setLocked] = useState(false); // State to track editor lock/unlock
  const [showMessage,setMessage] = useState('none')

  const [output, setOutput] = useState(''); // State to hold the rendered output
  const outputRef = useRef(null);

  const handleCopy = (text) => {
    // Function to copy the provided text to the clipboard
    if(text!==''){
 navigator.clipboard.writeText(text)
      .then(() => {
        alert('Code copied to clipboard');
      })
      .catch(error => {
        console.error('Failed to copy code: ', error);
      });
    }else{
        alert('please enter something to copy')
    }
   
  };

  const handleSave = () => {
    // Function to save the code and update the output
    const fullCode = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>`;
      
    setOutput(fullCode);
setMessage('')
setTimeout(() => {
    setMessage('none')
}, 2000);
    // Scroll to the output iframe to view the changes 
    if (outputRef.current) {
      outputRef.current.scrollIntoView();
    }
  };

  return (
    <div className="code-editor">
      <div className="editor-header">
          <i className="far fa-save" onClick={handleSave}></i> 
        <div onClick={() => setLocked(!locked)} className='lockBtn'>
          {locked ? (
            <i className="fas fa-lock"></i>
          ) : (
            <i className="fas fa-lock-open"></i>
          )}{' '}
         
        </div>
      </div>
      <span style={{color:'white',marginBottom:'5px',display:showMessage}}>Changes saved successfully</span>

      <div className="editor-container">
        <div className="editor-input">
          
          <div className="input-header">
         <div className='htmlDesign'>/</div> <h2>HTML</h2> 
            <button className="copy-button" onClick={handleCopy.bind(null, htmlCode)}>
              <i className="far fa-copy" ></i> 
            </button>
          </div>
          <textarea
            value={htmlCode}
            onChange={(e) => setHtmlCode(e.target.value)}
            readOnly={locked}
          />
        </div>
        <div className="editor-input">
          
          <div className="input-header">
            <div className='cssDesign'> * </div>
          <h2>CSS</h2>
            <button className="copy-button" onClick={handleCopy.bind(null, cssCode)}>
              <i className="far fa-copy"></i> 
            </button>
          </div>
          <textarea
            value={cssCode}
            onChange={(e) => setCssCode(e.target.value)}
            readOnly={locked}
          />
        </div>
        <div className="editor-input">
         
          <div className="input-header">
            <div className='jsDesign'> ( ) </div>
           <h2>JavaScript</h2>
            <button className="copy-button" onClick={handleCopy.bind(null, jsCode)}>
              <i className="far fa-copy"></i> 
            </button>
          </div>
          <textarea
            value={jsCode}
            onChange={(e) => setJsCode(e.target.value)}
            readOnly={locked}
          />
        </div>
      </div>
      <div className="output">

        <iframe
          title="output-iframe"
          ref={outputRef}
          srcDoc={output}
          width="100%"
          height="100%"
        />
      </div>
   
    </div>
  );
};

export default CodeEditor;
