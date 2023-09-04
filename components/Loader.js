// components/LottieLoader.js
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '/assets/loading-lotti.json'; // Replace with the path to your Lottie animation JSON file

const LottieLoader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (

            <Lottie options={defaultOptions} />
    );
};

export default LottieLoader;
