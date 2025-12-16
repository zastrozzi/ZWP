import { TransformEnumPipeSignature } from '@zwp/platform.common'

export enum FileExplorerFileType {
    pdf = "pdf",
    jpeg = "jpeg",
    jpg = "jpg",
    png = "png",
    gif = "gif",
    svg = "svg",
    txt = "txt",
    doc = "doc",
    docx = "docx",
    xls = "xls",
    xlsx = "xlsx",
    ppt = "ppt",
    pptx = "pptx",
    csv = "csv",
    zip = "zip",
    mp3 = "mp3",
    mp4 = "mp4",
    mov = "mov",
    avi = "avi",
    html = "html",
    css = "css",
    js = "js",
    json = "json",
    xml = "xml"
}

export enum FileExplorerFileTypeLabel {
    pdf = "PDF",
    jpeg = "JPEG",
    jpg = "JPG",
    png = "PNG",
    gif = "GIF",
    svg = "SVG",
    txt = "Text File",
    doc = "Word Document (DOC)",
    docx = "Word Document (DOCX)",
    xls = "Excel Spreadsheet (XLS)",
    xlsx = "Excel Spreadsheet (XLSX)",
    ppt = "PowerPoint Presentation (PPT)",
    pptx = "PowerPoint Presentation (PPTX)",
    csv = "CSV",
    zip = "ZIP Archive",
    mp3 = "MP3 Audio",
    mp4 = "MP4 Video",
    mov = "MOV Video",
    avi = "AVI Video",
    html = "HTML File",
    css = "CSS File",
    js = "JavaScript File",
    json = "JSON File",
    xml = "XML File"
}

export enum FileExplorerFileTypeIcon {
    pdf = "description",
    jpeg = "image",
    jpg = "image",
    png = "image",
    gif = "image",
    svg = "image",
    txt = "description",
    doc = "article",
    docx = "article",
    xls = "table_chart",
    xlsx = "table_chart",
    ppt = "slideshow",
    pptx = "slideshow",
    csv = "table_chart",
    zip = "archive",
    mp3 = "audiotrack",
    mp4 = "movie",
    mov = "movie",
    avi = "movie",
    html = "code",
    css = "code",
    js = "code",
    json = "code",
    xml = "code"
}

export const fileExplorerFileTypeLabelPipeSignature: TransformEnumPipeSignature = {
    input: FileExplorerFileType,
    output: FileExplorerFileTypeLabel
}

export const fileExplorerFileTypeIconPipeSignature: TransformEnumPipeSignature = {
    input: FileExplorerFileType,
    output: FileExplorerFileTypeIcon
}