import Menu from '../navigation/Menu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='pb-28 2xl:pb-40'>
      <Menu />
      <div className='pt-32 xl:ml-[300px]'>{children}</div>
    </main>
  );
}
