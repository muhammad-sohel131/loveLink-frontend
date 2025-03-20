/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

function SimilarBio({similarBios}) {
  return (
    <div className="mt-10">
        <h3 className="text-3xl font-bold mb-4">Similar Biodata</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarBios.map((profile) => (
            <div
              key={profile.bio_id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex flex-col gap-2">
                <img
                  src={profile.profile_image}
                  alt="Profile"
                  className="object-cover rounded-lg h-[240px]"
                />
                <div className="text-left">
                  <h3 className="text-lg font-semibold mt-4">
                    <b>ID: </b>
                    {profile.bio_id}
                  </h3>
                  <p>
                    <b>Gender: </b>
                    {profile.gender}
                  </p>
                  <p>
                    <b>Permanent Address: </b>
                    {profile.permanent_division}
                  </p>
                  <p>
                    <b>Age: </b>
                    {profile.age}
                  </p>
                  <p>
                    <b>Occupation: </b>
                    {profile.occupation}
                  </p>
                </div>
              </div>
              <Link className="mt-4 bg-[#e57339] text-white w-full py-2 rounded-md hover:bg-[#e07339] block text-center transition" to={`/biodata/${profile.bio_id}`}>View Profile</Link>
            </div>
          ))}
        </div>
      </div>
  )
}

export default SimilarBio