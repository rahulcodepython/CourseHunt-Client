import React from "react";
import Navbar from "./components/Navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return <main>
        <Navbar />
        {children}
    </main>;
}

export default HomeLayout;