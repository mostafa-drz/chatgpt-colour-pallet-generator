import React from "react";

export const SearchInput = (props:SearchInputProps) => {
    const {onChange,value} = props
    return (
        <div className="flex items-center justify-center w-full max-w-5xl">
            <input
                className="w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                type="text"
                placeholder="Search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            /> 
        </div>
    );
};

type SearchInputProps = {
    onChange: (value: string) => void;
    value: string;
}
