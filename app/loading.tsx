const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#001f3f] text-white z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        <div className="text-lg font-medium">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
