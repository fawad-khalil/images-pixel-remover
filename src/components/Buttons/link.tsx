import Link from "next/link";

export const LinkButton = ({ children, href }) => {
    return <Link className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' href={href}>
        {children}
    </Link>
};
