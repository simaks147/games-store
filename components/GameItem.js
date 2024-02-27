import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"
import Flex from "./Flex"
import { forwardRef } from "react"

const StyledGameItem = styled.div`
  flex-basis: 100%;
  background-color: #fff;
  @media ${props => props.theme.media.lg} {
    flex-basis: 40%;
    flex-grow: 1;
    align-self: flex-start;
    max-width: calc(50% - 10px);
  }
  .image {
    width: 150px;
    height: 80px;
    position: relative;
    min-width: 150px;
    margin-right: 10px;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  .name {
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 15px;
  }

  .release {
    margin-bottom: 10px;
  }
  & > a {
    display: block;
    padding: 10px;
    transition: box-shadow .25s;
    @media ${props => props.theme.media.lg} {
      padding: 20px;
    }
    &:hover {
      box-shadow: 0 0 15px rgba(0,0,0,.15);
    }
  }
`

export default forwardRef(function GameItem({ game }, ref) {
  const { name, slug, rating, released, background_image } = game
  return (
    <StyledGameItem ref={ref}>
      <Link href={`/game/${slug}`}>
        <Flex>
          <figure className="image">
            {background_image && <Image src={background_image} alt={name} width={150} height={80} />}
          </figure>
          <div className="content">
            <div className="name">{name}</div>
            <div className="release">Released: {released}</div>
            <div className="rating">Rating: {rating}</div>
          </div>
        </Flex>
      </Link>
    </StyledGameItem>
  )
})
