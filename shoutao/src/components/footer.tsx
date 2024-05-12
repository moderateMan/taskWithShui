import LogoFull from '../assets/logo-full.png'

export default function Footer() {
  return (
    <footer className="bg-[#6AA342] py-[2.5rem] min-w-full text-white font-arial">
      <nav className="max-w-[72.5rem] mx-auto flex">
        <div className="mr-[15.875rem]">
          <img src={LogoFull} alt="" width={160} />
        </div>
        <div className="flex justify-around flex-1">
          <ul>
            <li className="text-[1.125rem] font-bold mb-2">CUSTOMER SERVICE</li>
            <li>
              <a href="https://swssglobal.com/contact-us">Contact Us</a>
            </li>
            <li>
              <a href="https://swssglobal.com/wed-love-to-hear-from-you/">
                Meet With Us
              </a>
            </li>
            <li>
              <a href="https://swssglobal.com/chemical-support/">
                CUSTOMER SERVICE
              </a>
            </li>
            <li>
              <a href="https://swssglobal.com/request-sample">
                Request Samples
              </a>
            </li>
            <li>
              <a href="https://swssglobal.com/distributor-program/">
                Become a Distributor
              </a>
            </li>
            <li>
              <a
                href="https://swssglobal.com/wp-content/uploads/2019/10/SW_Full_Line_Catalog_2024.pdf"
                target="_blank"
              >
                Catalog
              </a>
            </li>
          </ul>
          <ul>
            <li className="text-[1.125rem] font-bold mb-2">COMPANY</li>
            <li>
              <a href="https://swssglobal.com/careers">Careers</a>
            </li>
            <li>
              <a href="https://swssglobal.com/calendar">Calendar</a>
            </li>
            <li>
              <a href="https://swssglobal.com/news">News</a>
            </li>
            <li>
              <a href="https://swssglobal.com/category/ask-gia-blog/">
                Ask GIA Blog
              </a>
            </li>
          </ul>
          <ul>
            <li className="text-[1.125rem] font-bold mb-2">SUPPORT</li>
            <li>
              <a href="https://swssglobal.com/library">Library</a>
            </li>
            <li>
              <a href="https://swssglobal.com/packaging-symbols">Packaging</a>
            </li>
            <li>
              <a href="https://swssglobal.com/tradeshows/">Tradeshows</a>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
}
