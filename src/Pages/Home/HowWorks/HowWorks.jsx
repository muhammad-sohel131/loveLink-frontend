import React from 'react'

export default function HowWorks() {
  return (
    <section className="section-container py-10">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">1. Register</h3>
            <p className="mt-2 text-gray-600">Create your account in just a few minutes.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">2. Find Matches</h3>
            <p className="mt-2 text-gray-600">Browse and filter profiles to find your best match.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">3. Connect</h3>
            <p className="mt-2 text-gray-600">Send messages and get to know each other.</p>
          </div>
        </div>
      </section>
  )
}
