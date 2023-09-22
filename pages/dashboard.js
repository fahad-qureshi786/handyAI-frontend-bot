import React, {useEffect, useState} from 'react';
import { Button } from "@material-tailwind/react";
import { useRouter } from 'next/router'
import axios from "axios";
import { List, ListItem, Card } from "@material-tailwind/react";
import {APIs} from "../const/APIs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [csvFiles, setCsvFiles] = useState([]);
    const router = useRouter();

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);

        const validCSVFiles = files.filter((file) => file.type === 'text/csv');

        if (validCSVFiles.length > 0) {
            const formData = new FormData();

            validCSVFiles.forEach((file) => {
                formData.append('file', file); // Append each file to the FormData object
            });

            try {
                const response = await axios.post(APIs.UPLOAD_CSV, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                    },
                });

                // Handle the response as needed
                fetchData();
                toast.success('Upload Successfully', {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            } catch (error) {
                toast.error('Something went wrong', {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
        } else {
            toast.warning('Please select one or more valid CSV files.', {
                position: toast.POSITION.TOP_RIGHT
            });
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

        const files = Array.from(e.dataTransfer.files);

        const validCSVFiles = files.filter((file) => file.type === 'text/csv');

        if (validCSVFiles.length > 0) {
            // Handle the file upload logic here
            const fileNames = validCSVFiles.map((file) => file.name);
            setUploadedFiles([...uploadedFiles, ...fileNames]);
            console.log('Dropped files:', fileNames);
        } else {
            alert('Please drop one or more valid CSV files.');
        }
    };
    function handleClick(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        router.push("/");
    }
    const fetchData = async () => {
        axios.get(APIs.GET_ALL_CSV).then(response =>{
            setCsvFiles(response.data.csv_files);
        })
    }
   useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <>
                {/* component */}
                <section className="text-gray-600 body-font">
                    <div className="fixed top-2 right-2 z-10">
                        <Button className="flex items-center text-black mt-2 me-2 bg-amber-400 gap-3" onClick={handleClick}>
                            Back to Chat
                            <svg
                                className={"w-6 h-6"}
                                version="1.1"
                                id="icons_1_"
                                xmlns="http://www.w3.org/2000/svg"
                                x={0}
                                y={0}
                                viewBox="0 0 128 128"
                                style={{ enableBackground: "new 0 0 128 128" }}
                                xmlSpace="preserve"
                            >
                                <style
                                    dangerouslySetInnerHTML={{
                                        __html: ".st0{display:none}.st1{display:inline}.st2{fill:#0a0a0a}"
                                    }}
                                />
                                <g id="row1_1_">
                                    <g id="_x31__3_">
                                        <path
                                            className="st2"
                                            d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 121.6C32.2 121.6 6.4 95.8 6.4 64S32.2 6.4 64 6.4s57.6 25.8 57.6 57.6-25.8 57.6-57.6 57.6zM49.2 38.4 73.6 64 49.2 89.6h13.5L86.4 64 62.7 38.4H49.2z"
                                            id="_x32__2_"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </Button>
                    </div>
                </section>
                <ToastContainer />
                <section className="flex mt-28 justify-center">
                    <div
                        style={{"box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}
                        className={`w-full md:w-1/2 h-56 flex justify-center flex-col items-center mx-auto bg-white p-6 rounded-lg shadow-md ${
                            isDragOver ? 'border-4 border-blue-400' : ''
                        }`}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <h2 className="text-xl font-semibold mb-4">CSV File Uploader</h2>
                        {uploadedFiles.length > 0 && (
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
                                {uploadedFiles.length === 1
                                    ? `${uploadedFiles[0]} uploaded successfully`
                                    : `${uploadedFiles.length} files uploaded successfully`}
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
                                    multiple // Allow multiple file selection
                                />
                                <label
                                    htmlFor="csvFile"
                                    className={`cursor-pointer ${
                                        isDragOver ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
                                    } py-2 px-4 rounded-lg`}
                                >
                                    {uploadedFiles.length > 0
                                        ? 'Add More Files'
                                        : isDragOver
                                            ? 'Drop CSV Files Here'
                                            : 'Click or Drag CSV Files Here'}
                                </label>
                            </div>
                        </form>
                    </div>
                </section>
            </>
            <h3 className={"w-full text-center text-3xl  mt-10"}>Uploaded Files</h3>
            <div className={"w-full mt-4 justify-center flex "}>
                <Card className={"md:w-8/12 w-full py-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-5 border-gray-600"}>
                {
                    csvFiles.map((itm, index)=>{
                        return(
                            <>
                                <Card key={index} className=" w-full flex justify-between">
                                    <List>
                                        <a href={itm.url} className="text-initial">
                                            <ListItem>{itm.filename}</ListItem>
                                        </a>
                                    </List>
                                </Card>
                            </>
                        )
                    })
                }
                </Card>
            </div>
        </>
    );
};

export default Dashboard;
