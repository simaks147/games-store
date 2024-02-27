import styled from "styled-components"
import { PiGameControllerThin } from "react-icons/pi"
import Link from "next/link"

const StyledLogo = styled(PiGameControllerThin)`
  
`

export default function Logo() {
  return (
    <StyledLogo size={40} />
  )
}
