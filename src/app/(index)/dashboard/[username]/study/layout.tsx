import React from "react";

const StudyLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-col">
        {children}
    </div>
}

export default StudyLayout;