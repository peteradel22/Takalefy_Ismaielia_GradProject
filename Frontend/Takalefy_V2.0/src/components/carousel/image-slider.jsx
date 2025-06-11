import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import image1 from '../../assets/i.jpg';
import image2 from '../../assets/o.jpg';
import image3 from '../../assets/p.jpg';

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 200, 
    appendDots: dots => (
      <div style={{ position: 'absolute', bottom: '7%', left: '93%', transform: 'translateX(-50%)', zIndex: 20 }}>
        <ul style={{ display: 'flex', gap: '12px', padding: 0, margin: 0 }}>{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div style={{
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        backgroundColor: 'rgba(96, 82, 82, 0.4)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }} />
    )
  };

  const slides = [
    {
      image: image1,
      title: "Smart Budgeting",
      description: "Plan your monthly expenses and income with smart budgeting tools designed to grow your savings.",
      link: "#"
    },
    {
      image: image2,
      title: "Track Your Expenses",
      description: "Visualize your financial habits with clear blue-themed analytics and spending charts.",
      link: "#"
    },
    {
      image: image3,
      title: "Financial Goals",
      description: "Set long-term financial goals and measure your progress using our tools built for precision.",
      link: "#"
    }
  ];

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="relative w-full h-screen">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                <div className="max-w-2xl space-y-6 p-8 rounded-xl backdrop-blur-sm"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    boxShadow: '0 0 30px rgba(0,0,0,0.4) inset'
                  }}>
                  <h2 className="text-5xl font-bold mb-6 drop-shadow-2xl">{slide.title}</h2>
                  <p className="text-xl leading-relaxed opacity-95 mb-8 font-medium">{slide.description}</p>
                  <a href={slide.link} className="inline-block px-8 py-4 bg-white/20 backdrop-blur-lg text-lg font-semibold rounded-lg hover:bg-white/30 transition-all border-2 border-white/40 shadow-lg">
                    Visit our Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style>{`
        .slick-dots li.slick-active div {
          background-color: rgba(33, 149, 202, 0.95) !important;
          transform: scale(1.4);
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }
        h2 { text-shadow: 0 3px 6px rgba(0,0,0,0.6) !important; }
        p { text-shadow: 0 2px 4px rgba(0,0,0,0.4) !important; }
      `}</style>
    </div>
  );
};

export default ImageSlider;
