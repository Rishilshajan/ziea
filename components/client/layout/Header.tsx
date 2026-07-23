"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../../ui/Button";
import { createClient } from "@/utils/supabase/client";
import ConfirmationModal from "../../ui/ConfirmationModal";
import {
  MdOutlineSearch,
  MdOutlineFavoriteBorder,
  MdOutlineShoppingBag,
  MdOutlinePerson,
  MdOutlineLogout,
  MdOutlineMenu,
  MdOutlineClose,
  MdOutlineLogin,
  MdOutlinePersonAdd,
  MdHome,
  MdOutlineStyle,
  MdOutlineInfo,
  MdOutlineMail
} from "react-icons/md";

const AVATAR_COLORS = [
  'bg-[#7A9268] text-white', // Sage Grove
  'bg-[#2C3829] text-[#F5F0E8]', // Deep Forest
  'bg-[#F5F0E8] text-[#2C3829]', // Warm Cream
  'bg-[#EDE6D8] text-[#2C3829]', // Linen Mist
  'bg-[#A8BC9A] text-[#2C3829]', // Sage Light
  'bg-[#D4DFD0] text-[#2C3829]', // Sage Pale
  'bg-[#E8D5C4] text-[#2C3829]', // Petal Blush
  'bg-[#C4856A] text-white', // Terracotta
  'bg-[#7A7068] text-white', // Warm Mist
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Click outside to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        // Fetch profile including role
        const { data: profileData } = await supabase
          .from('users')
          .select('first_name, last_name, email, role')
          .eq('id', session.user.id)
          .maybeSingle();
        if (profileData) setProfile(profileData);
      }
    };

    fetchUser();

    // Listen to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        const { data: profileData } = await supabase
          .from('users')
          .select('first_name, last_name, email, role')
          .eq('id', session.user.id)
          .maybeSingle();
        if (profileData) setProfile(profileData);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, router]);

  // Check role on navigation
  useEffect(() => {
    const checkRoleOnNavigation = async () => {
      if (user && profile) {
        const { data } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();

        if (data && data.role !== profile.role) {
          await supabase.auth.signOut();
          router.push('/login');
        }
      }
    };
    checkRoleOnNavigation();
  }, [pathname, user, profile, router, supabase]);


  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLogoutModalOpen(false);
    setIsMenuOpen(false);
    router.push('/login');
  };

  const getInitials = () => {
    if (!profile) return "U";
    return `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}`.toUpperCase();
  };

  const getAvatarColor = () => {
    if (!profile || !profile.first_name) return AVATAR_COLORS[0];
    const charCode = profile.first_name.charCodeAt(0) || 0;
    return AVATAR_COLORS[charCode % AVATAR_COLORS.length];
  };

  const menuItems = [
    { icon: <MdHome className="text-2xl" />, label: "Home", href: "/" },
    { icon: <MdOutlineStyle className="text-2xl" />, label: "Collections", href: "/collections" },
    { icon: <MdOutlineFavoriteBorder className="text-2xl" />, label: "Wishlist", href: "#" },
    { icon: <MdOutlineInfo className="text-2xl" />, label: "About Us", href: "/about-us" },
    { icon: <MdOutlineMail className="text-2xl" />, label: "Contact Us", href: "/contact-us" },
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
              <Link href="/contact-us" className="hover:text-primary transition-colors">CONTACT US</Link>
            </nav>
          </div>

          <div className="flex-[0.5] flex justify-center items-center shrink-0">
            <Image src="/Ziea_Logo.png" alt="ZIEA" width={400} height={250} className="h-20 lg:h-28 w-auto object-contain scale-[1.5]" priority />
          </div>

          <div className="flex-1 flex items-center justify-end gap-4 lg:gap-6">
            <div className="relative hidden xl:block">
              <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-xl" />
              <input type="text" placeholder="Search designs..." className="pl-10 pr-4 py-2 bg-muted/10 border border-border/50 rounded-full text-sm outline-none focus:border-primary/50 w-64 lg:w-80 transition-colors" />
            </div>

            <div className="flex gap-4">
              <Link href="/wishlist" className="text-text hover:text-primary transition-colors flex items-center">
                <MdOutlineFavoriteBorder className="text-2xl" />
              </Link>
              <Link href="/cart" className="text-text hover:text-primary transition-colors flex items-center">
                <MdOutlineShoppingBag className="text-2xl" />
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs lg:text-sm font-semibold tracking-wide text-text/80 border-l border-border/60 pl-4 lg:pl-6">
              {!user ? (
                <>
                  <Link href="/login" className="hover:text-primary transition-colors">LOGIN</Link>
                  <span className="text-border/60">|</span>
                  <Link href="/signup" className="hover:text-primary transition-colors">SIGN UP</Link>
                </>
              ) : !profile ? (
                <div className="w-10 h-10 rounded-full bg-muted/20 animate-pulse"></div>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-jost font-medium text-sm transition-transform hover:scale-105 ${getAvatarColor()}`}
                  >
                    {getInitials()}
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl py-2 border border-black/5 animate-in fade-in slide-in-from-top-2">
                      <Link
                        href="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-text hover:bg-muted/10 transition-colors"
                      >
                        <MdOutlinePerson className="text-xl" />
                        Profile
                      </Link>
                      <button
                        onClick={() => { setIsDropdownOpen(false); setIsLogoutModalOpen(true); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                      >
                        <MdOutlineLogout className="text-xl" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-background shadow-sm">
        <Button variant="icon" onClick={() => setIsMenuOpen(true)} className="z-10">
          <MdOutlineMenu className="text-2xl" />
        </Button>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
          <Image src="/Ziea_Logo.png" alt="ZIEA" width={300} height={150} className="h-24 w-auto object-contain scale-[1.8] pointer-events-auto" priority />
        </div>
        <div className="flex gap-1 items-center z-10">
          <Link href="/wishlist">
            <Button variant="icon" className="p-1">
              <MdOutlineFavoriteBorder className="text-[22px]" />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="icon" className="p-1">
              <MdOutlineShoppingBag className="text-[22px]" />
            </Button>
          </Link>
          {user && !profile ? (
            <div className="ml-1 flex items-center">
              <div className="w-8 h-8 rounded-full bg-muted/20 animate-pulse"></div>
            </div>
          ) : user && profile ? (
            <Link href="/profile" className="ml-1 flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-jost font-medium text-xs shadow-sm ${getAvatarColor()}`}>
                {getInitials()}
              </div>
            </Link>
          ) : null}
        </div>
      </header>

      {/* Slide-out Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative w-72 bg-[#E8EDE5] h-full shadow-2xl flex flex-col px-6 transform transition-transform animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-8">
              <Image src="/Ziea_Logo.png" alt="ZIEA" width={300} height={150} className="h-16 w-auto object-contain object-left scale-[1.5] origin-left -ml-2" priority />
              <Button
                variant="icon"
                onClick={() => setIsMenuOpen(false)}
                className="-mr-2"
              >
                <MdOutlineClose className="text-2xl" />
              </Button>
            </div>

            <nav className="flex flex-col gap-6">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href || "#"}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 text-text hover:text-primary transition-colors"
                >
                  {item.icon}
                  <span className="font-label-lg">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto pb-8 border-t border-border/50 pt-6">
              {!user ? (
                <nav className="flex flex-col gap-6">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 text-text/80 hover:text-primary transition-colors"
                  >
                    <MdOutlineLogin className="text-2xl" />
                    <span className="font-label-lg">Login</span>
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 text-text/80 hover:text-primary transition-colors"
                  >
                    <MdOutlinePersonAdd className="text-2xl" />
                    <span className="font-label-lg">Sign Up</span>
                  </Link>
                </nav>
              ) : !profile ? (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="flex items-center gap-4 text-red-500 hover:text-red-600 transition-colors py-2"
                  >
                    <MdOutlineLogout className="text-2xl" />
                    <span className="font-label-lg">Logout</span>
                  </button>

                  <div className="flex items-center gap-3 bg-white/60 p-3 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-muted/20 animate-pulse shrink-0"></div>
                    <div className="flex flex-col overflow-hidden w-full gap-2">
                      <div className="h-4 bg-muted/20 rounded animate-pulse w-3/4"></div>
                      <div className="h-3 bg-muted/20 rounded animate-pulse w-1/2"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="flex items-center gap-4 text-red-500 hover:text-red-600 transition-colors py-2"
                  >
                    <MdOutlineLogout className="text-2xl" />
                    <span className="font-label-lg">Logout</span>
                  </button>

                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 bg-white/60 p-3 rounded-2xl hover:bg-white transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-jost font-medium shrink-0 ${getAvatarColor()}`}>
                      {getInitials()}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-jost font-medium text-sm text-text truncate">
                        {profile?.first_name} {profile?.last_name}
                      </span>
                      <span className="text-xs text-on-surface-variant truncate">
                        {profile?.email || user.email}
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title="Logout Confirmation"
        message="Are you sure you want to log out of your account?"
        confirmLabel="Logout"
        icon={<MdOutlineLogout />}
        cancelLabel="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}
