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

  // Default pricing values per column; can be customized per car later
  const pricing = {
    hour: { price: "$10.99", sub: "/per hour", note: "$3/hour fuel surcharges" },
    day: { price: "$60.99", sub: "/per day", note: "$3/hour fuel surcharges" },
    lease: { price: "$995.99", sub: "/per month", note: "$3/hour fuel surcharges" },
  };

  return (
    <section className="w-full px-4 md:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
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
            {/* Tabs header (visual only, columns remain visible) */}
            <div className="flex rounded-md  overflow-hidden">
              {tabs.map((t) => (
                <div
                  key={t.key}
                  className={`flex-1 py-3 px-5 text-center font-semibold text-md tracking-wide ${t.color}`}
                >
                  {t.label}
                </div>
              ))}
            </div>

            {/* Per-car rows: each car has 3 pricing columns */}
            <div className="mt-4 space-y-5">
              {cars.map((c) => (
                <div key={`row-${c.id}`} className="grid grid-cols-1 md:grid-cols-3 gap-1">
                  {/* Hour column */}
                  <div className="group px-4 py-4 rounded-md  bg-gray-50 transition-colors hover:bg-[#01d28e]/90 min-h-36">
                    <div className="text-[#1089ff] text-xl font-bold flex items-baseline gap-2">{pricing.hour.price}<span className="text-gray-500 font-normal">{pricing.hour.sub}</span></div>
                    <div className="text-gray-600 text-sm">{pricing.hour.note}</div>
                    <button className="mt-3 inline-flex items-center justify-center px-3 py-2 bg-[#1089ff] text-white rounded text-sm font-medium opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">Rent Now</button>
                  </div>
                  {/* Day column */}
                  <div className="group px-4 py-4 rounded-md shadow-sm bg-gray-50 transition-colors hover:bg-[#01d28e]/90 min-h-36">
                    <div className="text-[#1089ff] text-xl font-bold flex items-baseline gap-2">{pricing.day.price}<span className="text-gray-500 font-normal">{pricing.day.sub}</span></div>
                    <div className="text-gray-600 text-sm">{pricing.day.note}</div>
                    <button className="mt-3 inline-flex items-center justify-center px-3 py-2 bg-[#1089ff] text-white rounded text-sm font-medium opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">Rent Now</button>
                  </div>
                  {/* Lease column */}
                  <div className="group px-4 py-4 rounded-md shadow-sm bg-gray-50 transition-colors hover:bg-[#01d28e]/90 min-h-36">
                    <div className="text-[#1089ff] text-xl font-bold flex items-baseline gap-2">{pricing.lease.price}<span className="text-gray-500 font-normal">{pricing.lease.sub}</span></div>
                    <div className="text-gray-600 text-sm">{pricing.lease.note}</div>
                    <button className="mt-3 inline-flex items-center justify-center px-3 py-2 bg-[#1089ff] text-white rounded text-sm font-medium opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">Rent Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricePage