import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { fetchCarsThunk, selectAllCars, selectCarsError, selectCarsLoading } from '../feetures/carsSlices.js'

export default function AdminCarsTable() {
  const dispatch = useDispatch()
  const cars = useSelector(selectAllCars)
  const loading = useSelector(selectCarsLoading)
  const error = useSelector(selectCarsError)

  useEffect(() => { dispatch(fetchCarsThunk()) }, [dispatch])

  return (
    <div className='w-full max-w-full'>
      {error && <div className='text-red-600 text-sm mb-2'>{String(error)}</div>}
      <div className='overflow-x-auto rounded-lg ring-1 ring-black/10 bg-white shadow'>
        <table className='min-w-full text-xs sm:text-sm table-auto'>
          <thead className='bg-gray-50 sticky top-0 z-10'>
            <tr>
              <th className='text-left px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 whitespace-nowrap'>Car</th>
              <th className='text-left px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 whitespace-nowrap'>Brand</th>
              <th className='text-left px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 whitespace-nowrap'>Rent/Day</th>
              <th className='text-left px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 whitespace-nowrap'>Status</th>
              <th className='px-3 sm:px-4 py-2 sm:py-3' />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5} className='px-4 py-4 text-gray-500'>Loading cars…</td></tr>
            )}
            {!loading && (!cars || cars.length === 0) && (
              <tr><td colSpan={5} className='px-4 py-4 text-gray-500'>No cars found.</td></tr>
            )}
            {!loading && (cars||[]).map((c) => (
              <tr key={c.id || c._id} className='border-t border-gray-100'>
                <td className='px-3 sm:px-4 py-2 sm:py-3'>
                  <div className='flex items-center gap-3 min-w-0'>
                    <div className='w-14 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0'>
                      {c.imageURL || c.imageUrl ? (
                        <img src={c.imageURL || c.imageUrl} alt={c.name} className='w-full h-full object-cover' />
                      ) : <div className='w-full h-full' />}
                    </div>
                    <div className='min-w-0'>
                      <div className='font-medium text-gray-800 truncate'>{c.name || '—'}</div>
                      <div className='text-xs text-gray-500 truncate'>{c.cetagory || '—'}</div>
                    </div>
                  </div>
                </td>
                <td className='px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap'>{c.brand || '—'}</td>
                <td className='px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap'>${Number(c.rentPerDay || c.pricePerDay || 0)}</td>
                <td className='px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap capitalize'>{c.status || 'available'}</td>
                <td className='px-3 sm:px-4 py-2 sm:py-3 text-right'></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
