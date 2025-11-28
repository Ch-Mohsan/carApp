import React, { useMemo, useState } from "react";
import {useDispatch,useSelector } from 'react-redux';

// Grid of car cards with dot-number pagination
// - Shows 12 items per page (4 rows x 3 columns)
// - Pagination dots 1..4; active dot has blue background and white text
// - Clicking a dot updates displayed cars
export default function CarCard({ cars }) {
 const dispatch = useDispatch();
  const PAGE_SIZE = 12; // 4 rows * 3 columns
  const TOTAL_PAGES = 4; // as requested

  const data = useMemo(() => {
    // Provide fallback demo data if no cars provided
    if (cars && cars.length) return cars;
    const demo = [
      { id: 1, img: "/images/car-1.jpg", title: "Mercedes Grand Sedan", brand: "Chevrolet", price: "$500" },
      { id: 2, img: "/images/car-2.jpg", title: "Range Rover", brand: "Subaru", price: "$500" },
      { id: 3, img: "/images/car-3.jpg", title: "Mercedes Grand Sedan", brand: "Chevrolet", price: "$500" },
      { id: 4, img: "/images/car-4.jpg", title: "Mercedes Grand Sedan", brand: "Chevrolet", price: "$500" },
      { id: 5, img: "/images/car-5.jpg", title: "Mercedes Grand Sedan", brand: "Chevrolet", price: "$500" },
      { id: 6, img: "/images/car-6.jpg", title: "Mercedes Grand Sedan", brand: "Chevrolet", price: "$500" },
      { id: 7, img: "/images/car-7.jpg", title: "Mercedes Grand Sedan", brand: "Chevrolet", price: "$500" },
      { id: 8, img: "/images/car-8.jpg", title: "Mercedes Grand Sedan", brand: "Chevrolet", price: "$500" },
      { id: 9, img: "/images/car-9.jpg", title: "Mercedes Grand Sedan", brand: "Chevrolet", price: "$500" },
      { id: 10, img: "/images/car-10.jpg", title: "Mercedes Grand Sedan", brand: "Chevrolet", price: "$500" },
      { id: 11, img: "/images/car-11.jpg", title: "Mercedes Grand Sedan", brand: "Chevrolet", price: "$500" },
      { id: 12, img: "/images/car-12.jpg", title: "Mercedes Grand Sedan", brand: "Chevrolet", price: "$500" },
      // extra items to simulate multiple pages
      { id: 13, img: "/images/car-1.jpg", title: "Sport Coupe", brand: "BMW", price: "$650" },
      { id: 14, img: "/images/car-2.jpg", title: "City Compact", brand: "Honda", price: "$300" },
      { id: 15, img: "/images/car-3.jpg", title: "Family Van", brand: "Toyota", price: "$420" },
      { id: 16, img: "/images/car-4.jpg", title: "Luxury SUV", brand: "Audi", price: "$700" },
      { id: 17, img: "/images/car-5.jpg", title: "Convertible", brand: "Mercedes", price: "$750" },
      { id: 18, img: "/images/car-6.jpg", title: "Hatchback", brand: "Kia", price: "$280" },
      { id: 19, img: "/images/car-7.jpg", title: "Off-road", brand: "Jeep", price: "$520" },
      { id: 20, img: "/images/car-8.jpg", title: "Electric", brand: "Tesla", price: "$800" },
      { id: 21, img: "/images/car-9.jpg", title: "Sedan", brand: "Nissan", price: "$350" },
      { id: 22, img: "/images/car-10.jpg", title: "Wagon", brand: "Volvo", price: "$440" },
      { id: 23, img: "/images/car-11.jpg", title: "Pickup", brand: "Ford", price: "$560" },
      { id: 24, img: "/images/car-12.jpg", title: "Compact SUV", brand: "Hyundai", price: "$390" },
      // page 3
      { id: 25, img: "/images/car-1.jpg", title: "Coupe", brand: "Toyota", price: "$410" },
      { id: 26, img: "/images/car-2.jpg", title: "Roadster", brand: "Mazda", price: "$430" },
      { id: 27, img: "/images/car-3.jpg", title: "Crossover", brand: "Subaru", price: "$460" },
      { id: 28, img: "/images/car-4.jpg", title: "Grand Tourer", brand: "Aston Martin", price: "$990" },
      { id: 29, img: "/images/car-5.jpg", title: "Sport SUV", brand: "Porsche", price: "$950" },
      { id: 30, img: "/images/car-6.jpg", title: "Economy", brand: "Daihatsu", price: "$200" },
      { id: 31, img: "/images/car-7.jpg", title: "Executive", brand: "Jaguar", price: "$780" },
      { id: 32, img: "/images/car-8.jpg", title: "Hybrid", brand: "Lexus", price: "$720" },
      { id: 33, img: "/images/car-9.jpg", title: "Micro", brand: "Suzuki", price: "$180" },
      { id: 34, img: "/images/car-10.jpg", title: "Mid-size", brand: "Skoda", price: "$370" },
      { id: 35, img: "/images/car-11.jpg", title: "Full-size", brand: "Chevrolet", price: "$410" },
      { id: 36, img: "/images/car-12.jpg", title: "Muscle", brand: "Dodge", price: "$620" },
      // page 4
      { id: 37, img: "/images/car-1.jpg", title: "MPV", brand: "Toyota", price: "$450" },
      { id: 38, img: "/images/car-2.jpg", title: "Compact", brand: "Renault", price: "$260" },
      { id: 39, img: "/images/car-3.jpg", title: "Luxury", brand: "Genesis", price: "$880" },
      { id: 40, img: "/images/car-4.jpg", title: "Premium", brand: "Infiniti", price: "$820" },
      { id: 41, img: "/images/car-5.jpg", title: "Touring", brand: "BMW", price: "$840" },
      { id: 42, img: "/images/car-6.jpg", title: "Compact Van", brand: "VW", price: "$410" },
      { id: 43, img: "/images/car-7.jpg", title: "Sport", brand: "Toyota", price: "$510" },
      { id: 44, img: "/images/car-8.jpg", title: "Cabriolet", brand: "Audi", price: "$910" },
      { id: 45, img: "/images/car-9.jpg", title: "Estate", brand: "Peugeot", price: "$350" },
      { id: 46, img: "/images/car-10.jpg", title: "Pickup", brand: "Isuzu", price: "$480" },
      { id: 47, img: "/images/car-11.jpg", title: "Utility", brand: "Mitsubishi", price: "$390" },
      { id: 48, img: "/images/car-12.jpg", title: "Crossover", brand: "Nissan", price: "$430" },
    ];
    return demo;
  }, [cars]);

  const [page, setPage] = useState(1);
  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, page]);

  return (
    <section className="w-full py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        

        {/* Grid: 3 columns across devices; results in 4 rows when 12 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {paged.map((s) => (
            <div key={s.id} className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="w-full h-48 sm:h-56 md:h-64">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800">{s.title}</h3>
                <p className="text-gray-500">{s.brand}</p>
                <p className="mt-2">
                  <span className="text-[#1089ff] font-bold">{s.price}</span>
                  <span className="text-gray-400"> /day</span>
                </p>
                <div className="flex gap-3 md:gap-4 mt-4">
                  <button className="px-4 py-2.5 md:px-5 md:py-3 bg-[#1089ff] hover:bg-[#0d75db] text-white rounded-md font-semibold">Book now</button>
                  <button className="px-4 py-2.5 md:px-5 md:py-3 bg-[#01d28e] hover:bg-[#00ba7d] text-white rounded-md font-semibold">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Numbered dot pagination 1..4 */}
        <div className="flex items-center justify-center gap-3 mt-10" aria-label="Pagination">
          {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-8 w-8 rounded-full border transition-colors flex items-center justify-center ${
                page === n ? "bg-[#1089ff] text-white border-transparent" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              aria-current={page === n ? "page" : undefined}
              aria-label={`Go to page ${n}`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
