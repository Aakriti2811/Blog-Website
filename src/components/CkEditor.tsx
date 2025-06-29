"use client";

import { useEffect, useRef, useState } from "react";
import "ckeditor5/ckeditor5.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ButtonView,
  ClassicEditor,
  toWidget,
  ContextualBalloon,
  View,
} from "ckeditor5";


import { EDITOR_CONFIG } from "./utils";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: EditorProps) {
  const editorRef = useRef(null);

  const EditorConfig = {
    ...EDITOR_CONFIG,
    initialData: value,
    extraPlugins: [DataUriUploadPlugin],
  };

 
  const handleCkEditorChange = (event: any, editor: ClassicEditor) => {
    const data = editor.getData();
    onChange(data);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      config={EditorConfig}
      onChange={handleCkEditorChange}
    />
  );
}
function DataUriUploadPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) =>
    new DataUriUploadAdapter(loader);
}

class DataUriUploadAdapter {
  loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }

  async upload() {
    const file = await this.loader.file;
    const base64 = await fileToBase64(file);         
    return { default: base64 };                    
  }

  abort() {}                                      }

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}