import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { addCarThunk, fetchCarsThunk } from '../feetures/carsSlices.js'
import { toast } from 'react-toastify'

export default function AdminAddCarForm({ onSuccess }) {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    name: '',
    brand: '',
    rentPerDay: '',
    cetagory: '',
    rating: '',
    status: 'available',
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (!imageFile) { setImagePreview(''); return }
    const url = URL.createObjectURL(imageFile)
    setImagePreview(url)
    return () => URL.revokeObjectURL(url)
  }, [imageFile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
  }

  const reset = () => {
    setForm({ name: '', brand: '', rentPerDay: '', cetagory: '', rating: '', status: 'available' })
    setImageFile(null)
    setImagePreview('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.brand || !form.rentPerDay || !form.cetagory) return
    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('brand', form.brand)
      fd.append('rentPerDay', String(form.rentPerDay))
      fd.append('cetagory', form.cetagory)
      if (form.rating) fd.append('rating', String(form.rating))
      fd.append('status', form.status || 'available')
      if (imageFile) fd.append('image', imageFile)
      // Use Redux thunk to add car via api.js (multipart)
      const added = await dispatch(addCarThunk(fd)).unwrap()
      // Refresh list (optional)
      dispatch(fetchCarsThunk())
      if (toast) try { toast.success('Car added successfully') } catch {}
      onSuccess?.(added)
      reset()
    } catch (err) {
      console.error(err)
      if (toast) { try { toast.error('Failed to add car') } catch {} }
      else { alert('Failed to add car. Please check fields and try again.') }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div className='rounded-2xl bg-white ring-1 ring-black/10 shadow-sm p-4 md:p-6' initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className='heading-3 mb-4'>Add New Car</h2>
      <form onSubmit={submit} className='grid grid-cols-1 gap-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-800'>Name</label>
            <input name='name' value={form.name} onChange={handleChange} className='input bg-white ring-1 ring-gray-300 focus:ring-2 focus:ring-[#1089ff]' placeholder='e.g. Civic' required />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-800'>Brand</label>
            <input name='brand' value={form.brand} onChange={handleChange} className='input bg-white ring-1 ring-gray-300 focus:ring-2 focus:ring-[#1089ff]' placeholder='e.g. Honda' required />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-800'>Rent Per Day ($)</label>
            <input type='number' min='0' name='rentPerDay' value={form.rentPerDay} onChange={handleChange} className='input bg-white ring-1 ring-gray-300 focus:ring-2 focus:ring-[#1089ff]' placeholder='e.g. 65' required />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-800'>Category</label>
            <input name='cetagory' value={form.cetagory} onChange={handleChange} className='input bg-white ring-1 ring-gray-300 focus:ring-2 focus:ring-[#1089ff]' placeholder='e.g. sedan' required />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-800'>Rating</label>
            <input type='number' min='0' max='5' step='0.1' name='rating' value={form.rating} onChange={handleChange} className='input bg-white ring-1 ring-gray-300 focus:ring-2 focus:ring-[#1089ff]' placeholder='e.g. 4.6' />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-800'>Status</label>
            <select name='status' value={form.status} onChange={handleChange} className='input bg-white ring-1 ring-gray-300 focus:ring-2 focus:ring-[#1089ff]'>
              <option value='available'>Available</option>
              <option value='booked'>Booked</option>
            </select>
          </div>
        </div>

        <div className='rounded-2xl ring-1 ring-gray-100 p-4 bg-white grid grid-cols-1 md:grid-cols-3 gap-4 items-start'>
          <div className='md:col-span-2 flex flex-col gap-2'>
            <label className='text-sm font-medium text-gray-800'>Image</label>
            <input ref={fileInputRef} type='file' accept='image/*' onChange={handleFile} className='input bg-white ring-1 ring-gray-300 focus:ring-2 focus:ring-[#1089ff]' />
            <p className='text-xs text-gray-500'>Max 5MB • jpg, jpeg, png, gif</p>
          </div>
          <div className='rounded-xl ring-1 ring-gray-200 bg-gray-50 overflow-hidden w-full h-40 md:h-44 flex items-center justify-center'>
            {imagePreview ? (
              <img src={imagePreview} alt='preview' className='w-full h-full object-cover' />
            ) : (
              <span className='text-xs text-gray-500'>Image preview</span>
            )}
          </div>
        </div>

        <div className='sticky bottom-0 md:static flex gap-2 justify-end pt-3 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-t border-gray-100 z-10 rounded-b-2xl'>
          <button type='button' className='btn btn-secondary' onClick={reset} disabled={submitting}>Reset</button>
          <button type='submit' className='btn btn-primary' disabled={submitting}>
            {submitting ? 'Adding…' : 'Add Car'}
          </button>
        </div>
      </form>
    </motion.div>
  )
}
