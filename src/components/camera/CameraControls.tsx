import { motion } from "framer-motion";
import { Camera, Upload, RotateCcw, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CameraControlsProps {
  onCapture: () => void;
  onUpload: () => void;
  onSwitchCamera: () => void;
  onRetake: () => void;
  onConfirm: () => void;
  hasMultipleCameras: boolean;
  isStreaming: boolean;
  capturedImage: string | null;
}

const CameraControls = ({
  onCapture,
  onUpload,
  onSwitchCamera,
  onRetake,
  onConfirm,
  hasMultipleCameras,
  isStreaming,
  capturedImage,
}: CameraControlsProps) => {
  // Show confirm/retake controls when image is captured
  if (capturedImage) {
    return (
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-card rounded-t-3xl pt-6 pb-8 px-6 safe-area-bottom"
      >
        <div className="flex items-center justify-around">
          {/* Retake Button */}
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={onRetake}
            className="text-muted-foreground"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Confirm Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onConfirm}
            className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-glow"
          >
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Check className="w-8 h-8 text-primary-foreground" />
            </div>
          </motion.button>

          {/* Empty placeholder for alignment */}
          <div className="w-12 h-12" />
        </div>

        {/* Action Labels */}
        <div className="flex items-center justify-around mt-3">
          <span className="text-xs text-muted-foreground">Retake</span>
          <span className="text-xs text-foreground font-medium">Confirm</span>
          <span className="text-xs text-transparent">-</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20 }}
      className="bg-card rounded-t-3xl pt-6 pb-8 px-6 safe-area-bottom"
    >
      <div className="flex items-center justify-around">
        {/* Switch Camera / Upload */}
        {hasMultipleCameras ? (
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={onSwitchCamera}
            className="text-muted-foreground"
            disabled={!isStreaming}
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={onUpload}
            className="text-muted-foreground"
          >
            <Upload className="w-6 h-6" />
          </Button>
        )}

        {/* Capture Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onCapture}
          disabled={!isStreaming}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-glow ${
            isStreaming
              ? "gradient-primary"
              : "bg-muted cursor-not-allowed"
          }`}
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isStreaming ? "bg-primary-foreground/20" : "bg-muted-foreground/20"
            }`}
          >
            <Camera
              className={`w-8 h-8 ${
                isStreaming ? "text-primary-foreground" : "text-muted-foreground"
              }`}
            />
          </div>
        </motion.button>

        {/* Gallery Button */}
        <Button
          variant="ghost"
          size="icon-lg"
          onClick={onUpload}
          className="text-muted-foreground"
        >
          <Upload className="w-6 h-6" />
        </Button>
      </div>

      {/* Action Labels */}
      <div className="flex items-center justify-around mt-3">
        <span className="text-xs text-muted-foreground">
          {hasMultipleCameras ? "Flip" : "Upload"}
        </span>
        <span className="text-xs text-foreground font-medium">Capture</span>
        <span className="text-xs text-muted-foreground">Gallery</span>
      </div>
    </motion.div>
  );
};

export default CameraControls;
