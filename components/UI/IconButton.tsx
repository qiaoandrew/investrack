type IconButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
  classes?: string;
};

export default function IconButton({
  icon,
  onClick,
  classes,
}: IconButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`transition-300 grid h-10 w-10 place-content-center rounded-full border border-grey2 hover:border-grey1 hover:bg-grey3 ${classes}`}
    >
      {icon}
    </button>
  );
}
