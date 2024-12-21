import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
function SeccionEstadisticasVotos() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
          "#FF455E",
          "#3DDC84",
          "#F4B400",
          "#0F9D58",
          "#DB4437",
          "#4285F4",
          "#FDC830",
          "#E87EA1",
          "#7E57C2",
          "#29B6F6",
          "#26A69A",
          "#FF7043",
          "#5E35B1",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
          "#FF455E",
          "#3DDC84",
          "#F4B400",
          "#0F9D58",
          "#DB4437",
          "#4285F4",
          "#FDC830",
          "#E87EA1",
          "#7E57C2",
          "#29B6F6",
          "#26A69A",
          "#FF7043",
          "#5E35B1",
        ],
      },
    ],
  });

  const [options, setOptions] = useState({
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce(
              (sum, value) => sum + value,
              0
            );
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(2); // Calcular porcentaje
            return `${context.label}: ${percentage}%`;
          },
        },
      },
    },
  });

  const [votaciones, setVotaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/ObtenerVotos.php"
        );
        const data = await response.json();

        const labels = data.map((item) => item.nombre_votacion);
        const votos = data.map((item) => parseInt(item.total_votos, 10));

        setChartData({
          labels,
          datasets: [
            {
              data: votos,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#C9CBCF",
                "#FF455E",
                "#3DDC84",
                "#F4B400",
                "#0F9D58",
                "#DB4437",
                "#4285F4",
                "#FDC830",
                "#E87EA1",
                "#7E57C2",
                "#29B6F6",
                "#26A69A",
                "#FF7043",
                "#5E35B1",
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#C9CBCF",
                "#FF455E",
                "#3DDC84",
                "#F4B400",
                "#0F9D58",
                "#DB4437",
                "#4285F4",
                "#FDC830",
                "#E87EA1",
                "#7E57C2",
                "#29B6F6",
                "#26A69A",
                "#FF7043",
                "#5E35B1",
              ],
            },
          ],
        });

        setVotaciones(data);
      } catch (error) {
        console.error("Error al cargar los datos del gráfico:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-10">
        Resultados de Votaciones
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {chartData.datasets[0].data.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Aún no existen votos registrados.
          </p>
        ) : (
          <>
            <div className="w-full md:w-1/2">
              <Pie data={chartData} options={options} />
            </div>
            <div className="w-full md:w-1/2">
              <ul className="space-y-4">
                {votaciones
                  .sort((a, b) => b.total_votos - a.total_votos) // Ordenar de mayor a menor
                  .map((votacion) => (
                    <li
                      key={votacion.id_votacion}
                      className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
                    >
                      <span className="text-lg font-semibold text-gray-700">
                        {votacion.nombre_votacion}
                      </span>
                      <span className="text-xl font-bold text-blue-600">
                        {votacion.total_votos} votos
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SeccionEstadisticasVotos;
