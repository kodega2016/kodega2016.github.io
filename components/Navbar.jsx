'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);

  const NavLink = isHome ? 'a' : Link;
  function close() { setOpen(false); }

  return (
    <nav role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" onClick={close} aria-label="Khadga Bahadur Shrestha — Home"><span className="nav-prompt">&gt;</span>kb</Link>
        <div id="nav-menu" className={`nav-pill ${open ? 'open' : ''}`} role="menubar">
          <NavLink href={isHome ? '#about' : '/#about'} onClick={close} role="menuitem">/about</NavLink>
          <NavLink href={isHome ? '#experience' : '/#experience'} onClick={close} role="menuitem">/experience</NavLink>
          <NavLink href={isHome ? '#skills' : '/#skills'} onClick={close} role="menuitem">/skills</NavLink>
          <NavLink href={isHome ? '#projects' : '/#projects'} onClick={close} role="menuitem">/projects</NavLink>
          <NavLink href={isHome ? '#blogs' : '/#blogs'} onClick={close} role="menuitem">/blog</NavLink>
          <NavLink href={isHome ? '#contact' : '/#contact'} onClick={close} role="menuitem">/contact</NavLink>
        </div>
        <a href="/khadga-bahadur-shrestha.pdf" download className="nav-resume" onClick={close} aria-label="Download resume PDF"><span className="nav-dl" aria-hidden="true">&darr;</span> resume</a>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation menu" aria-expanded={open} aria-controls="nav-menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
