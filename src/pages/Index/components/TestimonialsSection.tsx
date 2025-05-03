
const TestimonialsSection = () => {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">O que nossos pacientes dizem</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="anny-card">
          <p className="italic text-anny-green/80">
            "O Projeto Anny revolucionou a forma como cuido da minha saúde. Consigo agendar consultas e comprar medicamentos sem sair de casa!"
          </p>
          <p className="font-semibold mt-4">Maria Silva</p>
        </div>
        <div className="anny-card">
          <p className="italic text-anny-green/80">
            "Os médicos são excelentes e o atendimento é sempre rápido e eficiente. Recomendo a todos!"
          </p>
          <p className="font-semibold mt-4">João Santos</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
