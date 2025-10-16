import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CVZbsiOP.mjs';
import { L as LinkedInIcon, I as InstagramIcon, a as GitHubIcon, $ as $$MainLayout } from '../chunks/MainLayout_BQqTk3O_.mjs';
import { $ as $$PageHero } from '../chunks/PageHero_C7aH2BBJ.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { d as cn, C as Card, a as CardHeader, b as CardTitle, c as CardContent } from '../chunks/card_D2wKyJ59.mjs';
import { B as Button } from '../chunks/button_BBjbKaKr.mjs';
export { renderers } from '../renderers.mjs';

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-11 w-full rounded-lg border border-input bg-transparent px-4 py-3 text-base shadow-sm transition-colors",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[120px] w-full rounded-lg border border-input bg-transparent px-4 py-3 text-base shadow-sm",
        "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";

function Form({
  form,
  className = "",
  onSubmit,
  children,
  "data-testid": dataTestId
}) {
  return /* @__PURE__ */ jsx("form", { onSubmit: form.handleSubmit(onSubmit), className, noValidate: true, "data-testid": dataTestId, children });
}
function FormItem({ className = "", ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("space-y-2", className), ...props });
}
function FormLabel({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      className: cn(
        "text-sm font-medium text-neon-lime/90",
        "block mb-1",
        className
      ),
      ...props
    }
  );
}
function FormControl({ className = "", ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("grid w-full items-center", className), ...props });
}
function FormMessage({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "p",
    {
      className: cn(
        "text-sm text-destructive mt-1",
        className
      ),
      role: "alert",
      "aria-live": "polite",
      ...props
    }
  );
}

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }).max(60),
  lastName: z.string().min(1, { message: "Last Name is required" }).max(60),
  email: z.string().email({ message: "Invalid email address" }).max(254),
  message: z.string().min(1, { message: "Message is required" }).max(5e3),
  honeypot: z.string().optional()
});
function ContactForm() {
  const [status, setStatus] = React.useState("idle");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: "", lastName: "", email: "", message: "", honeypot: "" },
    mode: "onBlur"
  });
  const onSubmit = async (values) => {
    if (values.honeypot && values.honeypot.trim().length > 0) {
      setStatus("success");
      form.reset();
      return;
    }
    try {
      setStatus("idle");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          message: values.message
        })
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };
  return /* @__PURE__ */ jsxs(Card, { className: "border border-primary/30 bg-card/40 backdrop-blur-sm animate-fade-in", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-2xl font-orbitron font-bold text-primary flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "text-2xl", role: "img", "aria-label": "Email", children: "✉️" }),
      "Send Message"
    ] }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Form, { form, onSubmit, className: "space-y-6", "data-testid": "contact-form", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxs(FormLabel, { htmlFor: "firstName", children: [
            "First Name ",
            /* @__PURE__ */ jsx("span", { className: "text-neon-lime", "aria-label": "required", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
            Input,
            {
              id: "firstName",
              inputMode: "text",
              autoCapitalize: "words",
              autoComplete: "given-name",
              maxLength: 60,
              placeholder: "Your first name",
              "aria-describedby": "firstName-error",
              "aria-invalid": !!form.formState.errors.firstName,
              disabled: form.formState.isSubmitting,
              "data-testid": "first-name-input",
              ...form.register("firstName")
            }
          ) }),
          /* @__PURE__ */ jsx(FormMessage, { id: "firstName-error", "data-testid": "form-field-first-name-error", children: form.formState.errors.firstName?.message })
        ] }),
        /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxs(FormLabel, { htmlFor: "lastName", children: [
            "Last Name ",
            /* @__PURE__ */ jsx("span", { className: "text-neon-lime", "aria-label": "required", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
            Input,
            {
              id: "lastName",
              inputMode: "text",
              autoCapitalize: "words",
              autoComplete: "family-name",
              maxLength: 60,
              placeholder: "Your last name",
              "aria-describedby": "lastName-error",
              "aria-invalid": !!form.formState.errors.lastName,
              disabled: form.formState.isSubmitting,
              "data-testid": "last-name-input",
              ...form.register("lastName")
            }
          ) }),
          /* @__PURE__ */ jsx(FormMessage, { id: "lastName-error", "data-testid": "form-field-last-name-error", children: form.formState.errors.lastName?.message })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(FormItem, { children: [
        /* @__PURE__ */ jsxs(FormLabel, { htmlFor: "email", children: [
          "Email ",
          /* @__PURE__ */ jsx("span", { className: "text-neon-lime", "aria-label": "required", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
          Input,
          {
            id: "email",
            type: "email",
            inputMode: "email",
            autoComplete: "email",
            maxLength: 254,
            placeholder: "your.email@example.com",
            "aria-describedby": "email-error",
            "aria-invalid": !!form.formState.errors.email,
            disabled: form.formState.isSubmitting,
            "data-testid": "email-input",
            ...form.register("email")
          }
        ) }),
        /* @__PURE__ */ jsx(FormMessage, { id: "email-error", "data-testid": "form-field-email-error", children: form.formState.errors.email?.message })
      ] }),
      /* @__PURE__ */ jsxs(FormItem, { children: [
        /* @__PURE__ */ jsxs(FormLabel, { htmlFor: "message", children: [
          "Message ",
          /* @__PURE__ */ jsx("span", { className: "text-neon-lime", "aria-label": "required", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
          Textarea,
          {
            id: "message",
            rows: 8,
            maxLength: 5e3,
            autoComplete: "off",
            placeholder: "Tell me about your project or inquiry...",
            "aria-describedby": "message-error",
            "aria-invalid": !!form.formState.errors.message,
            className: "resize-none min-h-[180px]",
            disabled: form.formState.isSubmitting,
            "data-testid": "message-textarea",
            ...form.register("message")
          }
        ) }),
        /* @__PURE__ */ jsx(FormMessage, { id: "message-error", "data-testid": "form-field-message-error", children: form.formState.errors.message?.message })
      ] }),
      /* @__PURE__ */ jsx("input", { type: "hidden", "aria-hidden": "true", tabIndex: -1, "data-testid": "honeypot-input", ...form.register("honeypot") }),
      /* @__PURE__ */ jsxs("div", { role: "alert", "aria-live": "polite", className: "mt-2", children: [
        status === "success" && /* @__PURE__ */ jsx("div", { className: "text-digital-emerald bg-digital-emerald/10 border border-digital-emerald/20 p-4 rounded-lg", "data-testid": "contact-success", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xl", role: "img", "aria-label": "Success", children: "✅" }),
          /* @__PURE__ */ jsx("span", { children: "Message sent successfully! I'll get back to you within 24-48 hours." })
        ] }) }),
        status === "error" && /* @__PURE__ */ jsx("div", { className: "text-destructive bg-destructive/10 border border-destructive/25 p-4 rounded-lg", "data-testid": "contact-error", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xl", role: "img", "aria-label": "Error", children: "❌" }),
          /* @__PURE__ */ jsx("span", { children: "There was an error sending your message. Please try again or contact me directly." })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          type: "submit",
          className: "w-full text-lg py-4 relative overflow-hidden group bg-muted border border-primary/40 rounded-lg text-primary hover:border-primary hover:shadow-neon transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 mt-8",
          "aria-label": "Send message",
          "aria-busy": form.formState.isSubmitting,
          disabled: form.formState.isSubmitting,
          "data-testid": "contact-submit",
          children: [
            /* @__PURE__ */ jsx("span", { className: "relative z-10", children: "🚀 Send Message" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-neon-lime to-digital-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-300", "aria-hidden": "true" })
          ]
        }
      )
    ] }) })
  ] });
}

