"use client"
import React from "react";
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { FilterIcon } from "@/utils/icons";
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const Courses = () => {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <section className="container w-full pt-12 md:pt-24 lg:pt-32 px-4 md:px-6 flex items-center gap-4 bg-background p-4 rounded-lg shadow-lg">
                <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search products..."
                        className="px-4 py-2 rounded-md w-full bg-muted focus:outline-none"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <FilterIcon className="w-4 h-4" />
                                <span>Filter</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 p-2">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem className="flex items-center gap-2">
                                <Checkbox />
                                <span>In Stock</span>
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem className="flex items-center gap-2">
                                <Checkbox />
                                <span>On Sale</span>
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Price Range</DropdownMenuLabel>
                            <Slider defaultValue={[0]} min={0} max={100} step={1} className="w-full pt-2 pb-3" />
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Select>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </section>
            <section className="container w-full py-6 md:py-12 lg:py-16 px-4 md:px-6 flex flex-col items-center justify-center">
                <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4 w-full">
                    {
                        Array.from({ length: 6 }).map((_, i) => {
                            return <div className="flex items-center justify-center w-full" key={i}>
                                <Card className="w-full max-w-md">
                                    <Image width={200} height={200} src="/placeholder.svg" alt="Course thumbnail" className="rounded-t-lg object-cover w-full aspect-[2/1]" />
                                    <CardContent className="p-6 grid gap-6">
                                        <div className="space-y-2">
                                            <Link href={`/course/${i}`} className="text-xl font-semibold hover:underline">
                                                Introduction to Web Development
                                            </Link>
                                            <p className="text-muted-foreground">
                                                Learn the fundamentals of web development, including HTML, CSS, and JavaScript.
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">Price:</p>
                                                <p className="line-through text-xs">$99</p>
                                                <p>$59</p>
                                                <Badge className="text-[9px] py-0.1 px-1.5">20% off</Badge>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">Published:</p>
                                                <p>June 1, 2023</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">Duration:</p>
                                                <p>12 hours</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">Chapters:</p>
                                                <p>24</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Avatar>
                                                    <AvatarImage src="/placeholder-user.jpg" />
                                                    <AvatarFallback>JD</AvatarFallback>
                                                </Avatar>
                                                <div className="text-sm">
                                                    <p className="font-medium">John Doe</p>
                                                    <p className="text-muted-foreground">Instructor</p>
                                                </div>
                                            </div>
                                            <Button className="w-full max-w-[150px]">Enroll</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        })
                    }
                </div>
            </section>
        </div>
    );
}

export default Courses;