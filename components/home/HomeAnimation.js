import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DotLottiePlayer = dynamic(
    () => import('@dotlottie/react-player').then((mod) => mod.DotLottiePlayer),
    { ssr: false }
);

const HomeAnimation = () => {
    const [loadLottie, setLoadLottie] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            window.requestIdleCallback(() => setLoadLottie(true));
        } else {
            const timer = setTimeout(() => setLoadLottie(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    if (!loadLottie) return null;

    return (
        <DotLottiePlayer
            src="/assets/images/lottie.json"
            autoplay
            loop
        >
        </DotLottiePlayer>
    )
}

export default HomeAnimation