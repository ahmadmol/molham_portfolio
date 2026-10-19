"use client";

import React, { useMemo, useState } from "react";
import Container from "../ui/Container";
import MotionSection from "../ui/MotionSection";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { portfolio } from "@/data/portfolio";
import { toAbsoluteUrl } from "@/lib/url";

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
  const subjectValue = subject || "Mobile development inquiry";
  return `mailto:${to}?subject=${encodeURIComponent(subjectValue)}&body=${encodeURIComponent(body)}`;
}

const fieldClass = "field";

export default function Contact() {
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
  const [mailOpened, setMailOpened] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [draftUrl, setDraftUrl] = useState("");

  const errors = useMemo(() => {
    const next: Partial<Record<FieldKey, string>> = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!isValidEmail(email.trim()))
      next.email = "That email looks off — double-check it.";
    if (!message.trim())
      next.message =
        "Add a short message so I know what you're reaching out about.";
    else if (message.trim().length < 10)
      next.message = "A few more words would help (10+ characters).";
    else if (message.length > MAX_MESSAGE)
      next.message = `Please keep the message under ${MAX_MESSAGE} characters.`;
    return next;
  }, [name, email, message]);

  const canSubmit =
    Object.keys(errors).length === 0 && message.length <= MAX_MESSAGE;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) {
      setTouched({ name: true, email: true, subject: true, message: true });
      const first = (["name", "email", "message"] as const).find(
        (key) => errors[key],
      );
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    const draft = buildMailto({
      to: contact.email,
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });
    setDraftUrl(draft);
    window.location.href = draft;
    setMailOpened(true);
  }

  return (
    <MotionSection id="contact" className="section-space">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              {...portfolio.sections.contact}
              description={portfolio.contactSection.subheading}
            />

            <ul className="mt-8 space-y-3">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="block rounded-lg border border-white/10 px-4 py-3 transition-colors hover:border-accent/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-subtle">
                    Email
                  </span>
                  <span className="mt-1 block break-all text-sm font-medium text-foreground">
                    {contact.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={toAbsoluteUrl(contact.linkedInUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn ${contact.linkedInUrl} (opens in a new tab)`}
                  className="block rounded-lg border border-white/10 px-4 py-3 transition-colors hover:border-accent/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-subtle">
                    LinkedIn
                  </span>
                  <span className="mt-1 block break-all text-sm font-medium text-foreground">
                    {contact.linkedInUrl}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={toAbsoluteUrl(contact.gitHubUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub ${contact.gitHubUrl} (opens in a new tab)`}
                  className="block rounded-lg border border-white/10 px-4 py-3 transition-colors hover:border-accent/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-subtle">
                    GitHub
                  </span>
                  <span className="mt-1 block break-all text-sm font-medium text-foreground">
                    {contact.gitHubUrl}
                  </span>
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm text-foreground-muted">
              Phone:{" "}
              <a
                className="profile-link text-foreground underline-offset-4 hover:underline"
                href={`tel:${contact.phoneHref}`}
              >
                {contact.phone}
              </a>
            </p>
            <button
              type="button"
              className="button-link button-secondary mt-4"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(contact.email);
                  setCopyStatus("Email address copied.");
                } catch {
                  setCopyStatus(`Copy this address: ${contact.email}`);
                }
              }}
            >
              Copy email address
            </button>
            <p role="status" className="mt-3 text-sm text-foreground-muted">
              {copyStatus}
            </p>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Prepare an email draft"
              className="surface-card space-y-4 p-6 sm:p-7"
            >
              <h3 className="text-xl font-semibold">
                {portfolio.contactSection.formTitle}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-medium text-foreground-muted"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    maxLength={100}
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    onBlur={() =>
                      setTouched((current) => ({ ...current, name: true }))
                    }
                    className={fieldClass}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name && touched.name)}
                    aria-describedby={
                      errors.name && touched.name
                        ? "contact-name-err"
                        : undefined
                    }
                  />
                  {errors.name && touched.name ? (
                    <p
                      id="contact-name-err"
                      className="mt-2 text-sm text-danger"
                    >
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-medium text-foreground-muted"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    onBlur={() =>
                      setTouched((current) => ({ ...current, email: true }))
                    }
                    className={fieldClass}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email && touched.email)}
                    aria-describedby={
                      errors.email && touched.email
                        ? "contact-email-err"
                        : undefined
                    }
                  />
                  {errors.email && touched.email ? (
                    <p
                      id="contact-email-err"
                      className="mt-2 text-sm text-danger"
                    >
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="text-xs font-medium text-foreground-muted"
                >
                  Subject{" "}
                  <span className="text-foreground-subtle">(optional)</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  maxLength={160}
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className={fieldClass}
                  placeholder="Role or project"
                />
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-medium text-foreground-muted"
                  >
                    Message
                  </label>
                  <span
                    className={
                      message.length > MAX_MESSAGE
                        ? "text-xs text-danger"
                        : "text-xs text-foreground-subtle"
                    }
                  >
                    {message.length}/{MAX_MESSAGE}
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  required
                  maxLength={MAX_MESSAGE}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onBlur={() =>
                    setTouched((current) => ({ ...current, message: true }))
                  }
                  rows={6}
                  className={`${fieldClass} resize-y`}
                  placeholder="Tell me about the role or product."
                  aria-invalid={Boolean(errors.message && touched.message)}
                  aria-describedby={
                    errors.message && touched.message
                      ? "contact-message-err"
                      : undefined
                  }
                />
                {errors.message && touched.message ? (
                  <p
                    id="contact-message-err"
                    className="mt-2 text-sm text-danger"
                  >
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-relaxed text-foreground-muted">
                  {portfolio.contactSection.draftHint}
                </p>
                <Button type="submit" className="shrink-0">
                  Open email draft
                </Button>
              </div>

              {mailOpened ? (
                <p
                  role="status"
                  aria-live="polite"
                  className="text-sm text-foreground-muted"
                >
                  Your email app should open with a draft. If it did not, email{" "}
                  <a
                    className="text-foreground underline underline-offset-4"
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </a>
                  .
                  {draftUrl && (
                    <a href={draftUrl} className="ml-2 underline">
                      Reopen prepared draft
                    </a>
                  )}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}
