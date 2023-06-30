export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mx-5 mb-28 mt-32 xl:mb-40 xl:mt-40'>
      <div className='mx-auto max-w-[400px]'>{children}</div>
    </div>
  );
}
