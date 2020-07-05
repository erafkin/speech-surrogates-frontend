import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

const TextEditor = (props) => {
  const editor = useRef(null);

  const config = {
    zIndex: 0,
    readonly: false,
    activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
    toolbarButtonSize: 'middle',
    theme: 'default',
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    spellcheck: true,
    editorCssClass: false,
    triggerChangeEvent: true,
    height: 220,
    direction: 'ltr',
    language: 'en',
    debugLanguage: false,
    i18n: 'en',
    tabIndex: -1,
    toolbar: true,
    enter: 'P',
    useSplitMode: false,
    colorPickerDefaultTab: 'background',
    imageDefaultWidth: 100,
    removeButtons: ['video', 'print', 'about'],
    events: {},
    textIcons: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
    placeholder: '',
    showXPathInStatusbar: false,
  };

  return (
    <JoditEditor
      ref={editor}
      value={props.body}
      config={config}
      onBlur={(newContent) => {
        if (props.sectionIndex === undefined) {
          props.handleBodyChange(newContent);
        } else if (props.index === undefined) {
          props.handleBodyChange(newContent, props.sectionIndex);
        } else {
          props.handleBodyChange(newContent, props.sectionIndex, props.index);
        }
      }} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => { }}
    />
  );
};
export default TextEditor;
