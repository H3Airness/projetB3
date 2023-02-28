import React from 'react'
import Carousel from 'better-react-carousel'

const Gallery = () => {
  return (
    <Carousel cols={1} rows={1} gap={10} loop autoplay={3000} showDots={true} dotColorActive={'#000000'}>
      <Carousel.Item>
        <img width="100%" src="https://t4.ftcdn.net/jpg/02/86/03/97/240_F_286039798_bSv7AUnD51WfrgG5w0rSabV3ujNvLgTn.jpg" />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%" src="https://t4.ftcdn.net/jpg/05/42/62/23/240_F_542622306_WJVksyeDFbSNe1xYr4EF8VMn4vgvUAq9.jpg" />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%" src="https://t4.ftcdn.net/jpg/04/52/66/91/240_F_452669128_ro9I4dD0DxEKuCubfMJgWRQRpS2csaSP.jpg" />
      </Carousel.Item>
    </Carousel>
  )
}

export default Gallery