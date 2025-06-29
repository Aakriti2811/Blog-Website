import {
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  Code,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  SimpleUploadAdapter,
  SpecialCharacters,
  SpecialCharactersEssentials,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
} from "ckeditor5";

export const EDITOR_PLUGINS = [
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  Code,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  SimpleUploadAdapter,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
  SpecialCharacters,
  SpecialCharactersEssentials,
];

export const EDITOR_TOOLBAR = [
  "fontSize",
  "|",
  "alignment:left",
  "alignment:center",
  "alignment:right",
  "|",
  "bold",
  "italic",
  {
    label: "More basic styles",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.333 7C11.8853 7 12.333 7.44773 12.333 8C12.333 8.55227 11.8853 9 11.333 9C10.7807 9 10.333 8.55227 10.333 8C10.333 7.44773 10.7807 7 11.333 7Z" fill="#505152"/><path d="M8 7C8.55227 7 9 7.44773 9 8C9 8.55227 8.55227 9 8 9C7.44773 9 7 8.55227 7 8C7 7.44773 7.44773 7 8 7Z" fill="#505152"/><path d="M4.66699 7C5.21928 7 5.66699 7.44773 5.66699 8C5.66699 8.55227 5.21928 9 4.66699 9C4.11471 9 3.66699 8.55227 3.66699 8C3.66699 7.44773 4.11471 7 4.66699 7Z" fill="#505152"/></svg>`,
    items: [
      "underline",
      "strikethrough",
      "strikethrough",
      "blockQuote",
      "superscript",
      "-",
      "subscript",
      "code",
      "removeFormat",
    ],
  },
  "|",
  "fontColor",
  "fontBackgroundColor",
  "|",
  "bulletedList",
  "numberedList",
  "|",
  "-",
  "insertImage",
  "link",
  "specialCharacters",
  "insertTable",
  "mediaEmbed",
  "myButton",
];

export const TABLE_CONFIG = [
  "tableColumn",
  "tableRow",
  "mergeTableCells",
  "tableProperties",
  "tableCellProperties",
];

export const FONT_SIZE_CONFIG = {
  options: [
    "default",
    10,
    12,
    14,
    16,
    18,
    20,
    22,
    24,
    26,
    28,
    30,
    32,
    34,
    36,
    38,
    40,
    42,
    44,
    46,
    48,
    50,
    52,
    54,
    56,
    58,
    60,
  ],
  supportAllValues: true,
};

export const HTML_SUPPORT_CONFIG = {
  allow: [
    {
      name: /^.*$/,
      styles: true,
      attributes: true,
      classes: true,
    },
  ],
};

export const IMAGE_CONFIG = {
  toolbar: [
    "toggleImageCaption",
    "imageTextAlternative",
    "|",
    "imageStyle:inline",
    "imageStyle:wrapText",
    "imageStyle:breakText",
    "|",
    "resizeImage",
  ],
};

export const LINK_CONFIG = {
  addTargetToExternalLinks: true,
  defaultProtocol: "https://",
  decorators: {
    toggleDownloadable: {
      mode: "manual",
      label: "Downloadable",
      attributes: {
        download: "file",
      },
    },
  },
};

export const LIST_CONFIG = {
  properties: {
    styles: true,
    startIndex: true,
    reversed: true,
  },
};

export const EDITOR_HEADING_CONFIG = {
  options: [
    {
      model: "paragraph",
      title: "Paragraph",
      class: "ck-heading_paragraph",
    },
    {
      model: "heading1",
      view: "h1",
      title: "Heading 1",
      class: "ck-heading_heading1",
    },
    {
      model: "heading2",
      view: "h2",
      title: "Heading 2",
      class: "ck-heading_heading2",
    },
    {
      model: "heading3",
      view: "h3",
      title: "Heading 3",
      class: "ck-heading_heading3",
    },
    {
      model: "heading4",
      view: "h4",
      title: "Heading 4",
      class: "ck-heading_heading4",
    },
    {
      model: "heading5",
      view: "h5",
      title: "Heading 5",
      class: "ck-heading_heading5",
    },
    {
      model: "heading6",
      view: "h6",
      title: "Heading 6",
      class: "ck-heading_heading6",
    },
  ],
};

