import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider"
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BiodataDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPremium, setPremium] = useState(false);
  const [biodata, setBiodata] = useState(null);
  const [similarBiodatas, setSimilarBiodatas] = useState([]);

  const { user } = useContext(AuthContext)
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: biodataList, isLoading } = useQuery({
    queryKey: ["biodataList"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/bios`);
      return result.data.biodatas;
    },
  });

  const { data: bio } = useQuery({
    queryKey: ["bio"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/bios/${user.email}`);
      return result.data;
    },
  });
  useEffect(() => {
    if (biodataList) {
      const selectedBiodata = biodataList.find((b) => b.bio_id === parseInt(id));
      if (selectedBiodata) {
        setBiodata(selectedBiodata);
        setSimilarBiodatas(
          biodataList.filter((b) => b.gender === selectedBiodata.gender && b.bio_id !== selectedBiodata.bio_id).slice(0, 3)
        );
      }
    }
    if (bio) {
      setPremium(bio.isPremium)
    }
  }, [biodataList, id, bio]);

  if (isLoading || !biodata) return <div className="text-center text-lg mt-20">Loading...</div>;

  const handleAddToFavorites = async () => {

    try {
      const bio = {
        name: biodata.name,
        bio_id: biodata.bio_id,
        author_email: user.email,
        permanent_division: biodata.permanent_division,
        occupation: biodata.occupation
      }
      const result = await axiosSecure.post("/favourites", bio)
      toast.success("Added to Favorite List!")
    } catch (err) {
      console.log(err)
      toast.error("Failed to Added!")
    }
  };

  const handleRequestContactInfo = () => {
    navigate(`/checkout/${biodata.bio_id}`);
  };

  return (
    <div className="section-container pb-10">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img src={biodata.profile_image} alt="Profile" className="w-40 h-40 rounded-full border-4 border-gray-300" />
          <div>
            <h2 className="text-2xl font-semibold">{biodata.name}</h2>
            <div className="flex justify-between gap-12 my-8">
              <div>

                <p className="text-gray-700">Present Division: <b>{biodata.present_division}</b></p>
                <p className="text-gray-700">Permanent Division: <b>{biodata.permanent_division}</b></p>
                <p className="text-gray-700">Occupation: <b>{biodata.occupation}</b></p>
                <p className="text-gray-700">Father Name: <b>{biodata.father_name}</b></p>
                <p className="text-gray-700">Mother Name: <b>{biodata.mother_name}</b></p>
                <p className="text-gray-700">Race: <b>{biodata.race}</b></p>
              </div>
              <div>
                <p className="text-gray-700">Date of Birdth: <b>{biodata.dob}</b></p><p className="text-gray-700">Age: {biodata.age} years</p>
                <p className="text-gray-700">Height: <b>{biodata.height}</b></p>
                <p className="text-gray-700">Weight: <b>{biodata.weight}</b></p>
                <p className="text-gray-700">Excepted Partner Height: <b>{biodata.expected_partner_height}</b></p>
                <p className="text-gray-700">Excepted Partner Weight: <b>{biodata.expected_partner_weight}</b></p>
                <p className="text-gray-700">Excepted Partner Age: <b>{biodata.expectedPartnerAge}</b></p>
              </div>
            </div>



            {isPremium ? (
              <>
                <p className="text-gray-700">📧 Email: {biodata.email}</p>
                <p className="text-gray-700">📞 Phone: {biodata.mobile}</p>
              </>
            ) : (
              <p className="text-gray-500 italic mt-2">🔒 Contact information is only available for premium members.</p>
            )}

            <div className="mt-4 flex gap-4">
              <button onClick={handleAddToFavorites} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add to Favorites</button>
              {!isPremium && (
                <button onClick={handleRequestContactInfo} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                  Request Contact Information
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">🔍 Similar Biodata</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarBiodatas.map((b) => (
            <div key={b.bio_id} className="bg-gray-100 p-4 shadow-lg rounded-lg text-center">
              <img src={b.profile_image} alt="Profile" className="w-20 h-20 mx-auto rounded-full border-2 border-gray-300" />
              <h4 className="text-lg font-semibold">{b.gender}</h4>
              <p className="text-gray-600">{b.present_division}</p>
              <p className="text-gray-600">{b.age} years</p>
              <p className="text-gray-600">{b.occupation}</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => navigate(`/biodata/${b.bio_id}`)}>
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiodataDetails;
