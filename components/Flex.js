import styled from "styled-components"

const StyledFlex = styled.div`
  display: flex;
  align-items: ${props => props.$align || 'stretch'};
  justify-content: ${props => props.$justify || 'stretch'};
  flex-wrap: ${props => props.$wrap || 'nowrap'};
  gap:  ${props => props.$gap || 0};
  flex-direction:  ${props => props.$direction || 'row'};
`

export default function Flex(props) {
  return (
    <StyledFlex {...props} />
  )
}
