import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

const TextEditor = (props) => {
  const editor = useRef(null);

  const config = {
    zIndex: 1,
    readonly: false,
    enableDragAndDropFileToEditor: true,
    spellcheck: true,
    height: 300,
    tabIndex: -1,
    removeButtons: ['source', 'fullsize', 'about', 'outdent', 'indent', 'video', 'print', 'file', 'cut', 'selectall'],
    uploader: {
      insertImageAsBase64URI: true,
    },
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
  };
  return (
    <JoditEditor
      ref={editor}
      value={props.body}
      config={config}
      onBlur={(newContent) => {
        if (props.sectionIndex === undefined) {
          props.handleBodyChange(newContent.srcElement.innerHTML);
        } else if (props.index === undefined) {
          props.handleBodyChange(newContent.srcElement.innerHTML, props.sectionIndex);
        } else {
          props.handleBodyChange(newContent.srcElement.innerHTML, props.sectionIndex, props.index);
        }
      }} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => { }}
    />
  );
};
export default TextEditor;
