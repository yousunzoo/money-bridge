import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import draftjsToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { EditorProps } from "react-draft-wysiwyg";

const Editor = dynamic<EditorProps>(() => import("react-draft-wysiwyg").then(mod => mod.Editor), {
  ssr: false,
});

function ContentEditor({
  initialState,
  setContent,
}: {
  initialState: string;
  setContent: Dispatch<SetStateAction<string>>;
}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const updateTextDescription = (state: EditorState) => {
    setEditorState(state);
    const html = draftjsToHtml(convertToRaw(state.getCurrentContent()));
    setContent(html);
  };

  useEffect(() => {
    const blocksFromHtml = htmlToDraft(initialState);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, []);

  return (
    <Editor
      placeholder="게시글을 작성해주세요"
      editorState={editorState}
      onEditorStateChange={updateTextDescription}
      localization={{ locale: "ko" }}
      editorStyle={{
        height: "400px",
        width: "100%",
        border: "1px solid lightgray",
        borderRadius: "4px",
        padding: "10px 20px",
        marginBottom: "20px",
      }}
    />
  );
}

export default ContentEditor;
