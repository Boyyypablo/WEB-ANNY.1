import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HistoryPage = () => {
  const navigate = useNavigate();
  
  // Example of empty exams list for new users
  const exams: any[] = [];
  const hasExams = exams.length > 0;

  return (
    <div className="space-y-6">

      <h1 className="text-2xl md:text-3xl font-bold">Histórico de Exames</h1>

      {!hasExams ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Nenhum exame encontrado</h3>
          <p className="mt-2 text-sm text-gray-500">
            Você ainda não possui exames registrados.
            Após a realização de uma consulta, seus exames aparecerão aqui.
          </p>
          <Button 
            className="mt-4"
            onClick={() => navigate("/consultation")}
          >
            Agendar Consulta
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Exame
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Médico
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {exam.name}
                    </th>
                    <td className="px-6 py-4">
                      {exam.date}
                    </td>
                    <td className="px-6 py-4">
                      {exam.doctor}
                    </td>
                    <td className="px-6 py-4">
                      <Button onClick={() => navigate(`/history/exam/${exam.id}`)}>Ver Detalhes</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
