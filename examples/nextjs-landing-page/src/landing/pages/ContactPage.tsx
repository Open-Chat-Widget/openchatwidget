"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  message: "",
};

const inputClassName =
  "w-full rounded-none border border-[#222222] bg-white px-4 py-3 text-base font-medium text-[#111111] outline-none placeholder:font-normal placeholder:text-[#555555] focus:ring-0";

const primaryButtonClass =
  "inline-flex min-h-[52px] cursor-pointer items-center justify-center whitespace-nowrap rounded-none border-2 border-[#111111] bg-[#111111] px-8 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90";

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setValues((current) => ({
      ...current,
      email: searchParams.get("email") ?? current.email,
    }));
  }, [searchParams]);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as keyof ContactFormValues;
    const { value } = event.target;

    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    if (isSubmitted) {
      setIsSubmitted(false);
    }
    if (submitError) {
      setSubmitError(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 500);
    });

    setIsSubmitted(true);
    setValues(initialValues);
    setIsSubmitting(false);
  }

  return (
    <div className="grid min-h-[calc(100vh-140px)] place-items-center">
      <section
        className="reveal mx-auto w-full max-w-3xl bg-white px-2 py-8 text-center sm:px-6 sm:py-12"
        style={{ animationDelay: "40ms" }}
      >
        <h1 className="mx-auto m-0 max-w-[24ch] text-[clamp(2.1rem,5.6vw,3.3rem)] leading-tight tracking-[-0.03em] text-[#111111]">
          See demo
        </h1>
        <form className="mx-auto mt-8 grid w-full max-w-2xl gap-3 text-left" onSubmit={handleSubmit}>
          <label className="grid gap-1.5 text-sm font-semibold text-[#111111]" htmlFor="email">
            Email
            <input
              autoComplete="email"
              className={inputClassName}
              id="email"
              name="email"
              onChange={handleChange}
              required
              type="email"
              value={values.email}
            />
          </label>

          <label className="grid gap-1.5 text-sm font-semibold text-[#111111]" htmlFor="name">
            Full name
            <input
              autoComplete="name"
              className={inputClassName}
              id="name"
              name="name"
              onChange={handleChange}
              required
              type="text"
              value={values.name}
            />
          </label>

          <label className="grid gap-1.5 text-sm font-semibold text-[#111111]" htmlFor="company">
            Company
            <input
              className={inputClassName}
              id="company"
              name="company"
              onChange={handleChange}
              required
              type="text"
              value={values.company}
            />
          </label>

          <label className="grid gap-1.5 text-sm font-semibold text-[#111111]" htmlFor="message">
            Message
            <textarea
              className={`${inputClassName} min-h-[132px] resize-y`}
              id="message"
              name="message"
              onChange={handleChange}
              rows={5}
              value={values.message}
            />
          </label>

          <button
            className={`${primaryButtonClass} disabled:cursor-not-allowed disabled:opacity-60`}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <p className="m-0 text-sm text-[#444444]">We'll get back to you same day.</p>
          {submitError ? (
            <p className="m-0 text-sm font-semibold text-[#b42318]" role="status">
              {submitError}
            </p>
          ) : null}
          {isSubmitted ? (
            <p className="m-0 text-sm font-semibold text-[#111111]" role="status">
              Thanks. Your request was received.
            </p>
          ) : null}
        </form>
      </section>
    </div>
  );
}
