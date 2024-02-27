'use client'

import { API_URL } from "@/const"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import styled from "styled-components"
import Container from "./Container"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from "next/image"
import Flex from "./Flex"
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import Logo from "./ui/Logo"
import Link from "next/link"

const StyledGame = styled.div`
  .content {
    flex-direction: column;
    margin-top: 20px;
    span {
      text-transform: uppercase;
    }
  }
  .swiper {
    width: 100%;
    height: 100%;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .name {
    font-size: 24px;
    line-height: 2;
  }
  .description {
    margin-top: 10px;
    line-height: 1.4;
  }
`

export default function Game() {
  const [game, setGame] = useState([])
  const [gameLoading, setGameLoading] = useState(false)
  const [gameError, setGameError] = useState(null)
  const [screenshots, setScreenshots] = useState([])
  const [screenshotsLoading, setScreenshotsLoading] = useState(false)
  const [screenshotsError, setScreenshotsError] = useState(null)

  const { slug } = useParams()

  useEffect(() => {
    fetchGame(`${API_URL}/games/${slug}?key=${process.env.apiKey}`)
    fetchScreenshots(`${API_URL}/games/${slug}/screenshots?key=${process.env.apiKey}`)
  }, [])

  const fetchGame = async (url) => {
    setGameLoading(true)

    try {
      const res = await fetch(url)
      const data = await res.json()
      setGame(data)
    } catch (e) {
      setGameError(e)
    }
    finally {
      setGameLoading(false)
    }
  }

  const fetchScreenshots = async (url) => {
    setScreenshotsLoading(true)

    try {
      const res = await fetch(url)
      const data = await res.json()
      setScreenshots(data.results)
    } catch (e) {
      setScreenshotsError(e)
    }
    finally {
      setScreenshotsLoading(false)
    }
  }

  const { name, released, rating, description_raw } = game

  return (
    <StyledGame>
      <Container>
        {game && <>
          <Link href='/'>
            <Logo />
          </Link>
          <Flex className="content">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
              }}
            >
              {screenshots.map(({ image, id }) => (
                <SwiperSlide key={id}>
                  {image && <Image src={image} alt={id} width={600} height={350} />}
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="name">{name}</div>
            <div className="released"><span>Released: </span>{released}</div>
            <div className="rating"><span>Rating: </span>{rating}</div>
            <div className="description">{description_raw}</div>
          </Flex>
        </>}
        {gameError && 'Failed to fetch data'}
        {gameLoading && 'Loading...'}
      </Container>
    </StyledGame>
  )
}
