import { FaStar } from "react-icons/fa";
import {
  EarlyCheckInIcon,
  HappyHoursOffersIcon,
  HomeIcon,
  InstantBookingIcon,
  LocationIcon,
  MealUpgradeIcon,
  WelcomeDrinkIcon,
} from "../utils/icons";

const Overview = ({ hotelDetails }) => {
  console.log("object", hotelDetails);
  const tags = [
    {
      icon: <HomeIcon />,
      name: "ENTIRE PLACE",
    },
    {
      icon: <InstantBookingIcon />,
      name: "Instant Booking",
    },
    {
      icon: <MealUpgradeIcon />,
      name: "Meal Upgrade",
    },
    {
      icon: <WelcomeDrinkIcon />,
      name: "Welcome Drink",
    },
    {
      icon: <HappyHoursOffersIcon />,
      name: "Happy Hours Offer",
    },
    {
      icon: <EarlyCheckInIcon />,
      name: "Early Check-in upto 2hrs*",
    },
  ];
  return (
    <>
      {hotelDetails && (
        <div className="flex flex-col gap-8 mt-5">
          {/* tags */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 2).map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-1 text-nowrap py-2.5  px-3 rounded-md shadow-inner text-base w-fit ${index === 1 ? "bg-[#EFF6FF] text-[#0D54EB] border-[0.5px] border-[#0D54EB]" : "bg-[#F5F5F5]"} `}
              >
                <span className="">{item.icon}</span>
                <span className="">{item.name}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {/* title */}
            <div className="flex justify-between items-center">
              {hotelDetails?.HotelName && (
                <h1 className="text-2xl capitalize font-semibold">
                  {hotelDetails?.HotelName}
                </h1>
              )}
              <span className="flex text-sm bg-green-600 text-white items-center gap-1 py-2 w-fit px-2 rounded-md">
                <FaStar className="text-white" size={12} /> 4.9/576 Reviews
              </span>
            </div>

            {/* address */}
            {hotelDetails?.Footer?.Address && (
              <div className="font-medium flex items-center gap-1">
                <LocationIcon />
                <p className="">{hotelDetails?.Footer?.Address}</p>
              </div>
            )}
          </div>

          <div className="h-[px] border border-blue-400" />

          {/* tags */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(2).map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-1 text-nowrap py-2.5  px-3 rounded-md shadow-inner text-base w-fit border-[0.5px] ${tags.slice(2).length - 1 === index ? "bg-[#EFF6FF]  text-[#0D54EB]  border-[#0D54EB]" : "bg-[#F5F5F5]"} `}
              >
                <span className="">{item.icon}</span>
                <span className="">{item.name}</span>
              </div>
            ))}
          </div>

          {/* overview */}
          <div className="rounded-xl border-[0.5px] border-[#F2B203] p-4 flex flex-col gap-2 bg-[#FFF8EC]">
            <h1 className="text-black font-semibold text-lg">Overview</h1>
            {hotelDetails?.AboutUs && (
              <p className="text-md text-[#464646]">{hotelDetails?.AboutUs}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
