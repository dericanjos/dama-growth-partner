import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { signupForumUser } from "@/server/forum.functions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { saveForumUser, type ForumLocalUser } from "@/lib/forumStorage";

const SPECIALTIES = [
  "Cardiologia",
  "Dermatologia",
  "Endocrinologia",
  "Gastroenterologia",
  "Ginecologia e Obstetrícia",
  "Neurologia",
  "Oftalmologia",
  "Ortopedia",
  "Otorrinolaringologia",
  "Pediatria",
  "Psiquiatria",
  "Urologia",
  "Cirurgia Geral",
  "Medicina de Família",
  "Clínica Geral",
  "Radiologia",
  "Anestesiologia",
  "Oncologia",
  "Outra",
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (user: ForumLocalUser) => void;
}

export function SignupModal({ open, onOpenChange, onSuccess }: Props) {
  const signup = useServerFn(signupForumUser);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialty, setSpecialty] = useState<string>("");
  const [otherSpecialty, setOtherSpecialty] = useState("");
  const [crm, setCrm] = useState("");

  const handleCrm = (v: string) => {
    // máscara CRM/UF 000000
    const clean = v.toUpperCase().replace(/[^A-Z0-9/]/g, "").slice(0, 14);
    setCrm(clean);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const finalSpecialty =
        specialty === "Outra" ? otherSpecialty.trim() : specialty;
      const res = await signup({
        data: {
          name: name.trim(),
          email: email.trim(),
          specialty: finalSpecialty || null,
          crm_number: crm.trim() || null,
        },
      });
      saveForumUser(res.user);
      toast.success("Cadastro feito! Agora você pode participar.");
      onSuccess(res.user);
      onOpenChange(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao cadastrar";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-[22px] text-[var(--navy)]">
            Cadastre-se pra participar da discussão
          </DialogTitle>
          <DialogDescription>
            É rápido. Só precisamos de algumas informações básicas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="forum-name">Nome completo *</Label>
            <Input
              id="forum-name"
              required
              minLength={2}
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dr(a). João Silva"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="forum-email">Email *</Label>
            <Input
              id="forum-email"
              type="email"
              required
              maxLength={255}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="forum-specialty">Especialidade médica</Label>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger id="forum-specialty">
                <SelectValue placeholder="Selecione (opcional)" />
              </SelectTrigger>
              <SelectContent>
                {SPECIALTIES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {specialty === "Outra" && (
              <Input
                value={otherSpecialty}
                onChange={(e) => setOtherSpecialty(e.target.value)}
                placeholder="Qual especialidade?"
                maxLength={100}
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="forum-crm">CRM</Label>
            <Input
              id="forum-crm"
              value={crm}
              onChange={(e) => handleCrm(e.target.value)}
              placeholder="CRM/UF 000000"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full justify-center disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Cadastrar e participar"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
