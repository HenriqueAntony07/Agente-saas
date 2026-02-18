import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertLeadSchema } from "@shared/schema";
import type { Plan, Testimonial } from "@shared/schema";
import {
  Clock,
  Workflow,
  Brain,
  BarChart3,
  Users,
  Palette,
  Check,
  MessageCircle,
  ArrowRight,
  Star,
  Phone,
  Mail,
  Building2,
  Send,
  Bot,
  Zap,
  Shield,
} from "lucide-react";
import { z } from "zod";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
};

const features = [
  { icon: Clock, title: "Atendimento 24/7", description: "Seu bot nunca dorme. Atenda clientes a qualquer hora, todos os dias da semana, sem interrupções." },
  { icon: Workflow, title: "Integração com n8n", description: "Conecte seu WhatsApp a centenas de ferramentas e automatize fluxos de trabalho complexos." },
  { icon: Brain, title: "Respostas Inteligentes com IA", description: "Inteligência artificial que entende contexto e responde de forma natural e precisa." },
  { icon: BarChart3, title: "Relatórios e Métricas", description: "Acompanhe métricas de atendimento, satisfação e performance em tempo real." },
  { icon: Users, title: "Multi-atendentes", description: "Distribua conversas entre sua equipe de forma inteligente e organizada." },
  { icon: Palette, title: "Personalização Total", description: "Configure respostas, fluxos e comportamentos sob medida para o seu negócio." },
];

