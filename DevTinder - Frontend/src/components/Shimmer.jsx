const ShimmerCard = () => (
    <div className="max-w-sm w-72 bg-gray-100 rounded-xl shadow-lg p-5 animate-pulse">
        <div className="h-40 w-full bg-gray-300 rounded-lg mb-4" />
        <div className="flex items-center mb-4 space-x-4">
            <div className="h-12 w-12 bg-gray-300 rounded-full" />
            <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-24 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-16" />
            </div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2" />
        <div className="h-3 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="flex gap-2 mt-4">
            <div className="h-10 w-24 bg-gray-300 rounded-full" />
            <div className="h-10 w-28 bg-gray-300 rounded-full" />
        </div>
    </div>
);

export default ShimmerCard;
