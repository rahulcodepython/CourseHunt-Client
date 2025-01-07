"use client"

import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation';

const DashboardBreadcrumbComponent = () => {
    const pathname = usePathname();
    const pathnamelist = pathname.trim().split('/').slice(1);
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {
                    pathnamelist.map((path, index) => {
                        return (
                            <React.Fragment key={index}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink>
                                        {path}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {
                                    !(index === pathnamelist.length - 1) && <BreadcrumbSeparator />
                                }
                            </React.Fragment>
                        )
                    })
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default DashboardBreadcrumbComponent;