import React from "react";
import Navbar from "@/app/(index)/(home)/Navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return <main>
        <Navbar />
        {children}
    </main>
}

export default HomeLayout;