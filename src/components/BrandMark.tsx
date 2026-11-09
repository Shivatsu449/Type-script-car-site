import { Link } from 'react-router-dom'

export default function BrandMark() {
  return (
    <Link className="brand-mark" to="/" aria-label="NOIR MACHINES — на главную">
      <span className="brand-mark__dot" />
      <span>NOIR</span>
      <strong>MACHINES</strong>
    </Link>
  )
}