function RowContainer({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "flex items-start space-x-4", children });
}
function ServiceRow({ icon, title, description }) {
  return /* @__PURE__ */ jsxs(RowContainer, { children: [
    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-neon-lime/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1", "aria-hidden": "true", children: icon }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "font-orbitron font-bold text-neon-lime mb-1", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-neon-lime/60 text-sm", children: description })
    ] })
  ] });
}
function ContactRow({ icon, label, href, className = "", titleClassName = "text-neon-lime/90" }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-neon-lime/20 rounded-lg flex items-center justify-center", "aria-hidden": "true", children: icon }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: `font-orbitron font-bold ${titleClassName}`, children: label }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href,
          target: href.startsWith("http") ? "_blank" : void 0,
          rel: href.startsWith("http") ? "noopener noreferrer" : void 0,
          className: `${className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-blue/60 rounded`,
          children: [
            href.replace("mailto:", ""),
            href.startsWith("http") && /* @__PURE__ */ jsx("span", { className: "sr-only", children: "(opens in new tab)" })
          ]
        }
      )
    ] })
  ] });
}
function ContactCards() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 h-full", children: [
    /* @__PURE__ */ jsxs(Card, { className: "border border-secondary/40 bg-card/40 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-2xl font-orbitron font-bold text-secondary flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl", role: "img", "aria-label": "Services", children: "💼" }),
        "Services"
      ] }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(ServiceRow, { icon: /* @__PURE__ */ jsx("span", { className: "text-lg", role: "img", "aria-label": "QA Automation", children: "🤖" }), title: "QA Automation", description: "Java, Selenium, Playwright testing for European Commission projects" }),
        /* @__PURE__ */ jsxs(RowContainer, { children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-digital-emerald/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1", "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { className: "text-lg", role: "img", "aria-label": "Full-Stack Development", children: "💻" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-orbitron font-bold text-digital-emerald mb-1", children: "Full-Stack Development" }),
            /* @__PURE__ */ jsx("p", { className: "text-digital-emerald/60 text-sm", children: "React, Next.js, Node.js applications and product development" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(RowContainer, { children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-neon-lime/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1", "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { className: "text-lg", role: "img", "aria-label": "Creative Commissions", children: "🎨" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-orbitron font-bold text-neon-lime mb-1", children: "Creative Commissions" }),
            /* @__PURE__ */ jsx("p", { className: "text-neon-lime/60 text-sm", children: "AI-generated art, album covers, event posters, fashion designs" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "border border-primary/30 bg-card/40 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-2xl font-orbitron font-bold text-primary flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl", role: "img", "aria-label": "Get in touch", children: "📞" }),
        "Get In Touch"
      ] }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(
          ContactRow,
          {
            icon: /* @__PURE__ */ jsx("span", { className: "text-xl", role: "img", "aria-label": "Email", children: "✉️" }),
            label: "Email",
            href: "mailto:b.politiadis@gmail.com",
            className: "text-neon-lime hover:text-cyan-blue transition-all duration-300",
            titleClassName: "text-neon-lime/90"
          }
        ),
        /* @__PURE__ */ jsx(
          ContactRow,
          {
            icon: /* @__PURE__ */ jsx(LinkedInIcon, { size: "sm", className: "text-digital-emerald" }),
            label: "LinkedIn",
            href: "https://linkedin.com/in/vpoliteiadis",
            className: "text-digital-emerald hover:text-cyan-blue transition-all duration-300",
            titleClassName: "text-digital-emerald/90"
          }
        ),
        /* @__PURE__ */ jsx(
          ContactRow,
          {
            icon: /* @__PURE__ */ jsx(InstagramIcon, { size: "sm", className: "text-neon-lime" }),
            label: "Instagram",
            href: "https://instagram.com/arte.imaginari",
            className: "text-neon-lime hover:text-cyan-blue transition-all duration-300",
            titleClassName: "text-neon-lime/90"
          }
        ),
        /* @__PURE__ */ jsx(
          ContactRow,
          {
            icon: /* @__PURE__ */ jsx(GitHubIcon, { size: "sm", className: "text-digital-emerald" }),
            label: "GitHub",
            href: "https://github.com/bpolitiadis",
            className: "text-digital-emerald hover:text-cyan-blue transition-all duration-300",
            titleClassName: "text-digital-emerald/90"
          }
        )
      ] })
    ] })
  ] });
}

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Contact - Vasileios Politeiadis", "description": "Get in touch with Vasileios Politeiadis for collaboration opportunities, project inquiries, or creative commissions.", "currentPath": "/contact", "bgSlug": "contact-bg", "bgEager": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative" data-testid="page-contact"> ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Contact", "description": "Let's collaborate on your next project or discuss creative opportunities", "eager": true })} <!-- Contact Content --> <section class="pt-6 md:pt-8 pb-12 md:pb-16" data-testid="contact-main-content"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mb-10"> <!-- shadcn/react form island --> ${renderComponent($$result2, "ContactForm", ContactForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/vpoliteiadis/workspace/vpoliteiadis/src/components/contact/ContactForm", "client:component-export": "default" })} <!-- Right column cards (static markup preserved) --> ${renderComponent($$result2, "ContactCards", ContactCards, {})} </div> </div> </section> </div> ` })}`;
}, "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/contact.astro", void 0);

const $$file = "/Users/vpoliteiadis/workspace/vpoliteiadis/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
