const useHashParams = () => {
  return () => {
    let hashData: Record<PropertyKey, any> = {};
    window.location.hash
      .replace('#', '')
      .split('&')
      .forEach((item) => {
        hashData[item.split('=')[0] as keyof typeof hashData] = item.split('=')[1];
      });
    return hashData;
  };
};

export default useHashParams;
