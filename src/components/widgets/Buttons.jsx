export const ButtonsFilled = ({ clickAction, title, classParam }) => {
  return (
    <button
      className={
        !classParam || classParam === ""
          ? "bg-secondary text-black box-border rounded-md border-[1px] px-4 py-1 flex w-full font-semibold items-center justify-center"
          : classParam
      }
      onClick={clickAction}
    >
      {title}
    </button>
  );
};

export const ButtonsOutlined = ({ clickAction, title, classParam }) => {
  return (
    <button
      className={
        !classParam || classParam === ""
          ? "border bg border-gray-400 rounded-md py-1 mt-3 w-full hover:bg-red-500 hover:text-white"
          : classParam
      }
      onClick={clickAction}
    >
      {title}
    </button>
  );
};

export const ButtonsColoured = ({ clickAction, title, color }) => {
  const colorClasses = {
    redmid: "bg-redmid",
    accentblue: "bg-accentblue",
    blueMid: "bg-blueMid",
    blueLight: "bg-blueLight",
    secondary: "bg-secondary",
  };
  return (
    <button
      // className={`border bg-${color} rounded-md p-1 text-white`}
      className={`border ${colorClasses[color]} rounded-md py-1 text-white`}
      onClick={clickAction}
    >
      {title}
    </button>
  );
};
