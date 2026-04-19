export type BlogCategory = "Crescimento" | "Marketing" | "Mercado";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string; // ISO yyyy-mm-dd
  /** Quick Answer: 2-3 frases que respondem diretamente o tema do post. */
  quickAnswer: string;
  /** Markdown-lite content. Supports: ## H2, ### H3, > quote, - list, blank line paragraphs. */
  content: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = ["Crescimento", "Marketing", "Mercado"];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "7-sinais-consultorio-perdendo-dinheiro",
    title: "7 sinais de que seu consultório está perdendo dinheiro sem você perceber",
    excerpt:
      "A maioria dos médicos sabe quanto fatura por mês. Poucos sabem quanto deixam de faturar. Os 7 vazamentos mais comuns que vemos em 90+ consultórios.",
    category: "Crescimento",
    date: "2026-04-18",
    quickAnswer:
      "Os 7 principais vazamentos de receita em consultórios médicos são: leads sem resposta rápida, secretária que informa mas não converte, no-shows sem confirmação, pacientes inativos sem reativação, marketing que gera likes mas não consultas, consulta subprecificada e buracos na agenda sem lista de espera.",
    content: `A maioria dos médicos sabe quanto fatura por mês. Poucos sabem quanto deixam de faturar.

A diferença entre os dois números é onde mora o crescimento real. E na nossa experiência com mais de 90 consultórios, esses são os 7 vazamentos mais comuns:

## 1. Leads que chegam e ninguém responde a tempo

O paciente pesquisou, clicou no anúncio, mandou mensagem. E esperou. 2 horas. 4 horas. No dia seguinte. Quando a resposta veio, ele já tinha agendado com outro médico.

> Consultórios que respondem em até 15 minutos convertem 3x mais do que os que respondem em 2 horas. A janela de decisão do paciente é curta.

## 2. Secretária que informa mas não converte

A secretária responde educadamente. Passa o valor da consulta. E espera o paciente decidir. Não faz follow-up. Não trata objeções. Não agenda.

Isso não é atendimento comercial. É balcão de informações.

## 3. No-shows sem sistema de confirmação

Paciente agendou segunda-feira pra consulta na quinta. Quinta de manhã, não apareceu. Ninguém confirmou, ninguém lembrou, ninguém ligou.

Cada falta é um horário que poderia ter gerado receita. Em um consultório com ticket de R$500 e 3 faltas por semana, são R$6.000 perdidos por mês.

## 4. Pacientes antigos que nunca mais voltaram

Eles existem na sua base. Vieram uma vez, gostaram, mas nunca foram contatados de novo. Ninguém ligou pra agendar o retorno. Ninguém mandou mensagem no aniversário. Eles esqueceram de você — não porque não gostaram, mas porque ninguém lembrou.

## 5. Marketing que gera curtida mas não gera consulta

O perfil tem likes, comentários e até seguidores crescendo. Mas o WhatsApp comercial não toca. Se o marketing não está gerando agendamento, ele está gerando vaidade — não faturamento.

## 6. Valor da consulta abaixo do que o mercado paga

Muitos médicos precificam pela insegurança, não pelo valor que entregam. Consultam durante 40 minutos, fazem ultrassom no consultório, explicam tudo com calma — e cobram o mesmo que quem atende em 15 minutos.

Se o paciente percebe mais valor do que o preço, o preço está errado.

## 7. Agenda com buracos que poderiam ser preenchidos

Horários vagos que aparecem por cancelamento de última hora e ficam abertos. Sem lista de espera. Sem sistema de encaixe. O horário vira prejuízo.

Cada um desses sinais, isoladamente, parece pequeno. Juntos, representam milhares de reais por mês em receita que simplesmente evapora.

O primeiro passo é diagnosticar. O segundo é corrigir com método — exatamente o que estrutura o nosso [Método D.A.M.A](/metodo): diagnosticar, atrair, marcar e acompanhar.`,
  },
  {
    slug: "marketing-medico-cfm-2026",
    title: "Marketing médico em 2026: o que o CFM permite e o que proíbe",
    excerpt:
      "O marketing médico opera dentro de regras que poucos profissionais de marketing — e poucos médicos — conhecem bem. Um guia direto sobre o permitido e o proibido.",
    category: "Marketing",
    date: "2026-04-15",
    quickAnswer:
      "O CFM permite conteúdo educativo, divulgação de formação e especialidade, uso de redes sociais e depoimentos espontâneos. Proíbe garantia de resultados, antes/depois sensacionalista, divulgação de preços em peças publicitárias e uso de termos como 'o melhor' sem comprovação.",
    content: `O marketing médico no Brasil opera dentro de regras que a maioria dos profissionais de marketing desconhece. E a maioria dos médicos conhece mal.

O resultado: ou o médico não faz marketing por medo, ou faz errado e se expõe a processos éticos. As duas situações custam dinheiro.

O Conselho Federal de Medicina atualizou as regras de publicidade médica. O que mudou e o que permanece:

## O que é permitido

Médicos podem divulgar sua especialidade, formação, títulos e locais de atendimento. Podem publicar conteúdo educativo sobre doenças, prevenção e tratamentos. Podem usar redes sociais com fotos profissionais e vídeos informativos.

A divulgação de equipamentos e técnicas é permitida desde que não sugira exclusividade ou superioridade sem evidência.

Depoimentos de pacientes são permitidos desde que espontâneos e sem indução.

## O que continua proibido

- Garantia de resultados. Nenhuma comunicação pode prometer cura ou resultado específico.
- Fotos de antes e depois com finalidade de autopromoção sensacionalista.
- Divulgação de preços e condições de pagamento em peças publicitárias.
- Uso de termos como "o melhor", "o único", "referência" sem comprovação objetiva.
- Participação em publicidade de produtos comerciais usando o título de médico como argumento de autoridade.

## Onde a maioria erra

O erro mais comum não é fazer algo proibido. É deixar de fazer o que é permitido por falta de conhecimento.

Médicos que poderiam estar educando pacientes pelo Instagram, ranqueando no Google com artigos úteis e aparecendo em buscas locais ficam invisíveis — não porque o CFM proíbe, mas porque ninguém explicou o que pode ser feito dentro das regras.

O segundo erro mais comum é terceirizar o marketing para agências que não conhecem as regras do CFM. A agência cria um anúncio com "antes e depois", o médico publica, e três meses depois chega uma notificação do CRM.

## Como fazer marketing médico ético e eficiente

O caminho que funciona combina três coisas: conteúdo educativo que posiciona autoridade, presença digital que facilita a descoberta, e atendimento comercial que converte interesse em consulta — tudo dentro das normas.

> Conteúdo que ensina sobre uma condição médica não é propaganda — é serviço público. E é o tipo de conteúdo que o algoritmo do Instagram e o Google mais distribuem.

O médico que entende isso para de ter medo do marketing e começa a tratar a presença digital como parte da prática profissional — uma das frentes que estruturamos dentro do nosso [Método D.A.M.A](/metodo).`,
  },
  {
    slug: "time-comercial-terceirizado-consultorio",
    title: "Time comercial terceirizado para consultório: vale a pena?",
    excerpt:
      "Treinar a secretária ou contratar um time externo? A resposta honesta depende de onde você está — e de quanto está deixando na mesa.",
    category: "Crescimento",
    date: "2026-04-12",
    quickAnswer:
      "Vale a pena quando o volume de contatos cresce e a conversão não acompanha, quando o marketing gera leads mas a agenda não enche, ou quando a secretária está sobrecarregada. Não vale quando o consultório recebe menos de 30 contatos novos por mês.",
    content: `A pergunta aparece toda semana nas nossas conversas com médicos: "Vale a pena ter um time comercial externo ou é melhor eu mesmo treinar minha secretária?"

A resposta honesta: depende de onde você está.

## Quando treinar a secretária faz sentido

Se o seu consultório recebe menos de 30 contatos novos por mês, o volume provavelmente não justifica um time externo. Nesse cenário, o mais inteligente é treinar a secretária com técnicas de atendimento comercial: como responder rápido, como tratar objeções, como fazer follow-up.

O problema: a maioria das secretárias foi contratada para tarefas administrativas. Pedir que ela venda é pedir que exerça uma função para a qual não foi preparada. O treinamento ajuda, mas tem um teto.

## Quando terceirizar faz sentido

Quando o volume de contatos cresce e a conversão não acompanha. Quando o marketing está gerando leads mas a agenda não enche. Quando a secretária está sobrecarregada com administrativo e não consegue dar atenção comercial aos leads.

Nesses casos, ter um time dedicado à conversão muda o jogo. Não porque a secretária é ruim — mas porque vender é uma especialidade.

## O que um time comercial terceirizado faz na prática

- Atende os leads que chegam via WhatsApp, Instagram, Google e telefone.
- Qualifica: entende a queixa do paciente, apresenta o valor do médico, trata objeções e agenda a consulta.
- Faz follow-up: pacientes que não agendaram recebem acompanhamento. Pacientes que agendaram recebem confirmação. Pacientes que faltaram recebem reagendamento.
- Reativa inativos: pacientes que vieram uma vez e não voltaram são contatados com periodicidade.
- Reporta: o médico recebe dados sobre quantos contatos chegaram, quantos viraram consulta e onde está o vazamento.

## Os riscos de terceirizar mal

O risco real não é terceirizar — é terceirizar sem critério. Um time que usa scripts robóticos, que não entende a especialidade do médico, que trata paciente como lead de e-commerce, faz mais mal do que bem.

> O atendimento de consultório médico exige empatia, conhecimento do contexto clínico e sensibilidade. O paciente que liga com medo de um diagnóstico não pode ser atendido com a mesma abordagem de quem está comprando um curso online.

## Como avaliar se vale a pena

Faça a conta simples: quantos leads chegam por mês × ticket médio × taxa de conversão atual. Depois calcule quanto faturaria se a conversão subisse 10-20 pontos percentuais. Se a diferença pagar o time comercial e ainda sobrar, a resposta é clara.

Na maioria dos consultórios que atendem, o investimento em time comercial se paga no primeiro mês — porque o médico já tem os leads. Só não tem quem converta. É exatamente isso que entregamos dentro da [nossa solução](/solucao): time comercial, growth marketing e marketing 360 numa operação só.`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, category: BlogCategory, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== slug && p.category === category).slice(0, limit);
}

export function readingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDateBR(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
