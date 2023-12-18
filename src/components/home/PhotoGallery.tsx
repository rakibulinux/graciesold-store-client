import Image from "next/image";
import Slider from "../product/Slider";
import Offer from "../product/Offer";

const divStyle = {
  backgroundImage: `url('https://lh3.googleusercontent.com/p/AF1QipMxmxBbiu6_PZrulaABosokl-QuXFUU1y09wAz9=s1600-w1600-h1600?width=1000')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "100%",
  paddingTop: "100%",
};

const PhotoGallery = () => {
  return (
    <section>
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative w-full aspect-video rounded-md h-64 overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt="Product image 1"
            src="/images/1.jpg"
          />
        </div>
        <div className="relative w-full aspect-video rounded-md h-64 overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt="Product image 2"
            src="/images/2.jpg"
          />
        </div>
        <div className="relative w-full aspect-video rounded-md h-64 overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt="Product image 3"
            src="/images/3.jpg"
          />
        </div>
        <div className="relative w-full aspect-video rounded-md h-64 overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt="Product image 4"
            src="/images/4.jpg"
          />
        </div>
        {/* <div style={divStyle}></div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="https://www.europeanbusinessreview.com/wp-content/uploads/2023/05/shutterstock_362232446-696x464.jpg"
            alt=""
            width={250}
            height={250}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="https://lh3.googleusercontent.com/p/AF1QipPg1avoYxh9aC1MGtaS_iEAkHUpG-9dvmOD-Pnt=s1600-w1600-h1600?width=1000"
            alt=""
            width={250}
            height={250}
          />
        </div> */}
      </div>
      <div className="block md:hidden">
        <Slider />
      </div>
      {/* <Offer /> */}
    </section>
  );
};

export default PhotoGallery;
