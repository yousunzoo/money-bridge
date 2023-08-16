import { Dispatch, SetStateAction } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addPhoto } from "@/app/apis/services/etc";

function ContentEditor({
  initialState,
  setContent,
}: {
  initialState: string;
  setContent: Dispatch<SetStateAction<string>>;
}) {
  type CustomUploadAdapter = {
    upload: () => Promise<{ default: string }>;
  };

  const customUploadAdapter = (loader: any): CustomUploadAdapter => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then((file: any) => {
            formData.append("photo", file);

            addPhoto(formData)
              .then((res: any) => {
                resolve({
                  default: res.path,
                });
              })
              .catch((err: any) => reject(err));
          });
        });
      },
    };
  };

  type UploadPlugin = (editor: any) => void;

  const uploadPlugin: UploadPlugin = editor => {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
      return customUploadAdapter(loader);
    };
  };

  return (
    <div className="mb-10">
      <CKEditor
        editor={ClassicEditor}
        config={{
          initialData: initialState,
          language: "ko",
          extraPlugins: [uploadPlugin],
          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "fontSize",
              "bold",
              "italic",
              "|",
              "link",
              "uploadImage",
              "blockQuote",
              "codeBlock",
              "|",
              "bulletedList",
              "numberedList",
            ],
            shouldNotGroupWhenFull: false,
          },
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />
    </div>
  );
}

export default ContentEditor;
