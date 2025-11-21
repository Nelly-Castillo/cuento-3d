import logo from '/image/Logo.svg'
import SearchBox from './SearchBox';
import { Link } from 'react-router-dom';
function NavBar({ onSearch }) {
    return(
        <nav className='fixed top-0 w-full  shadow-md p-2 z-50'>
            <div className='flex items-center justify-evenly h-1/6'>
                <div className='flex items-center cursor-pointer'>
                    <Link to="/">
                        <img src={logo} alt= "Logo" width={50}></img>
                    </Link>
                </div>
                <div>
                    <SearchBox onSearch={onSearch} />
                </div>
                <div className='flex items-center cursor-pointer p-3 rounded-full hover:bg-[#FFF5E1] hover:text-[#CF8D00]' >
                    <Link to="/books" className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#CF8D00" className="bi bi-book" viewBox="0 0 16 16">
                            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                        </svg>
                        <p className='ml-2'>Libros</p>
                    </Link>
                </div>
                <div  className='flex items-center cursor-pointer p-3 rounded-full hover:bg-[#FFF5E1] hover:text-[#CF8D00]' >
                    <Link to="/help" className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#CF8D00" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                        </svg>
                        <p className='ml-2'>Ayuda</p>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar