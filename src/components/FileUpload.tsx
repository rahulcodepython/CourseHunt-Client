"use client"
import { Trash } from "lucide-react";
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image";

type AllowedFileType = "png" | "jpg" | "jpeg" | "mp4" | "pdf";


const FileUpload = ({ allowedFileTypes, setValue, url = null }: {
    setValue: React.Dispatch<React.SetStateAction<File | null>>;
    allowedFileTypes: AllowedFileType[];
    url?: string | null;
}) => {
    const [file, setFile] = React.useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [presetValueUrl, setPresetValueUrl] = React.useState<string | null>(url);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            // Validate file type
            const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
            if (!fileExtension || !allowedFileTypes.includes(fileExtension as AllowedFileType)) {
                alert(`Unsupported file type. Allowed types: ${allowedFileTypes.join(", ")}`);
                return;
            }

            setFile(selectedFile);
            setValue(selectedFile);


            // Generate preview for image/video
            if (selectedFile.type.startsWith("image") || selectedFile.type.startsWith("video")) {
                const url = URL.createObjectURL(selectedFile);
                setPreviewUrl(url);
            } else {
                setPreviewUrl(null);
            }
        }
    };

    return (
        presetValueUrl ? <div className="flex items-center justify-center w-full">
            {
                allowedFileTypes.length === 1 ? allowedFileTypes[0] === "pdf" ? <div className="flex items-center justify-between w-full p-2 border border-gray-300 border-dashed rounded-lg">
                    <span>
                        {`${decodeURIComponent(presetValueUrl.split("%2F")[1].split("?")[0])}`}
                    </span>
                    <div className="bg-gray-200 rounded-full p-2 cursor-pointer text-black">
                        <Trash className="w-4 h-4" onClick={() => {
                            setPresetValueUrl(null)
                        }} />
                    </div>
                </div> : allowedFileTypes[0] === "mp4" ? <div className="relative group">
                    <div className="w-[450px]">
                        <AspectRatio ratio={16 / 9}>
                            <video src={presetValueUrl} controls className="rounded-md object-cover" width={450} height={50} />
                        </AspectRatio>
                    </div>
                    <div className="absolute z-10 w-[450px] inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-gray-200 rounded-full p-2 cursor-pointer text-black">
                            <Trash className="w-4 h-4" onClick={() => {
                                setPresetValueUrl(null)
                            }} />
                        </div>
                    </div>
                </div> : null : <div className="relative group">
                    <div className="w-[450px]">
                        <AspectRatio ratio={16 / 9}>
                            <Image src={presetValueUrl} alt="Image" className="rounded-md object-cover" width={450} height={50} />
                        </AspectRatio>
                    </div>
                    <div className="absolute z-10 w-[450px] inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-gray-200 rounded-full p-2 cursor-pointer text-black">
                            <Trash className="w-4 h-4" onClick={() => {
                                setPresetValueUrl(null)
                            }} />
                        </div>
                    </div>
                </div>
            }
        </div> :
            <div className="flex items-center justify-center w-full">
                {
                    !previewUrl && !file && <div className="flex items-center justify-center w-[500px]">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs">Allowed types: {allowedFileTypes.join(", ")}</p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                }
                {
                    previewUrl && (
                        <div className="relative group">
                            {
                                previewUrl && file?.type.startsWith("image") ? (
                                    <div className="w-[450px]">
                                        <AspectRatio ratio={16 / 9}>
                                            <Image src={previewUrl} alt="Image" className="rounded-md object-cover" width={450} height={50} />
                                        </AspectRatio>
                                    </div>
                                ) : previewUrl && file?.type.startsWith("video") ? (
                                    <div className="w-[450px]">
                                        <AspectRatio ratio={16 / 9}>
                                            <video src={previewUrl} controls className="rounded-md object-cover" />
                                        </AspectRatio>
                                    </div>
                                ) : null
                            }
                            <div className="absolute z-10 w-[450px] inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-gray-200 rounded-full p-2 cursor-pointer text-black">
                                    <Trash className="w-4 h-4" onClick={() => {
                                        setFile(null);
                                        setPreviewUrl(null);
                                        setValue(null);
                                    }} />
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    !previewUrl && file && (
                        <div className="flex items-center justify-between w-full border border-gray-300 border-dashed rounded-lg p-2">
                            <p>{file.name}</p>
                            <button onClick={() => {
                                setFile(null);
                                setPreviewUrl(null);
                                setValue(null);
                            }}>
                                <Trash className="w-4 h-4" />
                            </button>
                        </div>
                    )
                }
            </div>
    );
};

export default FileUpload;