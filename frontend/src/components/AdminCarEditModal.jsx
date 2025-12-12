import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux'
import { updateCarByIdThunk } from '../feetures/carsSlices.js'
import { toast } from 'react-toastify'

export default function AdminCarEditModal({ car, onClose }) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(!!car)
  const [form, setForm] = useState({ name: '', brand: '', rentPerDay: '', cetagory: '', rating: '', status: 'available' })

  useEffect(() => {
    setOpen(!!car)
    if (car) {
      setForm({
        name: car.name || '',
        brand: car.brand || '',
        rentPerDay: car.rentPerDay ?? car.pricePerDay ?? '',
        cetagory: car.cetagory || car.category || '',
        rating: car.rating ?? '',
        status: car.status || 'available',
      })
    }
  }, [car])

  if (!open) return null

  const submit = async (e) => {
    e.preventDefault()
    if (!car) return
    try {
      const updates = {
        name: form.name,
        brand: form.brand,
        rentPerDay: Number(form.rentPerDay),
        cetagory: form.cetagory,
        rating: form.rating ? Number(form.rating) : undefined,
        status: form.status,
      }
      await dispatch(updateCarByIdThunk({ id: car.id || car._id, updates })).unwrap()
      if (toast) try { toast.success('Car updated') } catch {}
      onClose?.()
    } catch (e) {
      if (toast) try { toast.error('Failed to update car') } catch {}
      else alert('Failed to update car')
    }
  }

  const body = (
    <div className='fixed inset-0 z-[1000]'>
      <div className='absolute inset-0 bg-black/30' onClick={onClose} />
      <div className='absolute left-1/2 top-[10vh] -translate-x-1/2 w-[95%] max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 p-4 md:p-6'>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='heading-3'>Edit Car</h3>
          <button className='btn' onClick={onClose}>Close</button>
        </div>
        <form onSubmit={submit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-800'>Name</label>
            <input className='input' value={form.name} onChange={e=>setForm(f=>({ ...f, name: e.target.value }))} required />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-800'>Brand</label>
            <input className='input' value={form.brand} onChange={e=>setForm(f=>({ ...f, brand: e.target.value }))} required />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-800'>Rent Per Day ($)</label>
            <input type='number' className='input' min='0' value={form.rentPerDay} onChange={e=>setForm(f=>({ ...f, rentPerDay: e.target.value }))} required />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-800'>Category</label>
            <input className='input' value={form.cetagory} onChange={e=>setForm(f=>({ ...f, cetagory: e.target.value }))} />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-800'>Rating</label>
            <input type='number' className='input' min='0' max='5' step='0.1' value={form.rating} onChange={e=>setForm(f=>({ ...f, rating: e.target.value }))} />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-800'>Status</label>
            <select className='input' value={form.status} onChange={e=>setForm(f=>({ ...f, status: e.target.value }))}>
              <option value='available'>Available</option>
              <option value='booked'>Booked</option>
            </select>
          </div>
          <div className='md:col-span-2 flex gap-2 justify-end'>
            <button type='button' className='btn btn-secondary' onClick={onClose}>Cancel</button>
            <button type='submit' className='btn btn-primary'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )

  return createPortal(body, document.body)
}
