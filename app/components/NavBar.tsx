export default function NavBar()
{
    return(
        <nav className="bg-gray-800 text-white p-4">
            <div className ="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                        <a href="/about" className="hover:underline">About</a>
                </div>
            </div>
        </nav>
    )
}