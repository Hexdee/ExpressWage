/* eslint-disable react/prop-types */
import { LogOut, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

import { HOME_URL } from '../config/paths';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomButton } from './ui/custom-button';

const MainNav = ({ setShowNav }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const renderTitle = () => {
    return pathname.split('/').slice(1)[0].replace('-', ' ');
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate(HOME_URL);
  };

  return (
    <div className="flex justify-between pt-4 lg:pt-8 pb-3 items-center px-6 z-10 cursor-pointer">
      <Menu className="sm:flex md:hidden" onClick={() => setShowNav(true)} />
      <p className="font-medium w-fit capitalize">{renderTitle()}</p>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <CustomButton
              chainStatus="icon"
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MainNav;
