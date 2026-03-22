import { DATA } from "@/data/resume";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const runtime = "nodejs";

const resumeContext = [
  `Name: ${DATA.name}`,
  `Role: ${DATA.description}`,
  `Location: ${DATA.location}`,
  `Website: ${DATA.url}`,
  `Summary: ${DATA.summary}`,
  "",
  "Contact:",
  `- Email: ${DATA.contact.email}`,
  `- Phone: ${DATA.contact.tel}`,
  ...Object.values(DATA.contact.social).map(
    (social) => `- ${social.name}: ${social.url}`
  ),
  "",
  "Skills:",
  ...DATA.skills.map((skill) => `- ${skill.name}`),
  "",
  "Work Experience:",
  ...DATA.work.flatMap((job) => [
    `- ${job.title} at ${job.company} (${job.start} - ${job.end})`,
    ...job.description.map((line) => `  - ${line}`),
  ]),
  "",
  "Education:",
  ...DATA.education.map(
    (edu) =>
      `- ${edu.degree} at ${edu.school} (${edu.start} - ${edu.end}) | ${edu.href}`
  ),
  "",
  "Projects:",
  ...DATA.projects.flatMap((project) => [
    `- ${project.title} (${project.dates})`,
    `  - Link: ${project.href}`,
    `  - Description: ${project.description}`,
    `  - Tech: ${project.technologies.join(", ")}`,
  ]),
].join("\n");

export async function POST(request: Request) {
  const { messages } = (await request.json()) as { messages: UIMessage[] };

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = streamText({
    model: openrouter("openai/gpt-5-mini:online"),
    system:
      "You are Matthew Wang's portfolio assistant. Answer questions about Matthew using only the resume context below. " +
      "If the user asks something not covered in the resume context, say you do not have that information and ask a brief follow-up question. " +
      "Keep responses concise, factual, and helpful.\n\n" +
      resumeContext,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
