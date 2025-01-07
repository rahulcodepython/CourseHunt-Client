import Navbar from "@/components/navbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return <main>
        <Navbar />
        {children}
    </main>
}

export default HomeLayout;