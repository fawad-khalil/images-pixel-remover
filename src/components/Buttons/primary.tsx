export const PrimaryButton = ({ classes = '', children , onClick }) => {
    return <button 
            className={`bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded transition-all ${classes}`}
            onClick={onClick}>
        {children}
    </button>
};
