interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
}

export default function IconButton({ icon, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className='transition-300 grid h-10 w-10 place-content-center rounded-full border border-grey2 hover:border-grey1 hover:bg-grey3'
    >
      {icon}
    </button>
  );
}
