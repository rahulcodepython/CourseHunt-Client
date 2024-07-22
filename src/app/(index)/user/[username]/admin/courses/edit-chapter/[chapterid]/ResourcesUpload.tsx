import { Button } from "@/components/ui/button"
import { CloudUploadIcon, XIcon } from "lucide-react"

const ResourcesUpload = () => {
    return (
        <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 w-full py-12 md:py-16 lg:py-20">
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <h2 className="text-2xl font-semibold">Notes Upload</h2>
                </div>
                <div className="grid gap-4 border-2 border-dashed border-muted rounded-lg p-6 sm:p-8">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <CloudUploadIcon className="w-10 h-10 text-muted-foreground" />
                        <p className="font-medium">Drag and drop files here</p>
                        <p className="text-sm text-muted-foreground">
                            or <span className="underline">click to select files</span>
                        </p>
                    </div>
                    <input type="file" className="hidden" />
                </div>
                <div className="grid gap-4">
                    <h3 className="text-lg font-semibold">Uploaded File</h3>
                    <div className="grid gap-4 w-full">
                        <div className="bg-muted rounded-lg p-4 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <div className="font-medium">document.pdf</div>
                                <Button variant="ghost" size="icon" className="w-6 h-6 hover:bg-muted-foreground/10">
                                    <XIcon className="w-4 h-4" />
                                    <span className="sr-only">Remove</span>
                                </Button>
                            </div>
                            <div className="text-sm text-muted-foreground">PDF, 3.4 MB</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <h2 className="text-2xl font-semibold">Slides Upload</h2>
                </div>
                <div className="grid gap-4 border-2 border-dashed border-muted rounded-lg p-6 sm:p-8">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <CloudUploadIcon className="w-10 h-10 text-muted-foreground" />
                        <p className="font-medium">Drag and drop files here</p>
                        <p className="text-sm text-muted-foreground">
                            or <span className="underline">click to select files</span>
                        </p>
                    </div>
                    <input type="file" className="hidden" />
                </div>
                <div className="grid gap-4">
                    <h3 className="text-lg font-semibold">Uploaded File</h3>
                    <div className="grid w-full gap-4">
                        <div className="bg-muted rounded-lg p-4 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <div className="font-medium">image.jpg</div>
                                <Button variant="ghost" size="icon" className="w-6 h-6 hover:bg-muted-foreground/10">
                                    <XIcon className="w-4 h-4" />
                                    <span className="sr-only">Remove</span>
                                </Button>
                            </div>
                            <div className="text-sm text-muted-foreground">Image, 1.2 MB</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <h2 className="text-2xl font-semibold">Code Upload</h2>
                </div>
                <div className="grid gap-4 border-2 border-dashed border-muted rounded-lg p-6 sm:p-8">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <CloudUploadIcon className="w-10 h-10 text-muted-foreground" />
                        <p className="font-medium">Drag and drop files here</p>
                        <p className="text-sm text-muted-foreground">
                            or <span className="underline">click to select files</span>
                        </p>
                    </div>
                    <input type="file" className="hidden" />
                </div>
                <div className="grid gap-4">
                    <h3 className="text-lg font-semibold">Uploaded File</h3>
                    <div className="grid w-full gap-4">
                        <div className="bg-muted rounded-lg p-4 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <div className="font-medium">image.jpg</div>
                                <Button variant="ghost" size="icon" className="w-6 h-6 hover:bg-muted-foreground/10">
                                    <XIcon className="w-4 h-4" />
                                    <span className="sr-only">Remove</span>
                                </Button>
                            </div>
                            <div className="text-sm text-muted-foreground">Image, 1.2 MB</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResourcesUpload