"use client";
import { useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";
import Container from "../ui/Container";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      setScrolled(window.scrollY > 8);
      const current = portfolio.nav
        .filter(
          (item) =>
            (document.getElementById(item.id)?.getBoundingClientRect().top ??
              Infinity) <= 180,
        )
        .at(-1);
      setActive(current?.id ?? "");
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(update, {
      rootMargin: "-80px 0px -60% 0px",
    });
    portfolio.nav.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const el = dialog.current;
    const returnTarget = trigger.current;
    const previous = document.body.style.overflow;
    el?.showModal();
    document.body.style.overflow = "hidden";
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      el?.close();
      document.body.style.overflow = previous;
      window.removeEventListener("resize", onResize);
      returnTarget?.focus({ preventScroll: true });
    };
  }, [open]);
  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b ${scrolled ? "border-white/10 bg-background/95" : "border-white/5 bg-background"}`}
      >
        <Container className="flex h-20 items-center justify-between gap-4">
          <a
            href="#home"
            aria-label="M. Molham Alnaeb — top of page"
            className="flex items-center gap-3"
          >
            <span
              aria-hidden
              className="grid h-10 w-10 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-xl font-semibold text-accent-bright"
            >
              M.
            </span>
            <span className="text-sm font-medium">{portfolio.title}</span>
          </a>
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {portfolio.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className={
                  item.id === "contact"
                    ? "button-link button-primary ml-4"
                    : "nav-link"
                }
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            ref={trigger}
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
            aria-label="Open navigation menu"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 lg:hidden"
          >
            <span aria-hidden>☰</span>
          </button>
        </Container>
      </header>
      <dialog
        ref={dialog}
        id="mobile-nav-menu"
        aria-label="Navigation"
        className="nav-dialog"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>(
            "a[href],button:not([disabled])",
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            setOpen(false);
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="font-semibold">{portfolio.title}</p>
          <button
            autoFocus
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            className="h-11 w-11 rounded-xl border border-white/20 text-2xl"
          >
            ×
          </button>
        </div>
        <nav aria-label="Mobile" className="mt-8 flex flex-col gap-2">
          {[...portfolio.nav, { id: "education", label: "Education" }].map(
            (item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="nav-link py-3 text-lg"
                aria-current={active === item.id ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>
        <p className="mt-10 text-sm text-foreground-muted">
          {portfolio.subtitle}
        </p>
      </dialog>
    </>
  );
}
