import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Java } from "@/components/ui/svgs/java";

export const DATA = {
  name: "Matthew Wang",
  initials: "MW",
  url: "https://www.mattwang.dev/",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description: "Co-Founder & CEO at MCPJam",
  summary:
    "Co-Founder and CEO at MCPJam, where I lead a small team building open-source developer tooling for MCP servers and ChatGPT apps. Previously I was a Software Engineer at Asana (after interning there), and also interned at PIMCO and Bandwidth. I studied Computer Science and Economics at Duke University.",
  avatarUrl: "/me2.jpeg",
  skills: [
    { name: "TypeScript", icon: Typescript },
    { name: "Java", icon: Java },
    { name: "Python", icon: Python },
    { name: "JavaScript", icon: null },
    { name: "Node.js", icon: Nodejs },
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "React Native", icon: null },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "GraphQL", icon: null },
    { name: "SQL", icon: null },
    { name: "Docker", icon: null },
    { name: "Kubernetes", icon: null },
    { name: "Hono", icon: null },
    { name: "Vite", icon: null },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "matt8p@outlook.com",
    tel: "+14805678238",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/matteo8p",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/matt8p/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:matt8p@outlook.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "MCPJam",
      badges: [],
      href: "https://github.com/MCPJam",
      location: "San Francisco, CA",
      title: "Co-Founder, CEO",
      logoUrl: "/mcpjam.png",
      start: "September 2025",
      end: "Present",
      description: [
        "Led a team of three building open-source tooling for MCP servers and ChatGPT apps.",
        "Grew MCPJam to 1.7k GitHub stars, 1,400 weekly active users, and 51 external contributors.",
        "Built products with Vite, Hono.js, MCP TypeScript SDK, and Vercel AI SDK; published an SDK for MCP server agentic evals and contributed upstream to MCP SDKs.",
        "Drove design partnerships with teams at Asana, HeyGen, Glean, and Zillow, wrote technical blog content, built a local emulator for ChatGPT apps and MCP apps, and led fundraising to close a $1M pre-seed round from Open Core Ventures.",
      ],
    },
    {
      company: "Asana",
      badges: [],
      href: "https://asana.com/",
      location: "San Francisco, CA",
      title: "Software Engineer",
      logoUrl: "/asana.png",
      start: "July 2023",
      end: "August 2025",
      description: [
        "Software Engineer 2 on the Collaborative Actions team building product features in React, TypeScript, and GraphQL, with backend work on cron jobs, public APIs, and server-side functions.",
        "Led feature development in Asana's request access framework, including data model design, inbox and email notifications, and mobile/public APIs, contributing to a 19% increase in access requests.",
        "Owned invite spam prevention by designing a Redis-based spam detection and rate-limiting system that prevented roughly 12,000 potential spam emails in 2024.",
        "Served in the web app on-call rotation for deployment lifecycle reliability.",
      ],
    },
    {
      company: "Asana",
      badges: [],
      href: "https://asana.com/",
      location: "San Francisco, CA",
      title: "Software Engineer Intern",
      logoUrl: "/asana.png",
      start: "May 2022",
      end: "August 2022",
      description: [
        "Joined the Collaborative Actions team after accepting a return offer.",
        "Led the onboarding request-access flow project, working across Asana's access-control data model, action/audit logging, localization, and LunaDB reactivity systems.",
        "Designed and built React UI components for admin settings functionality used by Asana's largest customer.",
      ],
    },
    {
      company: "PIMCO",
      href: "https://www.pimco.com/us/en/",
      badges: [],
      location: "Newport Beach, CA",
      title: "Software Engineer Intern",
      logoUrl: "/pimco.png",
      start: "May 2021",
      end: "August 2021",
      description: [
        "Designed and deployed messaging software that provided Bloomberg real-time quotes and Forex capabilities for portfolio managers and quant analysts.",
        "Built solutions using Python, AWS S3, Slack API, and Bloomberg API.",
      ],
    },
    {
      company: "Bandwidth",
      href: "https://www.bandwidth.com/",
      badges: [],
      location: "Raleigh, NC",
      title: "Software Engineer Intern",
      logoUrl: "/bandwidth.png",
      start: "May 2020",
      end: "December 2020",
      description: [
        "Built GitHub Action checkers with Node.js and GitHub REST APIs.",
        "Wrote unit tests with Mocha.",
        "Built a Slack bot that sent daily status messages using Node.js and the Slack API hosted on AWS EC2.",
      ],
    },
  ],
  education: [
    {
      school: "Duke University",
      href: "https://duke.edu/",
      degree: "B.S. in Computer Science & Economics",
      logoUrl: "/duke.png",
      start: "2019",
      end: "2023",
    },
  ],
  projects: [
    {
      title: "Open Chat Widget",
      href: "https://github.com/Open-Chat-Widget/openchatwidget",
      dates: "2026 - Present",
      active: true,
      description:
        "Built an embeddable, customizable chat widget for websites with a modern developer workflow. Focused on easy integration, flexible theming, and production-ready chat UX.",
      technologies: ["TypeScript", "React", "Next.js", "Vite"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Open-Chat-Widget/openchatwidget",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/open_chat_widget_banner.png",
      video: "",
    },
    {
      title: "Sip Cocktails",
      href: "https://www.sipcocktailsapp.com/",
      dates: "August 2024 - Present",
      active: true,
      description:
        "Launched a mobile app in React Native, PostgreSQL/Supabase, and Next.js. Released on the App Store and Play Store. Built Figma design mockups and ran growth efforts across ad campaigns, SEO/ASO, TikTok content, and UGC creators. The app has generated about $1,100 MRR on average since launch.",
      technologies: [
        "React Native",
        "Expo",
        "Next.js",
        "Supabase",
        "PostgreSQL",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.sipcocktailsapp.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/sipcocktails.png",
      video: "",
    },
  ],
  hackathons: [],
} as const;
