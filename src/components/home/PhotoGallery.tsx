import Image from "next/image";

const divStyle = {
  backgroundImage: `url('https://lh3.googleusercontent.com/p/AF1QipMxmxBbiu6_PZrulaABosokl-QuXFUU1y09wAz9=s1600-w1600-h1600?width=1000')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "100%",
  paddingTop: "100%",
};

const PhotoGallery = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <Image
          className="h-auto max-w-full rounded-lg"
          src="https://s3-media2.fl.yelpcdn.com/bphoto/5QNSZJW_LHt7m-PSDbKJ6Q/o.jpg?width=1000"
          alt=""
          width={200}
          height={200}
        />
      </div>
      <div style={divStyle}></div>
      <div>
        <Image
          className="h-auto max-w-full rounded-lg"
          src="https://www.europeanbusinessreview.com/wp-content/uploads/2023/05/shutterstock_362232446-696x464.jpg"
          alt=""
          width={200}
          height={200}
        />
      </div>
      <div>
        <Image
          className="h-auto max-w-full rounded-lg"
          src="https://lh3.googleusercontent.com/p/AF1QipPg1avoYxh9aC1MGtaS_iEAkHUpG-9dvmOD-Pnt=s1600-w1600-h1600?width=1000"
          alt=""
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

export default PhotoGallery;
