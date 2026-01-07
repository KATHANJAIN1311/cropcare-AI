import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileLayout from "@/components/layout/MobileLayout";
import CameraView from "@/components/camera/CameraView";
import CameraControls from "@/components/camera/CameraControls";
import { useCamera } from "@/hooks/useCamera";

const languages = ["English", "हिंदी", "मराठी", "తెలుగు", "தமிழ்"];

const ImageCapture = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showLanguages, setShowLanguages] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    videoRef,
    canvasRef,
    isStreaming,
    error,
    startCamera,
    stopCamera,
    captureImage,
    switchCamera,
    hasMultipleCameras,
  } = useCamera({ facingMode: "environment" });

  // Start camera on mount
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const handleCapture = () => {
    const image = captureImage();
    if (image) {
      setCapturedImage(image);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleConfirm = () => {
    if (capturedImage) {
      // Store the captured image in sessionStorage for the analysis page
      sessionStorage.setItem("capturedImage", capturedImage);
      navigate("/analyzing");
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCapturedImage(result);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <MobileLayout showNav={false}>
      <div className="flex flex-col h-screen bg-foreground/95 safe-area-top">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 relative z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <h1 className="text-lg font-display font-semibold text-primary-foreground">
            Scan Crop
          </h1>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowLanguages(!showLanguages)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Globe className="w-5 h-5" />
          </Button>
        </div>

        {/* Language Selector */}
        {showLanguages && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-16 right-4 z-30 bg-card rounded-xl p-2 shadow-lg"
          >
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setSelectedLanguage(lang);
                  setShowLanguages(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  selectedLanguage === lang
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {lang}
              </button>
            ))}
          </motion.div>
        )}

        {/* Camera View */}
        <CameraView
          videoRef={videoRef}
          canvasRef={canvasRef}
          isStreaming={isStreaming}
          error={error}
          capturedImage={capturedImage}
        />

        {/* Camera Controls */}
        <CameraControls
          onCapture={handleCapture}
          onUpload={handleUpload}
          onSwitchCamera={switchCamera}
          onRetake={handleRetake}
          onConfirm={handleConfirm}
          hasMultipleCameras={hasMultipleCameras}
          isStreaming={isStreaming}
          capturedImage={capturedImage}
        />
      </div>
    </MobileLayout>
  );
};

export default ImageCapture;
