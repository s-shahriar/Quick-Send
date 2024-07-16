import Lottie from "lottie-react";
import loadingAnimation from "../assets/animation.json";

const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <Lottie animationData={loadingAnimation} />
      </div>
    );
  };

  export default LoadingSpinner;