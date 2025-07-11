function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="relative flex flex-col items-center space-y-6">
                {/* Gradient blob animation */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 via-violet-500 to-indigo-500 animate-pulse blur-sm opacity-70" />
            </div>
        </div>
    );
}

export default Loading;
