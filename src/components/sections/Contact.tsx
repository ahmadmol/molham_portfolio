"use client";

import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "../ui/Container";
import MotionSection from "../ui/MotionSection";
import SectionHeading from "../ui/SectionHeading";
import { portfolio } from "@/data/portfolio";
import Button from "../ui/Button";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type FieldKey = "name" | "email" | "subject" | "message";

const MAX_MESSAGE = 1200;

function buildMailto({
  to,
  name,
  email,
  subject,
  message,
}: {
  to: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const body = `Hi Molham,\n\n${message}\n\n— ${name}\n${email}`;
  const params = new URLSearchParams({
    subject: subject || "Project inquiry from your portfolio",
    body,
  });
  return `mailto:${to}?${params.toString()}`;
}

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const contact = portfolio.contact;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [touched, setTouched] = useState<Record<FieldKey, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const e: Partial<Record<FieldKey, string>> = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!email.trim()) e.email = "Please enter your email.";
    else if (!isValidEmail(email.trim())) e.email = "That email looks off — double-check it.";
    if (!message.trim()) e.message = "Add a short message so I know what you're reaching out about.";
    else if (message.trim().length < 10)
      e.message = "A few more words would help (10+ characters).";
    else if (message.length > MAX_MESSAGE)
      e.message = `Please keep the message under ${MAX_MESSAGE} characters.`;
    return e;
  }, [name, email, message]);

  const canSubmit =
    Object.keys(errors).length === 0 && message.length <= MAX_MESSAGE;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) {
      setTouched({ name: true, email: true, subject: true, message: true });
      return;
    }
    const href = buildMailto({
      to: contact.email,
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });
    // Use window.location to ensure mail client opens without breaking
    // the back/forward history.
    window.location.href = href;
    setSubmitted(true);
  }

  const messageCount = message.length;

  return (
    <MotionSection id="contact" className="py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              kicker="Contact"
              title={portfolio.contactSection.heading}
              description={portfolio.contactSection.subheading}
            />

            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${contact.email}`}
                className="group block rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all hover:border-accent/30 hover:shadow-[0_0_0_1px_rgba(16,185,129,0.20)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                aria-label={`Email ${contact.email}`}
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-accent/20 bg-accent/10 text-accent"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                      Email
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-50 break-all">
                      {contact.email}
                    </p>
                  </div>
                </div>
              </a>

              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="group block rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all hover:border-accent/30 hover:shadow-[0_0_0_1px_rgba(16,185,129,0.20)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                aria-label={`Call ${contact.phone}`}
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-accent/20 bg-accent/10 text-accent"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.35 1.84.59 2.8.72A2 2 0 0 1 22 16.92Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                      Phone
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-50">
                      {contact.phone}
                    </p>
                  </div>
                </div>
              </a>

              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href={`https://${contact.linkedInUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open LinkedIn (opens in a new tab)"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-accent/40 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href={`https://${contact.gitHubUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open GitHub (opens in a new tab)"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-accent/40 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.6-1.3-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.5-.3-5.2-1.3-5.2-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.4-5.2 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="surface-card p-6 sm:p-7">
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted"
                    >
                      Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground-subtle focus-visible:border-accent/50 focus-visible:bg-black/30 focus-visible:ring-2 focus-visible:ring-accent/70"
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.name && touched.name)}
                      aria-describedby={errors.name && touched.name ? "contact-name-err" : undefined}
                    />
                    {errors.name && touched.name ? (
                      <p id="contact-name-err" className="mt-2 text-sm text-red-400">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted"
                    >
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground-subtle focus-visible:border-accent/50 focus-visible:bg-black/30 focus-visible:ring-2 focus-visible:ring-accent/70"
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email && touched.email)}
                      aria-describedby={errors.email && touched.email ? "contact-email-err" : undefined}
                    />
                    {errors.email && touched.email ? (
                      <p id="contact-email-err" className="mt-2 text-sm text-red-400">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted"
                  >
                    Subject
                    <span className="ml-1 text-foreground-subtle normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, subject: true }))}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground-subtle focus-visible:border-accent/50 focus-visible:bg-black/30 focus-visible:ring-2 focus-visible:ring-accent/70"
                    placeholder="Project, role, or quick question"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="contact-message"
                      className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted"
                    >
                      Message <span className="text-accent">*</span>
                    </label>
                    <span
                      className={[
                        "text-[11px] tabular-nums",
                        messageCount > MAX_MESSAGE
                          ? "text-red-400"
                          : "text-foreground-subtle",
                      ].join(" ")}
                    >
                      {messageCount}/{MAX_MESSAGE}
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    rows={6}
                    className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground-subtle focus-visible:border-accent/50 focus-visible:bg-black/30 focus-visible:ring-2 focus-visible:ring-accent/70"
                    placeholder="Tell me about your project, role, or question…"
                    aria-invalid={Boolean(errors.message && touched.message)}
                    aria-describedby={errors.message && touched.message ? "contact-message-err" : undefined}
                  />
                  {errors.message && touched.message ? (
                    <p id="contact-message-err" className="mt-2 text-sm text-red-400">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                {submitted ? (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent"
                    role="status"
                    aria-live="polite"
                  >
                    Opening your email client now. If it did not open, copy your message and email{" "}
                    <a className="underline underline-offset-4" href={`mailto:${contact.email}`}>
                      {contact.email}
                    </a>
                    .
                  </motion.div>
                ) : null}

                <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-foreground-muted">
                    Submitting opens your email app — no data is stored on a server.
                  </p>

                  <Button type="submit" disabled={!canSubmit} aria-label="Send message via email">
                    Send via Email
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden
                    >
                      <path d="M5 12h14" />
                      <path d="m13 5 7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}
