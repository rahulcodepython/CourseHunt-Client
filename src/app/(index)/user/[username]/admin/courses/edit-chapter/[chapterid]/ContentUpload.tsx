"use client"
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ContentUpload = () => {
    const [editorHtml, setEditorHtml] = React.useState('');

    const handleChange = (html: any) => {
        setEditorHtml(html);
    };

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['code'],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];

    return <section>
        <ReactQuill
            value={editorHtml}
            onChange={handleChange}
            modules={modules}
            formats={formats}
        />
        <Card className='my-4'>
            <CardHeader>Output:</CardHeader>
            <CardContent>
                <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
            </CardContent>
        </Card>
    </section>
};

export default ContentUpload;
