import React, {useState} from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
const Dashboard = () => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState('');

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'text/csv') {
            // Handle the file upload logic here
            setUploadedFileName(file.name);
            console.log('Selected file:', file.name);
        } else {
            alert('Please select a valid CSV file.');
        }
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type === 'text/csv') {
            // Handle the file upload logic here
            setUploadedFileName(file.name);
            console.log('Dropped file:', file.name);
        } else {
            alert('Please drop a valid CSV file.');
        }
    };
    return (
        <>
            <>
                {/* component */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap w-full mb-8">
                            <div className="w-full mb-6 lg:mb-0">
                                <h1 className="sm:text-4xl text-5xl font-medium title-font mb-2 text-gray-900">
                                    Statistic
                                </h1>
                                <div className="h-1 w-20 bg-indigo-500 rounded" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -m-4 text-center">
                            <div className="p-4 sm:w-1/4 w-1/2">
                                <div className="bg-indigo-500 rounded-lg p-2 xl:p-6">
                                    <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                                        2.7K
                                    </h2>
                                    <p className="leading-relaxed text-gray-100 font-bold">Total Uploaded Files</p>
                                </div>
                            </div>
                            <div className="p-4 sm:w-1/4 w-1/2">
                                <div className="bg-indigo-500 rounded-lg p-2 xl:p-6">
                                    <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                                        1.8K
                                    </h2>
                                    <p className="leading-relaxed text-gray-100 font-bold">
                                        Total available Food
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 sm:w-1/4 w-1/2">
                                <div className="bg-indigo-500 rounded-lg p-2 xl:p-6">
                                    <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                                        35K
                                    </h2>
                                    <p className="leading-relaxed text-gray-100 font-bold">Total visited persons </p>
                                </div>
                            </div>
                            <div className="p-4 sm:w-1/4 w-1/2">
                                <div className="bg-indigo-500 rounded-lg p-2 xl:p-6">
                                    <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                                        24K
                                    </h2>
                                    <p className="leading-relaxed text-gray-100 font-bold">Completed Orders</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={"flex justify-center"}>
                    <div
                        className={`w-full md:w-1/2 h-56 flex justify-center flex-col items-center mx-auto bg-white p-6 rounded-lg shadow-md ${
                            isDragOver ? 'border-4 border-blue-400' : ''
                        }`}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <h2 className="text-xl font-semibold mb-4">CSV File Uploader</h2>
                        {uploadedFileName && (
                            <div className="text-green-600 mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 inline-block mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                {uploadedFileName} uploaded successfully
                            </div>
                        )}
                        <form>
                            <div className="mb-4">
                                <input
                                    type="file"
                                    id="csvFile"
                                    name="csvFile"
                                    accept=".csv"
                                    onChange={handleFileUpload}
                                    className="mt-2 hidden"
                                />
                                <label
                                    htmlFor="csvFile"
                                    className={`cursor-pointer ${
                                        isDragOver ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
                                    } py-2 px-4 rounded-lg`}
                                >
                                    {uploadedFileName ? 'Change File' : isDragOver ? 'Drop CSV File Here' : 'Click or Drag a CSV File Here'}
                                </label>
                            </div>
                        </form>
                    </div>
                </section>
            </>

        </>
    );
};

export default Dashboard;