import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import Title from '../Title/Title';
import './CategorySlider.css';
import { Area, AreaWithImage } from './categorySliderTypes';

const CategorySlider = () => {
  const [areas, setAreas] = useState<AreaWithImage[]>([]);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          centerPadding: '20px',
          slidesToShow: 1,
        },
      },
    ],
  };

  // Fetch areas and representative images
  useEffect(() => {
    const fetchAreasWithImages = async () => {
      try {
        const areaResponse = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
        );
        const areaList = areaResponse.data.meals;

        const areasWithImages = await Promise.all(
          areaList.map(async (area: Area) => {
            const mealResponse = await axios.get(
              `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area.strArea}`
            );
            const meal = mealResponse.data.meals[0];
            return {
              area: area.strArea,
              image: meal.strMealThumb,
              idMeal: meal.idMeal,
            };
          })
        );

        setAreas(areasWithImages);
      } catch (error) {
        console.error('Error fetching areas and images:', error);
      }
    };

    fetchAreasWithImages();
  }, []);

  return (
    <>
      <Title>Get Recipes from Around the World</Title>
      <Slider {...settings} className="categories__slider">
        {areas.map((area) => (
          <div key={area.area} className="categories__slider-area-item">
            <div className="categories__slider-area-image">
              <img
                src={area.image}
                alt={area.area}
                className="categories__slider-slider-image"
              />
              <div className="categories__slider-overlay">
                <p className="categories__slider-area-name">{area.area}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default CategorySlider;
