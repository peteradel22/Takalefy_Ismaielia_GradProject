/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const navIcons = {
  Welcome: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#777"><path d="M20 7L9 0 2 4v16h20V7zM7.9 18.1h-3V15h3v3.1zm3-4h-3v-3h3v3zm3-4h-3V8h3v3zm3-4h-3V4.9h3V8z"/></svg>,
  WelcomeA: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#009DE0"><path d="M20 7L9 0 2 4v16h20V7zM7.9 18.1h-3V15h3v3.1zm3-4h-3v-3h3v3zm3-4h-3V8h3v3zm3-4h-3V4.9h3V8z"/></svg>,
  Goals: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#777"><path d="M12 2a5 5 0 100 10 5 5 0 000-10zM4 21v-2a5 5 0 015-5h6a5 5 0 015 5v2H4z"/></svg>,
  GoalsA: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#009DE0"><path d="M12 2a5 5 0 100 10 5 5 0 000-10zM4 21v-2a5 5 0 015-5h6a5 5 0 015 5v2H4z"/></svg>,
  Income: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#777"><path d="M2 20h20v-1H2v1zm4-3h12v-1H6v1zM2 10h20V9H2v1zm4-3h12V6H6v1zM2 3v1h20V3H2z"/></svg>,
  IncomeA: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#009DE0"><path d="M2 20h20v-1H2v1zm4-3h12v-1H6v1zM2 10h20V9H2v1zm4-3h12V6H6v1zM2 3v1h20V3H2z"/></svg>,
};

const NavItem = ({ to, label, isActive }) => {
    const icon = isActive ? navIcons[`${label}A`] : navIcons[label];
  
    return (
      <Link to={to} className="text-decoration-none">
        <div className={`p-0 mr-[15px] flex flex-col items-center ${isActive ? "text-black" : "text-gray-500"}`}>
          <div className={`rounded-full w-[30px] h-[30px] flex justify-center items-center mb-2 
                          ${isActive ? "bg-gray-200" : "bg-white"}`}>
            {icon}
          </div>
          <span className="text-xs text-center">{label}</span>
        </div>
      </Link>
    );
  };
  
  const Navbar = ({ selectedLabel }) => {
    const navItems = [
      { to: "/welcome", label: "Welcome" },
      { to: "/income", label: "Income" },
      { to: "/goals", label: "Goals" },
    ];
  
    return (
      <div className="flex justify-center mb-7 gap-15 flex-nowrap">
        {navItems.map((item) => (
          <NavItem 
            key={item.to} 
            to={item.to} 
            label={item.label} 
            isActive={selectedLabel === item.label} 
          />
        ))}
      </div>
    );
  };
  
  export default Navbar;
  