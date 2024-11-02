import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
      <Link href="/" className="flex items-center">
  <Image 
    src="/images/logo.png" 
    alt="Logo" 
    width={120} 
    height={100} 
    className="object-contain" 
    
  />
</Link>
        <p className="text-slate-600">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
