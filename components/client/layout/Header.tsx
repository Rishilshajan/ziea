"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/Button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { icon: "home", label: "Home", filled: true, href: "/" },
    { icon: "style", label: "Collections", href: "/collections" },
    { icon: "favorite", label: "Wishlist", href: "#" },
    { icon: "info", label: "About Us", href: "/about-us" },
    { icon: "mail", label: "Contact Us", href: "#" },
    { icon: "login", label: "Login", href: "#" },
    { icon: "person_add", label: "Sign Up", href: "#" },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex w-full fixed top-0 left-0 z-50 bg-background shadow-sm h-20">
        <div className="flex w-full h-full px-4 xl:px-8 items-center">
          <div className="flex-1 flex items-center justify-start">
            <nav className="flex items-center gap-4 lg:gap-6 text-xs lg:text-sm font-semibold tracking-wide text-text/80">
              <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
              <Link href="/collections" className="hover:text-primary transition-colors">COLLECTIONS</Link>
              <Link href="/wishlist" className="hover:text-primary transition-colors">WISHLIST</Link>
              <Link href="/about-us" className="hover:text-primary transition-colors">ABOUT US</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">CONTACT US</Link>
            </nav>
          </div>

          <div className="flex-[0.5] flex justify-center items-center shrink-0">
            <Image src="/Ziea_Logo.png" alt="ZIEA" width={400} height={250} className="h-20 lg:h-28 w-auto object-contain scale-[1.5]" priority />
          </div>

          <div className="flex-1 flex items-center justify-end gap-4 lg:gap-6">
            <div className="relative hidden xl:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted text-xl">search</span>
              <input type="text" placeholder="Search designs..." className="pl-10 pr-4 py-2 bg-muted/10 border border-border/50 rounded-full text-sm outline-none focus:border-primary/50 w-64 lg:w-80 transition-colors" />
            </div>

            <div className="flex gap-4">
              <Link href="/wishlist" className="text-text hover:text-primary transition-colors flex items-center">
                <span className="material-symbols-outlined">favorite</span>
              </Link>
              <Link href="/cart" className="text-text hover:text-primary transition-colors flex items-center">
                <span className="material-symbols-outlined">shopping_bag</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs lg:text-sm font-semibold tracking-wide text-text/80 border-l border-border/60 pl-4 lg:pl-6">
              <Link href="#" className="hover:text-primary transition-colors">LOGIN</Link>
              <span className="text-border/60">|</span>
              <Link href="#" className="hover:text-primary transition-colors">SIGN UP</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-background shadow-sm">
        <Button variant="icon" onClick={() => setIsMenuOpen(true)} className="z-10">
          <span className="material-symbols-outlined">menu</span>
        </Button>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
          <Image src="/Ziea_Logo.png" alt="ZIEA" width={300} height={150} className="h-24 w-auto object-contain scale-[1.8] pointer-events-auto" priority />
        </div>
        <div className="flex gap-1">
          <Link href="/wishlist">
            <Button variant="icon" className="p-1">
              <span className="material-symbols-outlined text-[22px]">favorite</span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="icon" className="p-1">
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Slide-out Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative w-64 bg-[#E8EDE5] h-full shadow-2xl flex flex-col px-6 transform transition-transform animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-8">
              <Image src="/Ziea_Logo.png" alt="ZIEA" width={300} height={150} className="h-16 w-auto object-contain object-left scale-[1.5] origin-left -ml-2" priority />
              <Button
                variant="icon"
                onClick={() => setIsMenuOpen(false)}
                className="-mr-2"
              >
                <span className="material-symbols-outlined">close</span>
              </Button>
            </div>

            <nav className="flex flex-col gap-6">
              {menuItems.slice(0, 5).map((item, index) => (
                <Link
                  key={index}
                  href={item.href || "#"}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 text-text hover:text-primary transition-colors"
                >
                  <span
                    className={`material-symbols-outlined ${item.filled ? 'filled-icon' : ''}`}
                    style={item.filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.icon}
                  </span>
                  <span className="font-label-lg">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto pb-8 border-t border-border/50 pt-6">
              <nav className="flex flex-col gap-6">
                {menuItems.slice(5).map((item, index) => (
                  <Link
                    key={index}
                    href="#"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 text-text/80 hover:text-primary transition-colors"
                  >
                    <span
                      className={`material-symbols-outlined ${item.filled ? 'filled-icon' : ''}`}
                      style={item.filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {item.icon}
                    </span>
                    <span className="font-label-lg">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
