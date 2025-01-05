import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera as CameraIcon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface CameraProps {
  onCapture: (image: string) => void;
  isProcessing: boolean;
}

export const Camera: React.FC<CameraProps> = ({ onCapture, isProcessing }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [onCapture]);

  if (!isCameraActive) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg 
                   flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
        onClick={() => setIsCameraActive(true)}
      >
        <CameraIcon className="w-5 h-5" />
        Start Camera
      </motion.button>
    );
  }

  return (
    <div className="relative">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-lg shadow-xl"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isProcessing}
        onClick={capture}
        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 
                    bg-gradient-to-r from-purple-600 to-indigo-600 text-white 
                    px-6 py-3 rounded-full flex items-center gap-2 shadow-lg
                    ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}`}
      >
        {isProcessing ? (
          <>
            <Sparkles className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CameraIcon className="w-5 h-5" />
            Capture Problem
          </>
        )}
      </motion.button>
    </div>
  );
};