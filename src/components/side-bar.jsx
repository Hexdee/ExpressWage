/* eslint-disable react/prop-types */
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { dashboardConfig } from '../config/dashboard';

const SidebarNav = ({ setShowNav, showNav }) => {
  const { pathname } = useLocation();

  return (
    <nav className={`w-[60%] z-50 md:w-[18%] lg:w-[16%] bg-primary rounded-lg py-6 h-[98vh] overflow-y-hidden fixed md:ml-2 ease-in-out duration-300 ${showNav
      ? "ml-2"
      : "-translate-x-full md:translate-x-0"}`}>
      <div className="flex items-center px-6 mb-[54px] justify-between">
        <div className='flex items-center'>
          <img src="/logo-white.svg" alt="expresswage-logo" className='w-[150px]' />
        </div>

        <X color="#FFFFFF" className="sm:block md:hidden" onClick={() => setShowNav(false)} />
      </div>
      {dashboardConfig.sidebarNav.map((item) => (
        <Link to={item.url} key={item.title}>
          <p
            className={`text-sm py-4 my-2 px-6 cursor-pointer mx-[9px] hover:font-medium trans rounded ${
              pathname.startsWith(item.url)
                ? 'bg-secondary font-medium text-white'
                : 'bg-none text-lightgrey font-light text-slate-300'
            }`}
          >
            {item.title}
          </p>
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNav;