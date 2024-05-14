import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-center rounded bg-white p-10 text-black">
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link to="/">
            <img className="w-72" src="./workconnect_logo.png" alt="" />
          </Link>
        </div>
      </nav>
      <aside>
        <p>Copyright © 2024 - All right reserved by Work Connect</p>
        <p>Developed by Sajid & Lokesh</p>
      </aside>
    </footer>
  );
};

export default Footer;
