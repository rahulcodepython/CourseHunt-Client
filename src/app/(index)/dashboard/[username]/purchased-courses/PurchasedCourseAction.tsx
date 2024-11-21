"use client"
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "next-view-transitions";
import { useAuthStore } from "@/context/AuthStore";

const PurchasedCourseAction = ({ courseid }: { courseid: string }) => {
    const user = useAuthStore(state => state.user);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href={`/dashboard/${user?.username}/study/${courseid}/`}>
                        Study
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default PurchasedCourseAction;