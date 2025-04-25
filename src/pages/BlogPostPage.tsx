
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, MessageSquare } from "lucide-react";
import { debouncedToast } from "@/components/ui/sonner";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

const BlogPostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  
  // Dados de exemplo para o blog
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Os benefícios do CBD para tratamento de epilepsia",
      excerpt: "Estudos recentes mostram resultados promissores no uso de canabidiol para controle de convulsões em pacientes com epilepsia refratária.",
      content: `
        <p>O canabidiol (CBD) tem demonstrado resultados promissores no tratamento de diversos tipos de epilepsia, especialmente em casos refratários aos tratamentos convencionais.</p>
        
        <p>Estudos clínicos indicam que o CBD pode reduzir significativamente a frequência e a intensidade das crises epilépticas em pacientes que não respondem bem às terapias tradicionais.</p>
        
        <h2>Mecanismo de Ação</h2>
        
        <p>Acredita-se que o CBD atua modulando os receptores canabinoides e não-canabinoides no cérebro, resultando em efeitos anticonvulsivantes. Diferente do THC, o CBD não causa efeitos psicoativos, o que o torna uma opção segura para diversos pacientes.</p>
        
        <h2>Evidências Científicas</h2>
        
        <p>Um estudo publicado no New England Journal of Medicine demonstrou uma redução de aproximadamente 40% na frequência de crises em pacientes com Síndrome de Dravet tratados com CBD.</p>
        
        <p>Outros estudos indicam benefícios similares para pacientes com Síndrome de Lennox-Gastaut e outras formas de epilepsia de difícil controle.</p>
        
        <h2>Considerações Importantes</h2>
        
        <p>O uso do CBD para epilepsia deve sempre ser supervisionado por um médico especialista. A dosagem, frequência e forma de administração variam de acordo com o paciente e sua condição específica.</p>
        
        <p>No Brasil, medicamentos à base de CBD já são aprovados pela ANVISA para uso em casos específicos, mediante prescrição médica.</p>
      `,
      image: "/lovable-uploads/12699b83-589c-4563-8e2e-0ad1d7f31f83.png",
      author: "Dra. Fernanda Lima",
      date: "23/04/2025",
      category: "Cannabis Medicinal"
    },
    {
      id: 2,
      title: "Como a telemedicina está transformando o acesso à saúde no Brasil",
      excerpt: "A adoção da telemedicina tem crescido exponencialmente, facilitando o acesso à saúde em regiões remotas do país.",
      content: `
        <p>A telemedicina tem se estabelecido como uma ferramenta essencial para democratizar o acesso à saúde no Brasil, especialmente nas regiões mais remotas.</p>
        
        <p>Com a pandemia, houve uma aceleração significativa na adoção de tecnologias de telessaúde, permitindo consultas remotas, monitoramento de pacientes à distância e troca de informações entre profissionais de saúde.</p>
        
        <h2>Benefícios da Telemedicina</h2>
        
        <ul>
          <li>Acesso facilitado para pacientes em áreas rurais ou distantes</li>
          <li>Redução do tempo de espera para consultas</li>
          <li>Diminuição de custos com deslocamento</li>
          <li>Continuidade do cuidado para pacientes com doenças crônicas</li>
          <li>Melhor gerenciamento de recursos de saúde</li>
        </ul>
        
        <h2>Desafios a Superar</h2>
        
        <p>Apesar dos avanços, ainda existem desafios importantes, como a inclusão digital da população idosa, a segurança de dados dos pacientes e a adaptação dos profissionais de saúde às novas tecnologias.</p>
        
        <h2>O Futuro da Telemedicina</h2>
        
        <p>Espera-se que a telemedicina continue a se desenvolver, incorporando novas tecnologias como inteligência artificial para diagnósticos preliminares e dispositivos wearable para monitoramento contínuo da saúde.</p>
      `,
      image: "/lovable-uploads/2bde0bd9-b878-4f46-95f9-abb77613dc6b.png",
      author: "Dr. Ricardo Santos",
      date: "20/04/2025",
      category: "Telemedicina"
    },
    {
      id: 3,
      title: "Guia completo sobre prescrição de medicamentos à base de cannabis",
      excerpt: "Entenda os requisitos legais e melhores práticas para prescrição de medicamentos à base de cannabis no Brasil.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod metus vel semper commodo.",
      image: "/lovable-uploads/113364e2-adf3-454b-ab7b-b9404b508632.png",
      author: "Dra. Carolina Mendes",
      date: "15/04/2025",
      category: "Cannabis Medicinal"
    }
  ];

  // Comentários de exemplo
  const initialComments = [
    {
      id: 1,
      author: "João Silva",
      content: "Excelente artigo! Muito informativo sobre os benefícios do CBD.",
      date: "24/04/2025"
    },
    {
      id: 2,
      author: "Marina Costa",
      content: "Minha filha se beneficiou muito do tratamento com CBD para epilepsia. É transformador!",
      date: "24/04/2025"
    }
  ];

  useEffect(() => {
    // Simulando uma requisição para buscar o post
    setLoading(true);
    setTimeout(() => {
      const foundPost = blogPosts.find(p => p.id === Number(id));
      if (foundPost) {
        setPost(foundPost);
        setComments(initialComments);
      } else {
        navigate("/blog");
        debouncedToast.error("Post não encontrado");
      }
      setLoading(false);
    }, 500);
  }, [id, navigate]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: comments.length + 1,
      author: "Usuário Logado",
      content: comment,
      date: new Date().toLocaleDateString()
    };

    setComments([...comments, newComment]);
    setComment("");
    debouncedToast.success("Comentário publicado com sucesso!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-anny-green">Carregando...</div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="flex items-center gap-2 text-anny-green hover:text-anny-green/90"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para o Blog
      </Button>

      <div className="anny-card">
        <div className="h-64 -mx-5 -mt-5 mb-6 relative rounded-t-xl overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover" 
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black/50"></div>
          <span className="absolute bottom-4 left-4 text-white text-sm font-medium px-3 py-1 bg-anny-green/80 rounded-full">
            {post.category}
          </span>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {post.author}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {post.date}
          </div>
        </div>
        
        <div 
          className="prose max-w-none" 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>

      <div className="anny-card">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Comentários ({comments.length})
        </h2>
        
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="mb-3">
            <textarea
              className="anny-input min-h-24"
              placeholder="Deixe seu comentário..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <Button type="submit">Publicar Comentário</Button>
        </form>
        
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">{comment.author}</div>
                <div className="text-xs text-gray-500">{comment.date}</div>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
          
          {comments.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              Nenhum comentário ainda. Seja o primeiro a comentar!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
