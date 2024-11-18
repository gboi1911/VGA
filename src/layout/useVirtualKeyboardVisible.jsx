import { useState, useEffect } from "react";

const useVirtualKeyboardVisible = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Compare window.innerHeight with the viewport height to detect the keyboard
      const isKeyboardVisible =
        window.innerHeight < document.documentElement.clientHeight;
      setKeyboardVisible(isKeyboardVisible);
    };

    // Add event listeners for resize
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      // Clean up event listeners
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return keyboardVisible;
};

export default useVirtualKeyboardVisible;
