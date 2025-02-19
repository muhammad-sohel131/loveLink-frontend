export default function Membership() {
    return (
      <section className="section-container py-10">
        <h3 className="text-3xl font-bold mb-6">Membership Plans</h3>
        {/* Membership Comparison Table */}
        <div className="mt-10 bg-white p-8 rounded-lg shadow-lg"> 
          <table className="w-full mt-2 border-collapse">
            <thead>
              <tr className="bg-[#e57339] text-white">
                <th className="p-3">Feature</th>
                <th className="p-3">Normal</th>
                <th className="p-3">Premium</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Profile View", "Limited", "Unlimited"],
                ["Messaging", "Restricted", "Unlimited Chat"],
                ["Advanced Filters", "Basic", "Exclusive Filters"],
                ["Match Priority", "Standard", "Higher Visibility"],
                ["Ad-Free Experience", "No", "Yes"],
              ].map(([feature, normal, premium], index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 text-gray-700">{feature}</td>
                  <td className="p-3 text-center text-gray-600">{normal}</td>
                  <td className="p-3 text-center font-bold">{premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
  