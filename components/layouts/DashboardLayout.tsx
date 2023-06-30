import Menu from '../navigation/Menu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='pb-28 pt-32 xl:pl-[300px] 2xl:pb-40'>
      <Menu />
      {children}
    </main>
  );
}
