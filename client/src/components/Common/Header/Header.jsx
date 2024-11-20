"use client"
import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../../../public/logo.59102633.svg"
import { FaHeadphones } from "react-icons/fa";
import { Button } from "antd";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { FaArrowRight } from "react-icons/fa";


const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const pathName = usePathname();
  const router = useRouter()

  React.useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    router.push('/Support')
  }

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {[
      
        { href: "/", label: "For Companies" },
        { href: "/", label: "For Talent" },
        { href: "/", label: "Our Products" },
      ].map(({ href, label }) => (
        <Typography
          key={href}
          as="li"
          color="blue-gray"
          className="p-1 text-sm"
        >
          <Link href={href} legacyBehavior>
            <a
              className="flex items-center text-[#CFCFD0] text-[16px]"
              style={{
                fontWeight: pathName === href ? "bold" : "normal",
                color: pathName === href ? "#CFCFD0" : "",
               
              }}
            >
              {label}
            </a>
          </Link>
        </Typography>
      ))}
    </ul>
  );

  return (
   <section className="bg-[#282EA2]">
      <div className="lg:max-w-[1400px]  mx-auto">
      <Navbar className="sticky top-0 z-10 py-2 bg-[#282EA2] border-none lg:py-5 shadow-none rounded-none bg-opacity-100">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center">
            <Typography as="div" className="mr-11 cursor-pointer py-1.5 font-medium">
              <Link href="/Home" legacyBehavior>
              <Image src={Logo} alt="Cluster" className="w-[120px] h-[30px]"/>
              </Link>
            </Typography>
            <div className="flex items-center gap-4">
            <div className="mr-2 hidden lg:block">{navList}</div>
          </div>
          </div>

          
         

          <div className="flex items-center gap-5">
          <div>
                    <Link href="/register">  <Button className={`bg-transparent text-white py-4 px-5`}>Find jobs <FaArrowRight className="text-white ms-1" size={15}/></Button></Link>
                  </div>
                  <div className="gap-4  hidden lg:block">
                    <Link href="/login">  <Button className={`bg-transparent px-7 text-white`}>Log in</Button></Link>
                  </div>
            <IconButton
              variant="text"
              className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>{navList}</Collapse>
      </Navbar>
    </div>
   </section>
  );
};

export default Header;
