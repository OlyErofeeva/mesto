export const renderLoadingText = (isLoading, loadingText, initialText) => {
  return (isLoading ? loadingText : initialText);
}