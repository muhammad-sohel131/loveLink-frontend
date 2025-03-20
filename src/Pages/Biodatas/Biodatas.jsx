import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import { FaFilter } from "react-icons/fa";
import DataLoading from "../../Component/DataLoading/DataLoading";
import "./Biodatas.css";
import NoData from "../../Component/NoData/NoData";

const Biodatas = () => {
  const location = useLocation();
  const userData = location.state;
  const userGender = userData?.gender || "";
  const userDivision = userData?.present_division || "";

  const [filters, setFilters] = useState({
    ageRange: [18, 60],
    gender: userGender,
    present_division: userDivision,
    sort: "ascending",
  });

  const axiosPublic = useAxiosPublic();
  const limit = 6; // Number of biodatas per page

  // Fetch biodatas using useInfiniteQuery
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["biodatas", filters],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axiosPublic.get(`/bios?page=${pageParam}&limit=${limit}`);
      return response.data;
    },
    getNextPageParam: (lastPage, pages) => {
    return pages.length < lastPage.totalPages ? pages.length + 1 : undefined;
},

  });

  // Combine all pages into a single list
  const biodatas = data?.pages.flatMap((page) => page.biodatas) || [];

  // Infinite scrolling logic
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <DataLoading />;
  if (error) return <p className="text-red-500">Error loading data...</p>;

  const filteredBiodatas = biodatas
    .sort((a, b) => (filters.sort === "ascending" ? a.age - b.age : b.age - a.age))
    .filter((b) => b.age >= filters.ageRange[0] && b.age <= filters.ageRange[1])
    .filter((b) => (filters.gender ? b.gender === filters.gender : true))
    .filter((b) => (filters.present_division ? b.present_division === filters.present_division : true));
  return (
    <div className="section-container items-start mx-auto py-10 md:flex gap-6">
      {/* Filters Section */}
      <div className="md:w-1/4 md:sticky h-auto top-[60px] p-4 rounded-lg shadow border border-[#e57339]">
        <h2 className="text-xl font-bold mb-4 flex gap-5 items-center text-[#e57339]">
          <FaFilter /> Filter Biodata
        </h2>

        <label className="block font-semibold">Age Range</label>
        <input
          type="range"
          min="18"
          max="60"
          value={filters.ageRange[0]}
          className="w-full mt-2"
          onChange={(e) =>
            setFilters({ ...filters, ageRange: [e.target.value, filters.ageRange[1]] })
          }
        />
        <input
          type="range"
          min="18"
          max="60"
          value={filters.ageRange[1]}
          className="w-full"
          onChange={(e) =>
            setFilters({ ...filters, ageRange: [filters.ageRange[0], e.target.value] })
          }
        />
        <p className="text-gray-700">Age: {filters.ageRange[0]} - {filters.ageRange[1]}</p>

        <label className="block mt-4 font-semibold">Biodata Type</label>
        <select
          value={filters.gender}
          className="w-full p-2 border rounded"
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label className="block mt-4 font-semibold">Division</label>
        <select
          value={filters.present_division}
          className="w-full p-2 border rounded"
          onChange={(e) => setFilters({ ...filters, present_division: e.target.value })}
        >
          <option value="">All</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chattagram">Chattagram</option>
          <option value="Rangpur">Rangpur</option>
          <option value="Barisal">Barisal</option>
          <option value="Khulna">Khulna</option>
          <option value="Mymensingh">Mymensingh</option>
          <option value="Sylhet">Sylhet</option>
        </select>

        <label className="block mt-4 font-semibold">Sort By Age</label>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      {/* Biodatas List */}
      <div className="md:w-3/4">
        {filteredBiodatas.length === 0 ? (
          <NoData />
        ) : (
          <div className="grid md:mt-0 mt-10 grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBiodatas.map((profile) => (
              <div key={profile.bio_id} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex flex-col gap-2">
                  <img
                    src={profile.profile_image}
                    alt="Profile"
                    className="object-cover rounded-lg h-[240px]"
                  />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold mt-4"><b>ID: </b>{profile.bio_id}</h3>
                    <p><b>Gender: </b>{profile.gender}</p>
                    <p><b>Permanent Address: </b>{profile.permanent_division}</p>
                    <p><b>Age: </b>{profile.age}</p>
                    <p><b>Occupation: </b>{profile.occupation}</p>
                  </div>
                </div>
                <Link className="mt-4 bg-[#e57339] text-white w-full py-2 rounded-md hover:bg-[#e07339] transition block text-center" to={`/biodata/${profile.bio_id}`}>View Profile</Link>
              </div>
            ))}
          </div>
        )}

        {/* Load More Indicator */}
        <div ref={loadMoreRef} className="h-10 mt-10 w-full flex justify-center items-center">
          {isFetchingNextPage && <DataLoading />}
        </div>
      </div>
    </div>
  );
};

export default Biodatas;
