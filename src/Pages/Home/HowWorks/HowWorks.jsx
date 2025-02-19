export default function HowWorks() {
  return (
    <section className="section-container py-10">
      <h2 className="text-3xl font-bold text-gray-800">Your Love Link Journey</h2>
      <p className="text-gray-600 mt-4">Follow these simple steps to find your perfect match!</p>

      {/* Steps Timeline */}
      <div className="mt-10 flex flex-col md:flex-row items-center justify-between">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center text-lg font-bold">1</div>
          <p className="mt-4 text-gray-700 font-semibold">Register & Create Profile</p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold">2</div>
          <p className="mt-4 text-gray-700 font-semibold">Find & Match with Profiles</p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center text-lg font-bold">3</div>
          <p className="mt-4 text-gray-700 font-semibold">Chat & Connect</p>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center text-lg font-bold">4</div>
          <p className="mt-4 text-gray-700 font-semibold">Meet & Start Your Journey</p>
        </div>
      </div>
    </section>
  );
}
