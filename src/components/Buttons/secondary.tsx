export const SecondaryButton = ({ children, onClick }) => {
    return <button 
            className="px-5 text-green-500 rounded border-green-500 border-[1px] hover:bg-slate-400 transition-all hover:text-white" 
            onClick={onClick}>
        {children}
    </button>
};
