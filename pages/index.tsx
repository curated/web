import React from 'react'
import Link from 'next/link'

export default () => (
  <nav>
    <Link href="/search" as="/search">
      <a>Search</a>
    </Link>
  </nav>
)
