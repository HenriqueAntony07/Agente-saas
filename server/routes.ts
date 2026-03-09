import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
// import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { z } from "zod";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  logout
} from "./auth";

app.post("/api/auth/register", registerUser);

app.post("/api/auth/login", loginUser);

app.get("/api/auth/user", getCurrentUser);

app.post("/api/auth/logout", logout);

async function seedDatabase() {
  const existingPlans = await storage.getPlans();
  if (existingPlans.length === 0) {
    await storage.createPlan({
      name: "Starter",
      price: 9900,
      description: "Ideal para pequenas empresas que querem começar a automatizar o atendimento.",
      features: [
        "1 número WhatsApp",
        "500 mensagens/mês",
        "Bot com respostas automáticas",
        "Painel básico de métricas",
        "Suporte por e-mail",
      ],
      highlighted: false,
      order: 1,
    });
    await storage.createPlan({
      name: "Profissional",
      price: 19900,
      description: "Para empresas em crescimento que precisam de mais automação e inteligência.",
      features: [
        "3 números WhatsApp",
        "5.000 mensagens/mês",
        "IA com respostas inteligentes",
        "Integração com n8n avançada",
        "Multi-atendentes (até 5)",
        "Relatórios detalhados",
        "Suporte prioritário",
      ],
      highlighted: true,
      order: 2,
    });
    await storage.createPlan({
      name: "Enterprise",
      price: 49900,
      description: "Solução completa para grandes operações com atendimento em escala.",
      features: [
        "Números ilimitados",
        "Mensagens ilimitadas",
        "IA personalizada com seu tom de voz",
        "Fluxos n8n customizados",
        "Multi-atendentes ilimitados",
        "API dedicada",
        "Gerente de conta exclusivo",
        "SLA garantido",
      ],
      highlighted: false,
      order: 3,
    });
  }

  const existingTestimonials = await storage.getTestimonials();
  if (existingTestimonials.length === 0) {
    await storage.createTestimonial({
      name: "Carlos Silva",
      company: "TechStore Brasil",
      role: "CEO",
      content: "Depois de implementar o bot, nosso tempo de resposta caiu de 2 horas para 30 segundos. As vendas pelo WhatsApp aumentaram 45% no primeiro mês.",
    });
    await storage.createTestimonial({
      name: "Ana Rodrigues",
      company: "Clínica Saúde+",
      role: "Diretora Administrativa",
      content: "O agendamento automático pelo WhatsApp revolucionou nossa clínica. Reduzimos em 70% as faltas de pacientes com os lembretes automáticos.",
    });
    await storage.createTestimonial({
      name: "Pedro Santos",
      company: "Delivery Express",
      role: "Gerente de Operações",
      content: "A integração com n8n nos permitiu automatizar todo o fluxo de pedidos. O bot responde, confirma e encaminha os pedidos sem intervenção humana.",
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
 // await setupAuth(app);
// registerAuthRoutes(app);

  app.get("/api/plans", async (_req, res) => {
    const plans = await storage.getPlans();
    res.json(plans);
  });

  app.get("/api/testimonials", async (_req, res) => {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const input = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(input);
      res.status(201).json(lead);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  await seedDatabase();

  return httpServer;
}
