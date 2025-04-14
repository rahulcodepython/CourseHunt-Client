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
import Section from "@/components/section";

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

    return <Section className="py-16">
        <CourseList data={data} />
    </Section>
}

export default Courses;