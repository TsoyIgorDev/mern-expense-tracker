import { useAppSelector } from "../../store/hooks";

const GlobalLoader = () => {
    const isLoading = useAppSelector((state) => state.settings.loadingCount > 0);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lg">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-primary" />
                <p className="text-sm text-gray-700">Loading...</p>
            </div>
        </div>
    );
};

export default GlobalLoader;
