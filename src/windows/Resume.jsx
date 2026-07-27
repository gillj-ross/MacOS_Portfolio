import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js"
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from 'react-pdf';
import resumeFile from "../assets/resume.pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs', 
    import.meta.url,
).toString();

const Resume = () => {
    return (
    <>
        <div id="window-header">
            <WindowControls target="resume" />
            <h2>Resume.pdf</h2>

            <a href={resumeFile} download="Jude-Gill-Resume.pdf" className="cursor-pointer" title="Download resume">
                <Download className="icon"/>
            </a>
        </div>

        <Document file={resumeFile}>
            <Page 
            pageNumber={1} 
            renderTextLayer 
            renderAnnotationLayer />
        </Document>
    </>
    );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;