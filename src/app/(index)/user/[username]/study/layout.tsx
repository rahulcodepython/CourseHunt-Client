import React from "react";

const StudyLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto">
            {children}
        </div>
    </div>
}

export default StudyLayout;