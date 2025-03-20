import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SimilarBio from "../../Component/SimilarBio/SimilarBio";
import DataLoading from '../../Component/DataLoading/DataLoading'

const BioDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPremium, setPremium] = useState(true);
  const [biodata, setBiodata] = useState(null);
  const [similarBios, setSimilarBios] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(true)

  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: bioList, isLoading } = useQuery({
    queryKey: ["bioList"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/bios`);
      return result.data.biodatas;
    },
  });

  const { data: favouriteBios } = useQuery({
    queryKey: ["favouriteBios"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/favourites/${user.email}`);
      return result.data;
    },
  });

  const { data: bio } = useQuery({
    queryKey: ["userBio"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/bios/${user.email}`);
      return result.data;
    },
  });

  
  useEffect(() => {
    if (bioList) {
      const selectedBio = bioList.find(
        (b) => b.bio_id === parseInt(id)
      );
      if (selectedBio) {
        setBiodata(selectedBio);
        setSimilarBios(
          bioList
            .filter(
              (b) =>
                b.gender === selectedBio.gender &&
                b.bio_id !== selectedBio.bio_id
            )
            .slice(0, 3)
        );
      }
    }
    if (bio) {
      setPremium(bio.isPremium);
    }
    if (biodata && favouriteBios && bio) {
      const favBio = favouriteBios.filter((f) => f.bio_id === biodata.bio_id || biodata.bio_id === bio.bio_id);
      setBtnDisabled(favBio.length)
    }
  }, [bioList, id, bio, biodata, favouriteBios]);

  if (isLoading || !biodata)
    return <div className="text-center text-lg mt-20"><DataLoading /></div>;

  const handleAddToFavorites = async () => {
    try {
      const bio = {
        name: biodata.name,
        bio_id: biodata.bio_id,
        author_email: user.email,
        permanent_division: biodata.permanent_division,
        occupation: biodata.occupation,
      };
      await axiosSecure.post("/favourites", bio);
      toast.success("Added to Favorite List!");
      setBtnDisabled(true)
    } catch (err) {
      console.log(err);
      toast.error("Failed to Added!");
    }
  };

  const handleRequestContactInfo = () => {
    navigate(`/checkout/${biodata.bio_id}`);
  };

  return (
    <div className="section-container pb-10">
      <div className="p-6 bg-white shadow-md rounded-lg mt-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={biodata.profile_image}
            alt="Profile"
            className="lg:w-1/2 w-full h-[400px] object-cover rounded-sm border-4 border-gray-300"
          />
          <div>
            <h2 className="text-2xl font-semibold">{biodata.name}</h2>
            <div className="flex text-lg justify-between gap-12 my-8">
              <div>
                <p className="text-gray-700">
                  Present Division: <b>{biodata.present_division}</b>
                </p>
                <p className="text-gray-700">
                  Permanent Division: <b>{biodata.permanent_division}</b>
                </p>
                <p className="text-gray-700">
                  Occupation: <b>{biodata.occupation}</b>
                </p>
                <p className="text-gray-700">
                  Father Name: <b>{biodata.father_name}</b>
                </p>
                <p className="text-gray-700">
                  Mother Name: <b>{biodata.mother_name}</b>
                </p>
                <p className="text-gray-700">
                  Race: <b>{biodata.race}</b>
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  Date of Birdth: <b>{biodata.dob}</b>
                </p>
                <p className="text-gray-700">Age: {biodata.age} years</p>
                <p className="text-gray-700">
                  Height: <b>{biodata.height}</b>
                </p>
                <p className="text-gray-700">
                  Weight: <b>{biodata.weight}</b>
                </p>
                <p className="text-gray-700">
                  Excepted Partner Height:{" "}
                  <b>{biodata.expected_partner_height}</b>
                </p>
                <p className="text-gray-700">
                  Excepted Partner Weight:{" "}
                  <b>{biodata.expected_partner_weight}</b>
                </p>
                <p className="text-gray-700">
                  Excepted Partner Age: <b>{biodata.expectedPartnerAge}</b>
                </p>
              </div>
            </div>

            {isPremium ? (
              <>
                <p className="text-gray-700">Email: {biodata.email}</p>
                <p className="text-gray-700">Phone: {biodata.mobile}</p>
              </>
            ) : (
              <p className="text-gray-500 italic mt-2">
                Contact information is only available for premium members.
              </p>
            )}

            <div className="mt-4 flex gap-4">
              <button
                disabled={btnDisabled}
                onClick={handleAddToFavorites}
                className={`bg-[#e57339] text-white px-4 py-2 rounded ${btnDisabled && 'opacity-50'}`}
              >
                {btnDisabled? 'Added to Favorites' : 'Add to Favorites'}
              </button>
              {!isPremium && (
                <button
                  onClick={handleRequestContactInfo}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Request Contact Information
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* similar bio data */}
      <SimilarBio similarBios={similarBios} />
    </div>
  );
};

export default BioDetails;
