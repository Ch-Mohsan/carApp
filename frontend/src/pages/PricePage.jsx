import React, { useMemo, useState } from 'react'



function PricePage() {
  const cars = useMemo(() => ([
    { id: 1, img: "/images/car-1.jpg", title: "Cheverolet SUV Car", rating: 4 },
    { id: 2, img: "/images/car-2.jpg", title: "Cheverolet SUV Car", rating: 4 },
    { id: 3, img: "/images/car-3.jpg", title: "Cheverolet SUV Car", rating: 4 },
    { id: 4, img: "/images/car-4.jpg", title: "Cheverolet SUV Car", rating: 4 },
  ]), []);

  const tabs = [
    { key: "hour", label: "Per Hour Rate", color: "bg-[#1089ff] text-white" },
    { key: "day", label: "Per Day Rate", color: "bg-[#343a40] text-white" },
    { key: "lease", label: "Leasing", color: "bg-black text-white" },
  ];
  const [active, setActive] = useState("hour");

  const pricing = {
    hour: [{ price: "$10.99", sub: "/per hour", note: "$3/hour fuel surcharges" }],
    day: [{ price: "$60.99", sub: "/per day", note: "$3/hour fuel surcharges" }],
    lease: [{ price: "$995.99", sub: "/per month", note: "$3/hour fuel surcharges" }],
  };

  return (
    <section className="w-full px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {cars.map((c) => (
                <div key={c.id} className="flex items-center gap-6">
                  <div className="w-40 h-28 rounded-md overflow-hidden shadow-sm">
                    <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">{c.title}</h3>
                    <div className="mt-2 text-sm text-gray-600">rated:
                      <span className="inline-flex items-center ml-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} className={`mx-0.5 ${i < c.rating ? 'text-[#01d28e]' : 'text-gray-300'}`}>★</span>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex rounded-md overflow-hidden shadow-sm">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`flex-1 py-4 px-6 text-center font-semibold ${active === t.key ? t.color : 'bg-gray-100 text-gray-700'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 mt-0 gap-6">
              <div className={`group p-6 rounded-xl shadow-md flex flex-col items-start gap-3 transition-colors ${active === 'hour' ? 'bg-white' : 'bg-gray-50'} hover:bg-[#01d28e]/90`}>
                <div className="text-[#1089ff] text-2xl font-bold">{pricing.hour[0].price}
                  <span className="text-gray-500 text-base font-normal"> {pricing.hour[0].sub}</span>
                </div>
                <div className="text-gray-700">{pricing.hour[0].note}</div>
                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                  <li>Unlimited mileage within city limits</li>
                  <li>Basic insurance included</li>
                  <li>24/7 roadside assistance</li>
                </ul>
                <button className="mt-4 hidden group-hover:inline-flex items-center justify-center px-4 py-2.5 bg-[#1089ff] text-white rounded-md font-semibold">Rent Now</button>
              </div>

              <div className={`group p-6 rounded-xl shadow-md flex flex-col items-start gap-3 transition-colors ${active === 'day' ? 'bg-white' : 'bg-gray-50'} hover:bg-[#01d28e]/90`}>
                <div className="text-[#1089ff] text-2xl font-bold">{pricing.day[0].price}
                  <span className="text-gray-500 text-base font-normal"> {pricing.day[0].sub}</span>
                </div>
                <div className="text-gray-700">{pricing.day[0].note}</div>
                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                  <li>Free pickup & drop-off</li>
                  <li>Collision damage waiver</li>
                  <li>Flexible cancellation policy</li>
                </ul>
                <button className="mt-4 hidden group-hover:inline-flex items-center justify-center px-4 py-2.5 bg-[#1089ff] text-white rounded-md font-semibold">Rent Now</button>
              </div>

              <div className={`group p-6 rounded-xl shadow-md flex flex-col items-start gap-3 transition-colors ${active === 'lease' ? 'bg-white' : 'bg-gray-50'} hover:bg-[#01d28e]/90`}>
                <div className="text-[#1089ff] text-2xl font-bold">{pricing.lease[0].price}
                  <span className="text-gray-500 text-base font-normal"> {pricing.lease[0].sub}</span>
                </div>
                <div className="text-gray-700">{pricing.lease[0].note}</div>
                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                  <li>Comprehensive maintenance</li>
                  <li>Zero down payment options</li>
                  <li>Upgrade eligible after 12 months</li>
                </ul>
                <button className="mt-4 hidden group-hover:inline-flex items-center justify-center px-4 py-2.5 bg-[#1089ff] text-white rounded-md font-semibold">Rent Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricePage