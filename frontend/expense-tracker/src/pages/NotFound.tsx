import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
            <div className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-10 shadow-xl shadow-gray-200/50">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">Error 404</p>
                <h1 className="mt-4 text-4xl font-semibold text-gray-900">Page not found</h1>
                <p className="mt-4 text-sm leading-6 text-gray-500">
                    The page you requested does not exist or may have been moved. You can return to the root of the route tree and continue from there.
                </p>

                <div className="mt-8 flex items-center gap-4">
                    <Link to="/" className="btn-primary">
                        Go To Main Page
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
