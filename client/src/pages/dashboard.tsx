import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  LogOut,
  MessageCircle,
  Users,
  BarChart3,
  Activity,
  CheckCircle2,
  Clock,
} from "lucide-react";

const stats = [
  { label: "Mensagens Hoje", value: "0", icon: MessageCircle, description: "Total de mensagens processadas" },
  { label: "Conversas Ativas", value: "0", icon: Users, description: "Conversas em andamento" },
  { label: "Taxa de Resolução", value: "0%", icon: BarChart3, description: "Resolvidas automaticamente" },
  { label: "Tempo Médio", value: "0s", icon: Clock, description: "Tempo de resposta" },
];

export default function Dashboard() {
  const { user, logout, isLoggingOut } = useAuth();

  const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || "Usuário";
  const initials = displayName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 h-14">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            <span className="font-bold text-foreground text-lg" data-testid="text-dashboard-brand">WhatsBot</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                {user?.profileImageUrl && <AvatarImage src={user.profileImageUrl} alt={displayName} />}
                <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground hidden sm:block" data-testid="text-user-name">
                {displayName}
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => logout()}
              disabled={isLoggingOut}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-dashboard-welcome">
            Bem-vindo, {user?.firstName || "Usuário"}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus bots e acompanhe o desempenho do seu atendimento.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.label} data-testid={`card-stat-${index}`}>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground" data-testid={`text-stat-value-${index}`}>
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card data-testid="card-bot-status">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                Status do Bot
              </CardTitle>
              <CardDescription>Status atual do seu agente WhatsApp</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Conexão n8n</span>
                  </div>
                  <Badge variant="secondary" data-testid="badge-n8n-status">
                    <Clock className="w-3 h-3 mr-1" />
                    Aguardando configuração
                  </Badge>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">WhatsApp</span>
                  </div>
                  <Badge variant="secondary" data-testid="badge-whatsapp-status">
                    <Clock className="w-3 h-3 mr-1" />
                    Aguardando configuração
                  </Badge>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">IA Ativa</span>
                  </div>
                  <Badge variant="secondary" data-testid="badge-ai-status">
                    <Clock className="w-3 h-3 mr-1" />
                    Aguardando configuração
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-quick-actions">
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
              <CardDescription>Complete a configuração do seu bot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Conectar WhatsApp Business</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Vincule seu número de WhatsApp ao bot</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Configurar Fluxo n8n</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Defina as automações do seu atendimento</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Ativar Respostas com IA</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Configure a inteligência artificial para respostas automáticas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
