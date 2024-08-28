import React from "react";

import { FaCalendarMinus } from "react-icons/fa";
import { ButtonsFilled } from "./widgets/Buttons";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-5 text-white bg-accentblue">
      {/* Logo */}
      <p>
        <FaCalendarMinus className="text-xl" />
      </p>

      {/* Navigation */}
      <div className="flex items-center gap-2">
        <Link to="/signin">
          <ButtonsFilled title="Login" clickAction={() => {}} />
        </Link>
        <Link to="/signup">
          <button>SignUp</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
