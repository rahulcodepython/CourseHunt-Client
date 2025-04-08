import React from "react";
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { FilterIcon } from "lucide-react";
import { ListCourseType, PaginationType } from "@/types";
import { getAccessToken, getUser, isAuthenticated } from "@/app/action";
import { serverUrlGenerator } from "@/utils";
import CourseList from "./course-list";

const Courses = async () => {
    const access = await getAccessToken();
    const isAuth = await isAuthenticated()

    const response = await fetch(serverUrlGenerator(`/course/list-course/`), isAuth ? {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${access}`
        }
    } : {})
    const data: PaginationType<ListCourseType> = await response.json()

    return <div className="flex flex-col min-h-[100dvh]">
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
            <CourseList data={data} />
        </section>
    </div>
}

export default Courses;