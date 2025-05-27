import { LogOut, LogIn, MessageSquare } from "lucide-react";

const Navbar = ({
  title,
  onButtonClick,
  collapsed = false,
  action,
  actionColor,
  gradient = "from-pink-500 via-red-500 to-yellow-500",
}) => {
  const getIcon = () => {
    switch (action) {
      case "logout":
        return <LogOut size={20} />;
      case "login":
        return <LogIn size={20} />;
      case "chat":
        return <MessageSquare size={20} />;
    }
  };

  return (
    <div
      className={`flex ${
        collapsed
          ? "flex-col items-center space-y-2"
          : "flex-row justify-between items-center"
      } py-2 px-5 border-b border-base-300 bg-base-200`}
    >
      <div
        className={`flex ${
          collapsed
            ? "flex-col items-center space-y-4 py-3"
            : "flex-row items-center justify-between flex-grow"
        }`}
      >
        <button className={`btn btn-circle btn-${actionColor} h-11 w-11`}>
          <img
            src="https://i.pravatar.cc/40?img=1"
            alt="Profile"
            className="w-10 h-10 rounded-full bg-base-100"
          />
        </button>
        {!collapsed && (
          <h2
            className={`font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r ${gradient}`}
          >
            {title}
          </h2>
        )}
        <button
          className={`btn btn-sm btn-circle btn-${actionColor} mt-${
            collapsed ? "2" : "0"
          }`}
          onClick={onButtonClick}
          title={action}
        >
          {getIcon()}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
