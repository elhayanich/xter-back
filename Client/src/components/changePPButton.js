import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChangePictureButton = () => {
    // url ou local 



    return (
        <div className="flex justify-center items-center">
            <div className="flex-col bg-white p-1 rounded-lg shadow-lg w-full max-w-md mb-4 items-center p-5">
                <p className="text-xs text-pink-500 font-medium pb-3">Veuillez choisir une nouvelle image.</p>
                <div>
                    <button
                            type="button"
                            // onClick={}
                            className="w-16 bg-gray-400 text-white text-sm hover:bg-gray-600 transition pt-0.5 pb-0.5 rounded-md mr-5"
                        > Local</button>
                    <button
                            type="button"
                            // onClick={}
                            className="w-16 bg-gray-400 text-white text-sm hover:bg-gray-600 transition pt-0.5 pb-0.5 rounded-md"
                        > Url</button>
                </div>
            </div>
        </div>
    );
};

export default ChangePictureButton;