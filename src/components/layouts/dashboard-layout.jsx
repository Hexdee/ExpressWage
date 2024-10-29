/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import SidebarNav from '../side-bar';
import MainNav from '../main-nav';
import { useNavigate } from 'react-router-dom';
import { HOME_URL } from '../../config/paths';
import { useAccount } from 'wagmi';

const DashboardLayout = ({ children }) => {
  const [showNav, setShowNav] = useState(false);
  const [showLayout, setLayout] = useState(false);
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      setLayout(true);
    } else {
      setLayout(false);
      navigate(HOME_URL);
    }
  }, [isConnected]);

  return (
    <>
      {showLayout && (
        <div className="md:grid grid-cols-1 md:grid-cols-6 bg-dashboard min-h-screen">
          {showNav && (
            <div
              className="inset-0 w-full bg-[#000000] opacity-50 h-[100%] ease-in-out duration-300 fixed z-50"
              onClick={() => setShowNav(false)}
            ></div>
          )}

          <div className="col-span-1 py-2">
            <SidebarNav setShowNav={setShowNav} showNav={showNav} />
          </div>

          <div className="col-span-5 px-2 -mt-4 lg:mt-0">
            <div className="fixed w-full lg:w-[81%] bg-white z-20 top-0">
              <MainNav setShowNav={setShowNav} />
              <div className="h-[0.5px] bg-[#C7D0D7]" />
            </div>

            <div className="overflow-x-hidden h-full pt-[90px] lg:pt-24 px-6">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
