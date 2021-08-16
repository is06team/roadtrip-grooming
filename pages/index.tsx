import Link from 'next/link'

const IndexView = () => {
  return (
    <>
      <div>Index</div>
      <ul>
        <li>
          <Link href="/grooming">Grooming</Link>
        </li>
      </ul>
    </>
  )
}

export default IndexView
