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
    <nav>
      <div className="nav-inner">
        <Link href="/" className="nav-logo" onClick={close}><span className="nav-prompt">&gt;</span>kb</Link>
        <div className={`nav-pill ${open ? 'open' : ''}`}>
          <NavLink href={isHome ? '#about' : '/#about'} onClick={close}>/about</NavLink>
          <NavLink href={isHome ? '#experience' : '/#experience'} onClick={close}>/experience</NavLink>
          <NavLink href={isHome ? '#skills' : '/#skills'} onClick={close}>/skills</NavLink>
          <NavLink href={isHome ? '#projects' : '/#projects'} onClick={close}>/projects</NavLink>
          <NavLink href={isHome ? '#blogs' : '/#blogs'} onClick={close}>/blog</NavLink>
          <NavLink href={isHome ? '#contact' : '/#contact'} onClick={close}>/contact</NavLink>
        </div>
        <a href="/khadga-bahadur-shrestha.pdf" download className="nav-resume" onClick={close}><span className="nav-dl">&darr;</span> resume</a>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
