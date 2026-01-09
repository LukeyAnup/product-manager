import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import ButtonIcon from "./reusable/buttonIcon";
import { ROUTES } from "../routes/routes";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./ui/languageSelect";
import { RiLogoutBoxLine } from "react-icons/ri";
import { logout } from "../api/auth";
import { toast } from "react-toastify";

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const loggedInUser = localStorage.getItem("loggedInUser");

  const navLinks = [
    { name: t("navLinks.home"), path: ROUTES.HOME },
    { name: t("navLinks.products"), path: ROUTES.PRODUCTS },
  ];

  const handleLogout = () => {
    const result = logout();
    toast.success("Successfully logged out");

    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              {t("title")}
            </Link>
          </div>

          <div className="hidden md:flex justify-end items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {link.name}
              </Link>
            ))}
            {loggedInUser && (
              <div
                onClick={handleLogout}
                className="cursor-pointer hover:bg-gray-200"
              >
                <RiLogoutBoxLine size={24} />
              </div>
            )}
            <div>
              <LanguageSelect />
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <ButtonIcon onClick={toggleMenu}>
              {isOpen ? (
                <RxCross1 className="h-6 w-6" />
              ) : (
                <IoIosMenu className="h-6 w-6" />
              )}
            </ButtonIcon>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
