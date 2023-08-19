import useAuth from "../hooks/useAuth";




export default function Header(props){
    const {user, token} = useAuth();
   
    return(
        <header className=" w-full  text-gray-700 bg-white border-t  border-gray-100 shadow-sm body-font ">
            <div className="container flex flex-col flex-wrap items-center p-5 mx-auto ">
                <div className="flex  justify-between  bg-white   ">
                     <label forhtml="table-search" className="sr-only">Search</label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 {dark}:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                         <input type="text"  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 {dark}:bg-gray-700 {dark}:border-gray-600 {dark}:placeholder-gray-400 {dark}:text-white {dark}:focus:ring-blue-500 {dark}:focus:border-blue-500" placeholder="Search for users" />
                    </div>
                    {/* <div className="flex justify-end">
                        <span className=" text-gray-700">Hello, hamza</span>
                    </div> */}
                </div>
            </div>
        </header>

        // <>
        // <nav class="bg-white border-gray-200 dark:bg-gray-900">
        //     <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        //         <a href="https://flowbite.com" class="flex items-center">
        //             <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
        //             <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        //         </a>
        //         <div class="flex items-center">
        //             <a href="tel:5541251234" class="mr-6 text-sm  text-gray-500 dark:text-white hover:underline">(555) 412-1234</a>
        //             <a href="#" class="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</a>
        //         </div>
        //     </div>
        // </nav>
        // <nav class="bg-gray-50 dark:bg-gray-700">
        //     <div class="max-w-screen-xl px-4 py-3 mx-auto">
        //         <div class="flex items-center">
        //             <ul class="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
        //                 <li>
        //                     <a href="#" class="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
        //                 </li>
        //                 <li>
        //                     <a href="#" class="text-gray-900 dark:text-white hover:underline">Company</a>
        //                 </li>
        //                 <li>
        //                     <a href="#" class="text-gray-900 dark:text-white hover:underline">Team</a>
        //                 </li>
        //                 <li>
        //                     <a href="#" class="text-gray-900 dark:text-white hover:underline">Features</a>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </nav>
        // </>




    );
}
