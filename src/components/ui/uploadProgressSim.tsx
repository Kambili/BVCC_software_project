import { useState } from "react";

const UploadProgressSim = () => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadId, setUploadId] = useState(null);

  const startUpload = () => {
    setIsUploading(true);
    setProgress(0);
  };
  return <div></div>;
};
export default UploadProgressSim;
