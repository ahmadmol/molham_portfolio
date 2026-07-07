"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import MotionSection from "../ui/MotionSection";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";
import Button from "../ui/Button";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  const contact = portfolio.contact;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [touched, setTouched] = useState<{ name: boolean; email: boolean; message: boolean }>({
    name: false,
    email: false,
    message: false,
  });

  const [status, setStatus] = useState<
    { type: "idle" | "error" | "success"; text?: string } | null
  >({ type: "idle" });

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!isValidEmail(email.trim()))
      e.email = "Please enter a valid email.";
    if (!message.trim()) e.message = "Message is required.";
    else if (message.trim().length < 10)
      e.message = "Message should be at least 10 characters.";
    return e;
  }, [name, email, message]);

  const canSubmit = Object.keys(errors).length === 0;

  return (
    <MotionSection id="contact" className="py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              kicker="Contact"
              title={portfolio.contactSection.heading}
              description="I usually reply within 24 hours."
            />

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${contact.email}`}
                className="block rounded-3xl border border-white/10 bg-white/5 p-5 hover:border-accent/30 hover:shadow-[0_0_0_1px_rgba(0,200,83,0.20)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                aria-label={`Email ${contact.email}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Email
                </p>
                <p className="mt-2 text-base font-semibold text-slate-100 break-all">
                  {contact.email}
                </p>
              </a>

              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="block rounded-3xl border border-white/10 bg-white/5 p-5 hover:border-accent/30 hover:shadow-[0_0_0_1px_rgba(0,200,83,0.20)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                aria-label={`Call ${contact.phone}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Phone
                </p>
                <p className="mt-2 text-base font-semibold text-slate-100">
                  {contact.phone}
                </p>
              </a>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://${contact.linkedInUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open LinkedIn"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 hover:border-accent/30 hover:shadow-[0_0_0_1px_rgba(0,200,83,0.18)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://${contact.gitHubUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open GitHub"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 hover:border-accent/30 hover:shadow-[0_0_0_1px_rgba(0,200,83,0.18)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7 shadow-[0_0_0_1px_rgba(0,200,83,0.08)]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  // Show all errors on submit if invalid
                  if (!canSubmit) {
                    setTouched({ name: true, email: true, message: true });
                    setStatus({
                      type: "error",
                      text: "Please fix the form errors and try again.",
                    });
                    return;
                  }

                  setStatus({ type: "idle" });

                  // Keep the current simulated behavior but remove "demo/backend" messaging.
                  setTimeout(() => {
                    setStatus({
                      type: "success",
                      text: "Message sent! I’ll get back to you soon.",
                    });
                    setName("");
                    setEmail("");
                    setMessage("");
                    setTouched({ name: false, email: false, message: false });
                  }, 550);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-slate-100 outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.name && touched.name)}
                    />
                    {errors.name && touched.name ? (
                      <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-slate-100 outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email && touched.email)}
                    />
                    {errors.email && touched.email ? (
                      <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    rows={5}
                    className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-slate-100 outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                    placeholder="Tell me about your project..."
                    aria-invalid={Boolean(errors.message && touched.message)}
                  />
                  {errors.message && touched.message ? (
                    <p className="mt-2 text-sm text-red-400">{errors.message}</p>
                  ) : null}
                </div>

                {status?.type === "error" ? (
                  <div
                    className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                    role="alert"
                  >
                    {status.text}
                  </div>
                ) : null}

                {status?.type === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent"
                    role="status"
                    aria-live="polite"
                  >
                    {status.text}
                  </motion.div>
                ) : null}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-between">
                  <p className="text-xs text-slate-400">
                    You can also reach me via email or phone if you prefer.
                  </p>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="sm:ml-auto"
                  >
                    <Button
                      type="submit"
                      disabled={!canSubmit}
                      aria-label="Send message"
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}
