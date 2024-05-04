export default function Footer() {
  return (
    <footer className="bg-[#6AA342] py-[2.5rem] min-w-full text-white font-arial">
      <nav className="max-w-[72.5rem] mx-auto flex">
        <div className="mr-[15.875rem]">icon</div>
        <div className="flex justify-around flex-1">
          <ul>
            <li className="text-[1.125rem] font-bold mb-2">CUSTOMER SERVICE</li>
            <li>Contact Us</li>
            <li>Meet With Us</li>
            <li>CUSTOMER SERVICE</li>
            <li>Request Samples</li>
            <li>Become a Distributor</li>
            <li>Catalog</li>
          </ul>
          <ul>
            <li className="text-[1.125rem] font-bold mb-2">COMPANY</li>
            <li>Careers</li>
            <li>Calendar</li>
            <li>News</li>
            <li>Ask GIA Blog</li>
          </ul>
          <ul>
            <li className="text-[1.125rem] font-bold mb-2">SUPPORT</li>
            <li>Library</li>
            <li>Packaging</li>
            <li>Tradeshows</li>
          </ul>
        </div>
      </nav>
    </footer>
  );
}
