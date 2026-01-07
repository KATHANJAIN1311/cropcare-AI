import { motion } from "framer-motion";

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isStreaming: boolean;
  error: string | null;
  capturedImage: string | null;
}

const CameraView = ({
  videoRef,
  canvasRef,
  isStreaming,
  error,
  capturedImage,
}: CameraViewProps) => {
  return (
    <div className="flex-1 relative flex items-center justify-center overflow-hidden">
      {/* Video Stream */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover ${
          capturedImage ? "hidden" : ""
        }`}
      />

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Captured Image Preview */}
      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Fallback background when no stream */}
      {!isStreaming && !capturedImage && !error && (
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/90 to-foreground/80 flex items-center justify-center">
          <p className="text-primary-foreground/60 text-sm">Starting camera...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/90 to-foreground/80 flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-destructive text-sm font-medium mb-2">
              {error}
            </p>
            <p className="text-primary-foreground/50 text-xs">
              Try refreshing the page or check your browser permissions
            </p>
          </div>
        </div>
      )}

      {/* Leaf Outline Guide - Only show when streaming or captured */}
      {(isStreaming || capturedImage) && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-72 h-80 pointer-events-none"
        >
          {/* Outer Glow */}
          <div className="absolute inset-0 rounded-[60px] border-2 border-dashed border-primary/50 animate-pulse-ring" />

          {/* Main Outline */}
          <svg
            viewBox="0 0 200 240"
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M100 20 C60 40, 30 80, 30 140 C30 200, 70 220, 100 220 C130 220, 170 200, 170 140 C170 80, 140 40, 100 20"
              className="text-primary stroke-[2.5]"
              strokeDasharray="8 4"
            />
            {/* Center Vein */}
            <path
              d="M100 40 L100 200"
              className="text-primary/60"
              strokeWidth="1.5"
            />
            {/* Side Veins */}
            <path
              d="M100 60 L60 90 M100 90 L50 130 M100 120 L55 160 M100 150 L65 185"
              className="text-primary/40"
              strokeWidth="1"
            />
            <path
              d="M100 60 L140 90 M100 90 L150 130 M100 120 L145 160 M100 150 L135 185"
              className="text-primary/40"
              strokeWidth="1"
            />
          </svg>

          {/* Corner Markers */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl" />
        </motion.div>
      )}

      {/* Instructions */}
      {isStreaming && !capturedImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-32 left-0 right-0 text-center z-10"
        >
          <p className="text-primary-foreground/80 text-sm font-medium drop-shadow-lg">
            Position the leaf within the frame
          </p>
          <p className="text-primary-foreground/60 text-xs mt-1 drop-shadow-lg">
            Ensure good lighting for best results
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CameraView;
