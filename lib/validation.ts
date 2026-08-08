import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Please share your name").max(100),
  email: z.string().email("That email doesn't look right"),
  company: z.string().max(120).optional().or(z.literal("")),
  services: z.array(z.string()).min(1, "Pick at least one service"),
  budget: z.enum(["<₹5L", "₹5-15L", "₹15-50L", "₹50L+", "Not sure"]),
  timeline: z.enum(["ASAP", "1-3 months", "3-6 months", "Exploring"]),
  message: z.string().min(10, "A bit more detail helps us help you").max(2000),
  // honeypot — bots fill this, humans don't
  website: z.string().max(0).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
