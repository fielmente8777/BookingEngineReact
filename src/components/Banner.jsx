import React from 'react'

const Banner = ({websiteData}) => {
    const urlParams = new URLSearchParams(window.location.search);
    // console.log("object",urlParams);
//   const hotelid = urlParams.get("id");
  const hid = urlParams.get("hid");
    console.log("Website data in banner",websiteData);

    // let images=[];
        let selectedData = null;

    if(hid &&Array.isArray(websiteData)){
  selectedData = websiteData?.find(item => item?.id == hid);
}

console.log("Selected Data:", websiteData,selectedData);
    


    // console.log(images);
  return (
    <div>
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-4 ">
                  {selectedData?.Gallery[0]?.Images.map((item, index) => (
                    <div
                      key={index}
                      className={`w-[200px]! h-[200px]!  overflow-hidden hover:border-4 border-white hover:shadow-3xl shadow-2xl hover:-translate-y-1 hover:shadow-gray-600 duration-1000 transition ease-in-out`}
                    >
                      <img
                        // onClick={() =>
                        //   handleOpen({
                        //     images: [...new Set(filteredData?.map((card) => card.src))],
                        //     index,
                        //     roomName: item.alt,
                        //   })
                        // }
                        src={item}
                        alt={item.alt}
                        className={`w-full cursor-pointer object-cover hover:scale-110 duration-1000 transition ease-linear`}
                      />
                      {/* {item.tags?.trim().toLowerCase() === "rooms & suites" && (
                        <div className="absolute top-2 left-2 bg-white px-2 py-1 text-sm font-medium text-gray-900">
                          {item.alt}
                        </div>
                      )} */}
                    </div>
                  ))}
        
                  {/* FullscreenImagePopup1 will now read from context */}
                </div>
    </div>
  )
}

export default Banner