import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import DataLoading from "../../../Component/DataLoading/DataLoading";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch dashboard stats
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/biodataStats");
      return res.data;
    }
  });

  if (isLoading) return <div className="flex justify-center items-center h-screen"><DataLoading /></div>
  if (error) return <h2 className="text-center text-red-500">Error loading data</h2>;

  // Data for Pie Chart
  const chartData = {
    labels: ["Total Biodata", "Male Biodata", "Female Biodata"],
    datasets: [
      {
        data: [
          stats.totalBiodata,
          stats.totalBoys,
          stats.totalGirls,
          // stats.premiumBiodata,
          // stats.totalRevenue
        ],
        backgroundColor: ["#1E40AF", "#F59E0B", "#EF4444"], //"#10B981", "#7C3AED"
        hoverOffset: 2,
      },
    ],
  };

  return (
    <div className="container mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <div className="lg:flex gap-5 items-start">
         {/* Pie Chart */}
      <div className="mt-10 lg:w-1/3 flex justify-center">
        <div className="w-full bg-white p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center text-gray-700">Statistics Overview</h2>
          <Pie data={chartData} />
        </div>
      </div>
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-center">
        <div className="p-5 bg-blue-500 text-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Total Biodata</h2>
          <p className="text-3xl font-bold">{stats.totalBiodata}</p>
        </div>
        <div className="p-5 bg-yellow-500 text-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Male Biodata</h2>
          <p className="text-3xl font-bold">{stats.totalBoys}</p>
        </div>
        <div className="p-5 bg-red-500 text-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Female Biodata</h2>
          <p className="text-3xl font-bold">{stats.totalGirls}</p>
        </div>
        {/* <div className="p-5 bg-green-500 text-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Premium Biodata</h2>
          <p className="text-3xl font-bold">{stats.premiumBiodata}</p>
        </div>
        <div className="p-5 bg-purple-500 text-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-3xl font-bold">${stats.totalRevenue}</p>
        </div> */}
      </div>
      </div>  
    </div>
  );
};

export default AdminDashboard;
