import { useEffect, useState } from "react";

/**
 * Custom hook to determine if the current device is mobile.
 * @returns {boolean} - True if the device is mobile, false otherwise.
 */
const useMobile = (): boolean => {
  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 600);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return mobile;
};

export default useMobile;
