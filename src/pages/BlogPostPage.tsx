
import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Tag, 
  Share, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const BlogPostPage = () => {
  const { id } = useParams();
  
  // In a real app, we would fetch the post based on the ID
  // For this example, we'll use static content
  
  const post = {
    id: id || "1",
    title: "Os avanços da cannabis medicinal no tratamento de doenças neurológicas",
    subtitle: "Um olhar sobre as pesquisas recentes e resultados promissores",
    date: "15 de abril de 2025",
    author: {
      name: "Dra. Mariana Costa",
      role: "Neurologista e Pesquisadora",
      avatar: "/placeholder.svg"
    },
    category: "Pesquisa Médica",
    coverImage: "/placeholder.svg",
    content: `
      <p class="mb-4">Os últimos anos têm testemunhado um crescente interesse científico no potencial terapêutico dos canabinoides para o tratamento de diversas condições neurológicas. Estudos recentes demonstram resultados promissores no uso de CBD e outros compostos da cannabis no manejo de epilepsias refratárias, doença de Parkinson, esclerose múltipla e dor neuropática.</p>
      
      <h2 class="text-xl font-semibold my-4">Epilepsia e o papel dos canabinoides</h2>
      
      <p class="mb-4">Em 2018, a FDA aprovou o primeiro medicamento à base de CBD puro para o tratamento de síndromes epilépticas severas, como Síndrome de Dravet e Lennox-Gastaut. Estudos clínicos demonstraram uma redução de até 40% na frequência de convulsões em pacientes que não respondiam aos tratamentos convencionais.</p>
      
      <p class="mb-4">Na pesquisa conduzida pela Universidade de São Paulo em parceria com centros internacionais, observou-se que o CBD atua não apenas como anticonvulsivante, mas também apresenta propriedades neuroprotetoras que podem retardar a progressão da doença em alguns casos.</p>
      
      <div class="bg-gray-100 p-4 rounded-md my-6 italic">
        "Os resultados são animadores e representam uma esperança real para pacientes com epilepsias refratárias que já testaram múltiplas medicações sem sucesso." - Dra. Helena Brentani, neurocientista.
      </div>
      
      <h2 class="text-xl font-semibold my-4">Doença de Parkinson: novos horizontes</h2>
      
      <p class="mb-4">Para a doença de Parkinson, os canabinoides têm mostrado potencial para aliviar tanto os sintomas motores quanto não-motores. Um estudo publicado no Journal of Neurochemistry revelou que o CBD pode proteger neurônios dopaminérgicos, cuja perda é característica da doença, através da redução do estresse oxidativo e neuroinflamação.</p>
      
      <p class="mb-4">Pacientes tratados com formulações padronizadas de CBD reportaram melhora significativa em tremores, rigidez muscular e distúrbios do sono. Além disso, a qualidade de vida dos participantes apresentou melhora mensurável nas escalas de avaliação específicas para Parkinson.</p>
      
      <h2 class="text-xl font-semibold my-4">Esclerose múltipla e controle da espasticidade</h2>
      
      <p class="mb-4">A esclerose múltipla (EM) é outra condição em que o uso de canabinoides tem demonstrado benefícios significativos. Um spray de cannabis medicinal contendo CBD e THC em proporções específicas já é aprovado em mais de 30 países para o tratamento da espasticidade relacionada à EM.</p>
      
      <p class="mb-4">Estudos de longo prazo indicam que, além do controle da espasticidade, pacientes relatam melhora na dor neuropática, distúrbios da bexiga e qualidade do sono, contribuindo para uma melhoria global na qualidade de vida.</p>
      
      <h2 class="text-xl font-semibold my-4">Desafios e perspectivas futuras</h2>
      
      <p class="mb-4">Apesar dos resultados promissores, ainda existem desafios significativos no campo da cannabis medicinal para condições neurológicas. A padronização dos produtos, a determinação de dosagens ideais e a compreensão dos mecanismos de ação específicos ainda requerem mais pesquisas.</p>
      
      <p class="mb-4">O estigma associado ao uso da cannabis também representa uma barreira à aceitação desses tratamentos, mesmo com evidências científicas crescentes. A educação de profissionais de saúde e do público geral sobre a diferença entre uso medicinal e recreativo é essencial para permitir que mais pacientes se beneficiem dessas terapias.</p>
      
      <h2 class="text-xl font-semibold my-4">Conclusão</h2>
      
      <p class="mb-4">Os avanços no campo da cannabis medicinal para doenças neurológicas são promissores e representam uma nova fronteira no tratamento de condições muitas vezes desafiadoras e refratárias às terapias convencionais. Com o aumento da pesquisa e da regulamentação adequada, esses tratamentos poderão se tornar opções terapêuticas cada vez mais relevantes no arsenal médico contra doenças neurológicas complexas.</p>
      
      <p class="mb-4">À medida que a ciência avança, é fundamental que pacientes interessados em explorar essas opções consultem profissionais médicos especializados, capazes de avaliar adequadamente os potenciais benefícios e riscos para cada caso individual.</p>
    `,
    tags: ["Cannabis Medicinal", "Neurologia", "Epilepsia", "Parkinson", "Pesquisa"],
    relatedPosts: [
      {
        id: "2",
        title: "O papel do sistema endocanabinoide na regulação da dor crônica",
        image: "/placeholder.svg",
        excerpt: "Entenda como o CBD interage com receptores do sistema endocanabinoide para modular a percepção da dor."
      },
      {
        id: "3",
        title: "Ansiedade e depressão: como os canabinoides podem auxiliar no tratamento",
        image: "/placeholder.svg",
        excerpt: "Pesquisas recentes apontam benefícios dos compostos da cannabis no manejo de transtornos de humor e ansiedade."
      }
    ]
  };
  
  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="mb-8">
        <Link to="/blog" className="flex items-center text-anny-green hover:underline mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para o Blog
        </Link>
        
        <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{post.subtitle}</p>
        
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{post.date}</span>
          </div>
          
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>{post.author.name}</span>
          </div>
          
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-2" />
            <span>{post.category}</span>
          </div>
        </div>
        
        <img 
          src={post.coverImage}
          alt={post.title}
          className="w-full h-80 object-cover rounded-lg mb-8"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <article className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
          
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Link 
                  key={index}
                  to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-3">Compartilhe:</h3>
            <div className="flex gap-3">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-6">Artigos Relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.relatedPosts.map(relatedPost => (
                <Card key={relatedPost.id}>
                  <CardContent className="p-4">
                    <Link to={`/blog/${relatedPost.id}`}>
                      <img 
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-40 object-cover rounded-md mb-4"
                      />
                      <h4 className="font-semibold text-lg mb-2 hover:text-anny-green transition-colors">
                        {relatedPost.title}
                      </h4>
                    </Link>
                    <p className="text-gray-600 text-sm">{relatedPost.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">Sobre o Autor</h3>
              <div className="flex items-center gap-4 mb-3">
                <Avatar>
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-gray-600">{post.author.role}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Ver todos os artigos
              </Button>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4">
                Receba novidades sobre cannabis medicinal e atualizações do nosso blog.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <Button className="w-full bg-anny-green hover:bg-anny-green/90">
                  Inscrever-se
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
