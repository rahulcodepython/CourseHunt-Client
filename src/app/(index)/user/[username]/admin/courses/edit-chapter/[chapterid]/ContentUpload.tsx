"use client"
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Code, Heading, Image, IndentDecrease, IndentIncrease, Italic, Link2, List, ListOrdered, Quote, Sheet, Underline, Video } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type MenubarType = {
    key: string;
    tooltip?: {
        label: string;
        value: string;
        icon: React.ReactNode;
    }[][];
    dropdrown?: {
        label: string;
        value: string;
        icon: React.ReactNode;
        subItem: {
            label: string;
            value: string;
        }[];
    }[][];
    button?: {
        label: string;
        value: string;
        icon: React.ReactNode;
    }[][];
}

const ContentUpload = () => {
    const [editorHtml, setEditorHtml] = React.useState('');

    const menubar: MenubarType[] = [
        {
            key: "tooltip",
            tooltip: [
                [
                    { label: "Bold", value: "bold", icon: <Bold className='w-4 h-4' /> },
                    { label: "Italic", value: "italic", icon: <Italic className='w-4 h-4' /> },
                    { label: "Underline", value: "underline", icon: <Underline className='w-4 h-4' /> },
                ],
                [
                    { label: "Left", value: "align-left", icon: <AlignLeft className='w-4 h-4' /> },
                    { label: "Center", value: "align-center", icon: <AlignCenter className='w-4 h-4' /> },
                    { label: "Right", value: "align-right", icon: <AlignRight className='w-4 h-4' /> },
                    { label: "Justify", value: "align-justify", icon: <AlignJustify className='w-4 h-4' /> },
                ],
            ]
        },
        {
            key: "dropdown",
            dropdrown: [
                [
                    {
                        label: "Ordered List",
                        value: "list-ordered",
                        icon: <ListOrdered className='w-4 h-4' />,
                        subItem: [
                            { label: "1,2,3...", value: "numeric" },
                            { label: "a,b,c...", value: "alphabetic-lower" },
                            { label: "A,B,C...", value: "alphabetic-upper" },
                            { label: "i,ii,iii...", value: "roman-lower" },
                            { label: "I,II,III...", value: "roman-upper" },
                        ]
                    },
                    {
                        label: "Unordered List",
                        value: "list-unordered",
                        icon: <List className='w-4 h-4' />,
                        subItem: [
                            { label: "Circle", value: "circle" },
                            { label: "Disc", value: "disc" },
                            { label: "Square", value: "square" },
                        ]
                    },
                ],
                [
                    {
                        label: "Heading",
                        value: "heading",
                        icon: <Heading className='w-4 h-4' />,
                        subItem: [
                            { label: "Heading 1", value: "h1" },
                            { label: "Heading 2", value: "h2" },
                            { label: "Heading 3", value: "h3" },
                            { label: "Heading 4", value: "h4" },
                            { label: "Heading 5", value: "h5" },
                            { label: "Heading 6", value: "h6" },
                        ]
                    },
                ]
            ]
        },
        {
            key: "button",
            button: [
                [
                    { label: "Indent", value: "indent", icon: <IndentIncrease className='w-4 h-4' /> },
                    { label: "Outdent", value: "outdent", icon: <IndentDecrease className='w-4 h-4' /> },
                    { label: "Quote", value: "quote", icon: <Quote className='w-4 h-4' /> },
                    { label: "Code", value: "code", icon: <Code className='w-4 h-4' /> }
                ],
                [
                    { label: "Link", value: "link", icon: <Link2 className='w-4 h-4' /> },
                    { label: "Image", value: "image", icon: <Image className='w-4 h-4' /> },
                    { label: "Video", value: "video", icon: <Video className='w-4 h-4' /> },
                    { label: "Table", value: "table", icon: <Sheet className='w-4 h-4' /> },
                ]
            ]
        }
    ]

    return <section>
        <Card>
            <CardHeader>
                <div className="flex space-x-2 p-2 border-b border-gray-300">
                    {
                        menubar.map((items, pindex) => {
                            return <div key={pindex} className="flex gap-2">
                                {
                                    items.key === "tooltip" ? <TooltipMenubarIcon value={items.tooltip} /> : items.key === "dropdown" ? <DropDownMenubarIcon value={items.dropdrown} /> : <ButtonMenubarIcon value={items.button} />
                                }
                            </div>
                        })
                    }
                </div>
            </CardHeader>
            <CardContent>
                <Textarea value={editorHtml} onChange={e => {
                    setEditorHtml(e.target.value)
                }} className='p-4 min-h-[154px] h-full'>
                </Textarea>
            </CardContent>
        </Card>
        <Card className='my-4'>
            <CardHeader>Output:</CardHeader>
            <CardContent>
                <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
            </CardContent>
        </Card>
    </section>
};

const TooltipMenubarIcon = ({ value }: {
    value: MenubarType["tooltip"]
}) => {
    return value?.map((items, pindex) => {
        return <div key={pindex} className="flex space-x-2 border-r pr-2">
            {
                items.map((value, index) => {
                    return <div key={index} className="flex">
                        <ToggleGroup type="multiple">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <ToggleGroupItem value={value.value}>{value.icon}</ToggleGroupItem>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>
                                            {value.label}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </ToggleGroup>
                    </div>
                })
            }
        </div>
    })
}

const DropDownMenubarIcon = ({ value }: {
    value: MenubarType["dropdrown"]
}) => {
    return value?.map((items, pindex) => {
        return <div key={pindex} className='flex space-x-2 border-r pr-2'>
            {
                items.map((item, index) => {
                    return <div key={index} className='flex space-x-2'>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted outline-none hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent h-10 px-3'>
                                            {item.icon}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>
                                                {item.label}
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {
                                    item.subItem.map((sub, sindex) => {
                                        return <DropdownMenuItem key={sindex}>{sub.label}</DropdownMenuItem>
                                    })
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                })
            }
        </div>
    })
}

const ButtonMenubarIcon = ({ value }: {
    value: MenubarType["button"]
}) => {
    return value?.map((items, pindex) => {
        return <div key={pindex} className='flex space-x-2 border-r pr-2'>
            {
                items.map((item, index) => {
                    return <div key={index} className='flex space-x-2'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted outline-none hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent h-10 px-3'>
                                    {item.icon}
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        {item.label}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                })
            }
        </div>
    })
}

export default ContentUpload;
