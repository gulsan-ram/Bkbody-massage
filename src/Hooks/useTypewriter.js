import { useState, useEffect } from "react";

export const useTypewriter = ({ words, loop = true, typeSpeed = 140, deleteSpeed = 75, delaySpeed = 1500 }) => {
  const [state, setState] = useState({
    text: "",
    wordIndex: 0,
    isDeleting: false,
  });

  useEffect(() => {
    const handleType = () => {
      const currentWordIndex = state.wordIndex % words.length;
      const currentWord = words[currentWordIndex];
      const isDeleting = state.isDeleting;

      let updatedText = state.text;
      let updatedIsDeleting = isDeleting;

      if (!isDeleting) {
        updatedText = currentWord.substring(0, state.text.length + 1);

        if (updatedText === currentWord) {
          updatedIsDeleting = true;
        }
      } else {
        updatedText = currentWord.substring(0, state.text.length - 1);

        if (updatedText === "") {
          updatedIsDeleting = false;
          if (loop) {
            setState((prevState) => ({
              ...prevState,
              wordIndex: (prevState.wordIndex + 1) % words.length,
            }));
          } else {
            if (currentWordIndex === words.length - 1) {
              // Stop at the last word
              return;
            }
            setState((prevState) => ({
              ...prevState,
              wordIndex: prevState.wordIndex + 1,
            }));
          }
        }
      }

      setState((prevState) => ({
        ...prevState,
        text: updatedText,
        isDeleting: updatedIsDeleting,
      }));
    };

    const timer = setTimeout(() => {
      handleType();
    }, state.isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timer);
  }, [state, words, typeSpeed, deleteSpeed, delaySpeed, loop]);

  return state.text;
};

export default useTypewriter;
