import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function SeccionEstadisticasVotos() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Votos",
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
        ],
      },
    ],
  });

  const [options, setOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce(
              (sum, value) => sum + value,
              0
            );
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Candidatos",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Número de Votos",
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
              label: "Votos",
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
    <>
      <h2 className="text-3xl font-bold text-center mb-10">
        Resultados de Votaciones
      </h2>
      <div className=" items-center justify-between gap-6">
        {chartData.datasets[0].data.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Aún no existen votos registrados.
          </p>
        ) : (
          <div className="w-full h-full min-w-full min-h-full">
            <Bar data={chartData} options={options} />
          </div>
        )}
      </div>
    </>
  );
}

export default SeccionEstadisticasVotos;
