import { useEffect } from "react";
import { HOME_URL } from "../config/paths";
import { CustomButton } from "./ui/custom-button";

const Navbar = () => {
  return (
    <div className="flex items-center w-full justify-between">
      <a href={HOME_URL}>
        <img src="/logo.svg" alt="logo" className="w-[120px] md:w-[180px]" />
      </a>
      <div className="md:w-[20%] hidden justify-between md:flex items-center">
        <button className="hover:text-secondary font-light">About us</button>
        <button className="hover:text-secondary font-light">
          How to get started
        </button>
      </div>
      <CustomButton
        accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: true,
          }}
        chainStatus="none"
      />
    </div>
  );
};

export default Navbar;
