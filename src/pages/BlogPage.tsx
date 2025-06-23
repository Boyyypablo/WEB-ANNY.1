
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";

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

const BlogPage = () => {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Dados de exemplo para o blog
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Os benefícios do CBD para tratamento de epilepsia",
      excerpt: "Estudos recentes mostram resultados promissores no uso de canabidiol para controle de convulsões em pacientes com epilepsia refratária.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod metus vel semper commodo. Proin tincidunt mauris ut sapien dignissim, eget fringilla nisl facilisis.",
      image: "/uploads/12699b83-589c-4563-8e2e-0ad1d7f31f83.png",
      author: "Dra. Fernanda Lima",
      date: "23/04/2025",
      category: "Cannabis Medicinal"
    },
    {
      id: 2,
      title: "Como a telemedicina está transformando o acesso à saúde no Brasil",
      excerpt: "A adoção da telemedicina tem crescido exponencialmente, facilitando o acesso à saúde em regiões remotas do país.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod metus vel semper commodo. Proin tincidunt mauris ut sapien dignissim.",
      image: "/uploads/2bde0bd9-b878-4f46-95f9-abb77613dc6b.png",
      author: "Dr. Ricardo Santos",
      date: "20/04/2025",
      category: "Telemedicina"
    },
    {
      id: 3,
      title: "Guia completo sobre prescrição de medicamentos à base de cannabis",
      excerpt: "Entenda os requisitos legais e melhores práticas para prescrição de medicamentos à base de cannabis no Brasil.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod metus vel semper commodo.",
      image: "/uploads/113364e2-adf3-454b-ab7b-b9404b508632.png",
      author: "Dra. Carolina Mendes",
      date: "15/04/2025",
      category: "Cannabis Medicinal"
    }
  ];

  // Lista única de categorias para o filtro
  const categories = ["all", ...new Set(blogPosts.map(post => post.category))];
  
  // Filtra posts com base na categoria
  const filteredPosts = categoryFilter === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === categoryFilter);

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="flex items-center gap-2 text-anny-green hover:text-anny-green/90"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Blog de Saúde</h1>
        
        <select
          className="anny-input w-full md:w-auto"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Todas categorias</option>
          {categories.filter(c => c !== "all").map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <div key={post.id} className="anny-card flex flex-col">
            <div className="h-48 mb-4 rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform hover:scale-105" 
              />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium px-2 py-1 bg-anny-green-light text-anny-green rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {post.date}
                </div>
              </div>
              
              <h3 className="font-semibold text-lg mb-2 hover:text-anny-orange transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center text-xs text-gray-500 mt-auto">
                <User className="w-3 h-3 mr-1" />
                {post.author}
              </div>
              
              <Button 
                className="w-full mt-4"
                variant="outline"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                Ler Mais
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
