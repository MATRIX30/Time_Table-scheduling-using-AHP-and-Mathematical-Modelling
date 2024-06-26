
const ButtonIcon = ({
  title,
  icon,
  bg,
  onClick,
  diseable,
  size,
  isloading,
}) => {


  return (
    <>
      {!isloading && (
        <button
          disabled={diseable}
          onClick={onClick}
          className={`flex items-center bg-gray-200 text-gray-600  ${
            size ? size : "px-12"
          } py-2  text-[12px] gap-3 ${
            !diseable && "hover:bg-slate-600"
          } transition-all ease-in-out ${
            bg
              ? bg + " text-white"
              : `border border-gray-300` }`
          }
        >
          {title}
          {icon && icon}
        </button>
      )}

    </>
  );
};

export default ButtonIcon;