function formatPrice(cents: number): string {
  const reais = cents / 100;
  return reais.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const contactFormSchema = insertLeadSchema.extend({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(8, "Telefone inválido"),
  company: z.string().min(2, "Nome da empresa é obrigatório"),
});

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(142_70%_45%_/_0.15),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(142_70%_45%_/_0.1),_transparent_50%)]" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            <Bot className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-300 font-medium">Powered by n8n + IA</span>
          </div>
        </motion.div>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          data-testid="text-hero-title"
        >
          Automatize seu Atendimento no{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">
            WhatsApp
          </span>
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          data-testid="text-hero-subtitle"
        >
          Bots inteligentes com IA para o seu negócio. Atendimento automático, integração com n8n
          e respostas personalizadas que convertem leads em clientes.
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button size="lg" asChild data-testid="button-hero-contact">
            <a href="#contato">
              <MessageCircle className="w-5 h-5 mr-2" />
              Fale Conosco
            </a>
          </Button>
          <Button size="lg" variant="outline" className="backdrop-blur-sm bg-white/5" asChild data-testid="button-hero-login">
            <a href="/api/login">
              Entrar
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </motion.div>
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-sm">Setup em minutos</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-sm">Dados seguros</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-sm">Suporte 24/7</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-20 sm:py-24 bg-background" id="funcionalidades" data-testid="section-features">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-features-title">
            Tudo que você precisa para automatizar
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Recursos poderosos para transformar seu atendimento via WhatsApp com inteligência artificial e automação.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="h-full hover-elevate" data-testid={`card-feature-${index}`}>
                <CardHeader>
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlansSection() {
  const { data: plans, isLoading } = useQuery<Plan[]>({
    queryKey: ["/api/plans"],
  });

  return (
    <section className="py-20 sm:py-24 bg-muted/30" id="planos" data-testid="section-plans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-plans-title">
            Planos e Preços
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Escolha o plano ideal para o tamanho do seu negócio. Todos incluem acesso à plataforma n8n.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="h-full">
                  <CardHeader>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-10 w-40" />
                    <Skeleton className="h-4 w-full mt-2" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </CardContent>
                </Card>
              ))
            : plans?.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    className={`h-full flex flex-col hover-elevate ${plan.highlighted ? "border-primary" : ""}`}
                    data-testid={`card-plan-${plan.id}`}
                  >
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        {plan.highlighted && (
                          <Badge variant="default" data-testid={`badge-plan-highlighted-${plan.id}`}>
                            Popular
                          </Badge>
                        )}
                      </div>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-foreground" data-testid={`text-plan-price-${plan.id}`}>
                          {formatPrice(plan.price)}
                        </span>
                        <span className="text-muted-foreground text-sm">/mês</span>
                      </div>
                      <CardDescription className="mt-2">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        {plan.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-2 text-sm text-foreground">
                            <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={plan.highlighted ? "default" : "outline"}
                        asChild
                        data-testid={`button-plan-select-${plan.id}`}
                      >
                        <a href="#contato">Escolher Plano</a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  return (
    <section className="py-20 sm:py-24 bg-background" id="depoimentos" data-testid="section-testimonials">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-testimonials-title">
            O que nossos clientes dizem
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Empresas reais que transformaram seu atendimento com nossa solução.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))
            : testimonials?.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full" data-testid={`card-testimonial-${testimonial.id}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-foreground text-sm mb-6 leading-relaxed" data-testid={`text-testimonial-content-${testimonial.id}`}>
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                            {testimonial.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-foreground" data-testid={`text-testimonial-name-${testimonial.id}`}>
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { toast } = useToast();
  const { data: plans } = useQuery<Plan[]>({ queryKey: ["/api/plans"] });

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      plan: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof contactFormSchema>) => {
      const res = await apiRequest("POST", "/api/leads", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve. Obrigado pelo interesse!",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
    },
    onError: () => {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: z.infer<typeof contactFormSchema>) {
    mutation.mutate(data);
  }

  return (
    <section className="py-20 sm:py-24 bg-muted/30" id="contato" data-testid="section-contact">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-12" {...fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-contact-title">
            Entre em Contato
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Preencha o formulário e nossa equipe entrará em contato para ajudar você a automatizar seu negócio.
          </p>
        </motion.div>
        <motion.div {...fadeInUp}>
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" data-testid="input-name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="seu@email.com" type="email" data-testid="input-email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input placeholder="(11) 99999-9999" data-testid="input-phone" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Empresa</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome da empresa" data-testid="input-company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="plan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plano de Interesse</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger data-testid="select-plan">
                              <SelectValue placeholder="Selecione um plano (opcional)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {plans?.map((plan) => (
                              <SelectItem key={plan.id} value={plan.name} data-testid={`select-plan-option-${plan.id}`}>
                                {plan.name} - {formatPrice(plan.price)}/mês
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Conte-nos sobre o que você precisa..."
                            className="resize-none"
                            rows={4}
                            data-testid="textarea-message"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={mutation.isPending} data-testid="button-submit-lead">
                    {mutation.isPending ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-background py-12" data-testid="section-footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-6 h-6 text-primary" />
              <span className="font-bold text-foreground text-lg">WhatsBot</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Automação inteligente para WhatsApp com IA e n8n. Transforme seu atendimento.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Produto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#funcionalidades" className="hover:text-foreground transition-colors" data-testid="link-footer-features">Funcionalidades</a></li>
              <li><a href="#planos" className="hover:text-foreground transition-colors" data-testid="link-footer-plans">Planos</a></li>
              <li><a href="#depoimentos" className="hover:text-foreground transition-colors" data-testid="link-footer-testimonials">Depoimentos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#contato" className="hover:text-foreground transition-colors" data-testid="link-footer-contact">Contato</a></li>
              <li><span>Termos de Uso</span></li>
              <li><span>Política de Privacidade</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>contato@whatsbot.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>(11) 99999-9999</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t text-center">
          <p className="text-xs text-muted-foreground" data-testid="text-footer-copyright">
            &copy; {new Date().getFullYear()} WhatsBot. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b" data-testid="nav-main">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 h-14">
        <a href="/" className="flex items-center gap-2" data-testid="link-logo">
          <Bot className="w-6 h-6 text-primary" />
          <span className="font-bold text-foreground text-lg">WhatsBot</span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#funcionalidades" className="hover:text-foreground transition-colors" data-testid="link-nav-features">Funcionalidades</a>
          <a href="#planos" className="hover:text-foreground transition-colors" data-testid="link-nav-plans">Planos</a>
          <a href="#depoimentos" className="hover:text-foreground transition-colors" data-testid="link-nav-testimonials">Depoimentos</a>
          <a href="#contato" className="hover:text-foreground transition-colors" data-testid="link-nav-contact">Contato</a>
        </div>
        <Button size="sm" asChild data-testid="button-nav-login">
          <a href="/api/login">Entrar</a>
        </Button>
      </div>
    </nav>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PlansSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
