export const handleFunc = (
    handleNext: Function,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
  
    setTimeout(() => {
      handleNext();
      setLoading(false);
    }, 5000);
  };