import styled from "styled-components"

const StyledContainer = styled.div`
  margin: 30px auto;
  max-width: 1200px;
  padding-left: 10px;
  padding-right: 10px;
  @media ${props => props.theme.media.sm} {
    padding-left: 20px;
    padding-right: 20px;
  }
`

export default function Container(props) {
  return (
    <StyledContainer {...props} />
  )
}