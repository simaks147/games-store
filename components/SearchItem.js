import styled from "styled-components";
import Link from "next/link";
import Flex from "./Flex";
import Image from "next/image";

export const StyledSearchItem = styled.div`
  a {
    display: block;
    padding: 10px 15px;
    &:hover {
      background-color: lightsteelblue;
    }
  }
  .image {
    width: 60px;
    height: 35px;
    position: relative;
    min-width: 30px;
    margin-right: 15px;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  .name {
    font-weight: 600;
  }
`

export default function SearchItem({ game }) {
  const { name, slug, background_image } = game
  return (
    <StyledSearchItem>
      <Link href={`/game/${slug}`}>
        <Flex>
          <figure className="image">
            {background_image && <Image src={background_image} alt={name} width={60} height={35} />}
          </figure>
          <div className="name">{name}</div>
        </Flex>
      </Link>
    </StyledSearchItem>
  )
}
