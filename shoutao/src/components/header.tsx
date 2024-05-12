import Logo from '../assets/logo.png'

export default function Header() {
  return (
    <header className="bg-[#6AA342] py-[3.125rem] min-w-full text-white">
      <nav className="max-w-[72.5rem] mx-auto flex items-center">
        <img src={Logo} alt="" width={92} />
        <div className="text-[2.25rem] font-arialblack ml-2">Safe Hand Guide</div>
      </nav>
    </header>
  );
}
