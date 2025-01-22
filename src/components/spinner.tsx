import React from 'react';
import { Loader } from 'lucide-react';

const Spinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Loader className="animate-spin w-12 h-12 text-gray-500" />
        </div>
    );
};

export default Spinner;