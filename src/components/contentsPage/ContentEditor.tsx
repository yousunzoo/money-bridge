import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import draftjsToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { EditorProps } from "react-draft-wysiwyg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

const Editor = dynamic<EditorProps>(() => import("react-draft-wysiwyg").then(mod => mod.Editor), {
  ssr: false,
});

const API_URL = "http://localhost:8080";
const UPLOAD_ENDPOINT = "upload_files";

function ContentEditor({
  initialState,
  setContent,
}: {
  initialState: string;
  setContent: Dispatch<SetStateAction<string>>;
}) {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        extraPlugins: [uploadPlugin],
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setContent(data);
      }}
    />
  );
}

export default ContentEditor;

function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const body = new FormData();
        loader.file.then(file => {
          body.append("files", file);
          axiosInsta(`${API_URL}/${UPLOAD_ENDPOINT}`, {
            method: "post",
            body: body,
          })
            .then(res => res.json())
            .then(res => {
              resolve({
                default: `${API_URL}/${res.filename}`,
              });
            })
            .catch(err => {
              reject(err);
            });
        });
      });
    },
  };
}

function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = loader => {
    return uploadAdapter(loader);
  };
}
