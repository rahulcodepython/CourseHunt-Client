"use client"
import React from "react";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";

const VideoUpload = () => {
    const [files, setFiles] = React.useState<any[]>([]);
    const [editIndex, setEditIndex] = React.useState(null);

    const handleFileChange = (event: any) => {
        const newFiles = Array.from(event.target.files);
        setFiles((prevFiles: any) => [...prevFiles, ...newFiles]);
    };

    const handleDelete = (index: any) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleEdit = (index: any) => {
        setEditIndex(index);
    };

    const handleEditSubmit = (event: any) => {
        event.preventDefault();
        const newFile = event.target.files[0];
        setFiles((prevFiles) => prevFiles.map((file, i) => (i === editIndex ? newFile : file)));
        setEditIndex(null);
    };

    const handleDeleteAll = () => {
        setFiles([]);
    };

    return <section>
        <div className="mb-4">
            <h2 className="text-2xl font-semibold">Video Upload</h2>
        </div>
        {
            files.length === 0 && <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" accept="image/gif, image/jpeg, image/jpg, image/png, video/mp4, application/pdf" multiple type="file" onChange={handleFileChange} className="hidden" />
                </label>
            </div>
        }
        {
            files.length > 0 && <>
                <div className="aspect-video rounded-lg overflow-hidden">
                    {
                        files.map((file, index) => {
                            return <>
                                <video controls className="w-full h-full object-cover" key={index}>
                                    <source src={URL.createObjectURL(file)} type="video/mp4" />
                                </video>
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </>
                        })
                    }
                </div>
                <div className="flex justify-end items-center gap-4">
                    <Label htmlFor="edit-file" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer">
                        Edit
                        <input id="edit-file" type="file" onChange={handleEditSubmit} className="hidden" />
                    </Label>
                    <Button onClick={handleDeleteAll}>Delete</Button>
                </div>
            </>
        }
    </section>
};

export default VideoUpload;
