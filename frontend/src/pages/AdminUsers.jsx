import React from 'react'
import PageTransition from '../components/PageTransition'
import AdminUsersTable from '../components/AdminUsersTable'

export default function AdminUsers() {
  return (
    <PageTransition>
      <section className="py-6">
        <div className="container">
          <AdminUsersTable />
        </div>
      </section>
    </PageTransition>
  )
}