export const BACKGROUND_COLOR_OPTIONS = [
  { label: "Black", value: "#000000" },
  { label: "Primary Blue", value: "#007BFF" },
  { label: "Secondary Gray", value: "#6C757D" },
  { label: "Success Green", value: "#28A745" },
  { label: "Warning Orange", value: "#FFC107" },
  { label: "Danger Red", value: "#DC3545" },
  { label: "Info Light Blue", value: "#17A2B8" },
  { label: "Dark Gray", value: "#343A40" },
  { label: "Light Gray", value: "#F8F9FA" },
  { label: "Purple", value: "#6F42C1" },
  { label: "Teal", value: "#20C997" },
  { label: "Golden Yellow", value: "#FFD700" },
  { label: "Soft Pink", value: "#FFB6C1" },
];

export const LABEL_COLOR_OPTIONS = [
  { label: "White", value: "#FFFFFF" },
  { label: "Black", value: "#000000" },
  { label: "Dark Gray", value: "#343A40" },
  { label: "Light Gray", value: "#6C757D" },
  { label: "Soft Blue", value: "#5A9BD3" },
  { label: "Dark Green", value: "#155724" },
  { label: "Maroon", value: "#800000" },
  { label: "Navy Blue", value: "#001F3F" },
  { label: "Bright Yellow", value: "#FFFF00" },
  { label: "Deep Red", value: "#8B0000" },
  { label: "Copper", value: "#B87333" },
  { label: "Soft Black", value: "#333333" },
];

export const TAB_OPTIONS = ["Content", "Style", "Advanced"];

export const BUTTONS_TYPE_OPTIONS = [
  {
    name: "Fill",
    value: "fill",
  },
  {
    name: "Outline",
    value: "outline",
  },
  {
    name: "Text",
    value: "text",
  },
];

export const BUTTON_BORDER_RADIUS_OPTIONS = [
  {
    svgName: "border_radius_none",
    value: "0px",
  },
  {
    svgName: "border_radius_medium",
    value: "12px",
  },
  {
    svgName: "border_radius_high",
    value: "20px",
  },
  {
    svgName: "border_radius_very_high",
    value: "28px",
  },
];

export const EDITOR_CONFIG = {
  toolbar: {
    items: EDITOR_TOOLBAR,
    shouldNotGroupWhenFull: false,
  },
  plugins: EDITOR_PLUGINS,
  balloonToolbar: [
    "bold",
    "italic",
    "|",
    "link",
    "insertImage",
    "|",
    "bulletedList",
    "numberedList",
  ],
  fontFamily: {
    supportAllValues: false,
  },
  fontSize: FONT_SIZE_CONFIG,
  heading: EDITOR_HEADING_CONFIG,
  htmlSupport: HTML_SUPPORT_CONFIG,
  image: IMAGE_CONFIG,
  link: LINK_CONFIG,
  list: LIST_CONFIG,
  table: {
    contentToolbar: TABLE_CONFIG,
  },
  mediaEmbed: {
    previewsInData: true,
  },
};

export function getModalPosition({
  builderSelector = "#builder-settings-wrapper",
  editorSelector = ".js-ck-editor-container",
  topClamp = [0.1, 0.6],
} = {}) {
  // Find builder settings wrapper
  const builderSettings = document.querySelector(builderSelector);
  let modalLeft = 0;
  if (builderSettings) {
    const rect = builderSettings.getBoundingClientRect();
    modalLeft = rect.left + rect.width;
  }

  // Find nearest CKEditor container
  const ckEditorNode = document.querySelector(editorSelector);
  let newTop = ckEditorNode ? ckEditorNode.getBoundingClientRect().top : 0;

  // Clamp modal top within specified range
  const screenHeight = window.innerHeight;
  const [minPercent, maxPercent] = topClamp;
  const minTop = minPercent * screenHeight;
  const maxTop = maxPercent * screenHeight;

  let modalTop = newTop;
  if (newTop < minTop) modalTop = minTop;
  if (newTop > maxTop) modalTop = maxTop;

  return { modalLeft, modalTop };
}
