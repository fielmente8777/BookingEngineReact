import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import useRazorpay from "react-razorpay";
import "../style/Reserve.css";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import Select from "react-select";
import countryList from "react-select-country-list";
import { BoxIcon } from "../utils/icons";

function CnfrmPay(props) {
  try {
    var deluxcost = props.Delux * Number(props.ratesChange["1"]["Price"]);
  } catch {
    deluxcost = 0;
  }
  try {
    var sdcost = props.SuperDelux * Number(props.ratesChange["2"]["Price"]);
  } catch {
    sdcost = 0;
  }
  try {
    var suitecost = props.Suite * Number(props.ratesChange["3"]["Price"]);
  } catch {
    suitecost = 0;
  }
  try {
    var premiumcost = props.Premium * Number(props.ratesChange["4"]["Price"]);
  } catch {
    premiumcost = 0;
  }
  try {
    var premiereretreatcost =
      props.PremiereRetreat * Number(props.ratesChange["5"]["Price"]);
  } catch {
    premiereretreatcost = 0;
  }
  try {
    var elitesuitecost =
      props.EliteSuite * Number(props.ratesChange["6"]["Price"]);
  } catch {
    elitesuitecost = 0;
  }
  try {
    var granddeluxecost =
      props.GrandDeluxe * Number(props.ratesChange["7"]["Price"]);
  } catch {
    granddeluxecost = 0;
  }
  try {
    var imperialsuitecost =
      props.ImperialSuite * Number(props.ratesChange["8"]["Price"]);
  } catch {
    imperialsuitecost = 0;
  }
  try {
    var supremeretreatcost =
      props.SupremeRetreat * Number(props.ratesChange["9"]["Price"]);
  } catch {
    supremeretreatcost = 0;
  }
  try {
    var royaldeluxecost =
      props.RoyalDeluxe * Number(props.ratesChange["10"]["Price"]);
  } catch {
    royaldeluxecost = 0;
  }
  try {
    var prestigesuitecost =
      props.PrestigeSuite * Number(props.ratesChange["11"]["Price"]);
  } catch {
    prestigesuitecost = 0;
  }
  try {
    var exclusiveretreatcost =
      props.ExclusiveRetreat * Number(props.ratesChange["12"]["Price"]);
  } catch {
    exclusiveretreatcost = 0;
  }

  let tax = 0;
  let cost =
    Number(deluxcost) +
    Number(sdcost) +
    Number(suitecost) +
    Number(premiumcost) +
    Number(premiereretreatcost) +
    Number(elitesuitecost) +
    Number(granddeluxecost) +
    Number(imperialsuitecost) +
    Number(supremeretreatcost) +
    Number(royaldeluxecost) +
    Number(prestigesuitecost) +
    Number(exclusiveretreatcost) +
    Number(props.Mealprice);
  if (props.currency == "INR") {
    if (props.addTax) {
      tax = 0.18 * Number(cost);
    }
  } else {
    tax = 0;
  }
  let totoalcost = Number(cost) + Number(tax);

  const [Razorpay, createOrder] = useRazorpay(); // Destructure 'Razorpay' and 'createOrder' from the hook

  const [amount, setAmount] = useState(
    tax * (props.price * props.nights) + props.price * props.nights
  );
  const [OrderId, setOrderId] = useState("");
  const [Type, setType] = useState(props.type);
  const [BookingId, setBookingId] = useState("1");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Country, setCountry] = useState("");
  const [City, setCity] = useState("");
  const [RoomCost, setRoomCost] = useState(cost);
  const [RoomTax, setRoomTax] = useState(tax);
  const [PaymentStatus, setPaymentStatus] = useState("PENDING");
  const [PayStatus, setPayStatus] = useState("PAID");
  const [RedirectLink, setRedirectLink] = useState("");
  const [ispaymentProcessing, setispaymentProcessing] = useState(false);

  const baseUrl = props.baseUrl;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`;
          try {
            const result = await axios.get(url);
            const { locality, city, country, principalSubdivision } =
              result.data;
            // console.log(result.data);

            setCity(result.data.city);
            setCountry(result.data.countryName);
          } catch (err) {
            console.log(err);
            // Handle the error as needed
          }
        },
        (error) => {
          console.log(error);
          // Handle geolocation error
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      // Handle geolocation not supported
    }
  }, []);

  const changeDateFormat = (inputdate) => {
    var date = new Date(inputdate);
    // Get day, month, and year
    var day = date.getDate();
    var month = date.getMonth() + 1; // Months are zero-based
    var year = date.getFullYear();

    // Pad day and month with leading zeros if needed
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    // Format the date as 'DD-MM-YYYY'
    var formattedDate = day + "-" + month + "-" + year;

    return formattedDate;
  };

  //PAY AT HOTEL
  const GetPayLaterOrderId = async () => {
    setispaymentProcessing(true);
    const response = await fetch(`${props.baseUrl}/payment/create_order`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomNumbers: [],
        hId: localStorage.getItem("hid"),
        ndid: localStorage.getItem("hotelid"),
        amount: totoalcost,
        currency: props.currency,
        guestInfo: {
          guestName: Name,
          EmailId: Email,
          Phone: Phone,
          City: City,
          Country: Country,
          address: City,
        },
        Adults: localStorage.getItem("Adult"),
        Kids: localStorage.getItem("Kid"),
        Bookings: [
          { RoomType: "1", Qty: props.Delux },
          { RoomType: "2", Qty: props.SuperDelux },
          { RoomType: "3", Qty: props.Suite },
          { RoomType: "4", Qty: props.Premium },
          { RoomType: "5", Qty: props.PremiereRetreat },
          { RoomType: "6", Qty: props.EliteSuite },
          { RoomType: "7", Qty: props.GrandDeluxe },
          { RoomType: "8", Qty: props.ImperialSuite },
          { RoomType: "9", Qty: props.SupremeRetreat },
          { RoomType: "10", Qty: props.RoyalDeluxe },
          { RoomType: "11", Qty: props.PrestigeSuite },
          { RoomType: "12", Qty: props.ExclusiveRetreat },
        ],
        payment: {
          Status: "PENDING",
          RefNo: "",
          PaymentProvider: "RazorPay",
          Mode: "Online",
        },
        mealPlan: {
          PackageId: props.mealplanId,
          PackageName: props.selectedMealPlan,
          PackagePrice: props.Mealprice,
          PackageperRoom: props.isperRoom,
        },
        promocode: {
          PromoId: "NA",
          Code: "NA",
          Discount: "NA",
        },
        packages: {
          packageId: "NA",
          packageName: "NA",
          packagePrice: "NA",
          specialRequest: "NA",
        },
        checkIn: localStorage.getItem("Checkin"),
        checkOut: localStorage.getItem("Checkout"),
        price: {
          AmountPay: 0,
          Principal: cost,
          Tax: tax,
          Total: totoalcost,
        },
        isCheckedIn: false,
        isCheckedOut: false,
      }),
    });

    const json = await response.json();

    if (json.Status === true) {
      console.log(json);
      props.setPayment({
        Status: true,
        Logo: props.HotelLogo,
        HotelName: props.HotelName,
        Order: json.order_id, // Order ID from the payment gateway
        Name: Name,
        Phone: Phone,
        Email: Email,
        City: City,
        Country: Country.label,
        Delux: props.Delux,
        Sd: props.SuperDelux,
        Suite: props.Suite,
        Premium: props.Premium,
        PremiereRetreat: props.PremiereRetreat,
        EliteSuite: props.EliteSuite,
        GrandDeluxe: props.GrandDeluxe,
        ImperialSuite: props.ImperialSuite,
        SupremeRetreat: props.SupremeRetreat,
        RoyalDeluxe: props.RoyalDeluxe,
        PrestigeSuite: props.PrestigeSuite,
        ExclusiveRetreat: props.ExclusiveRetreat,
        Checkin: localStorage.getItem("Checkin"),
        Checkout: localStorage.getItem("Checkout"),
        Adult: localStorage.getItem("Adult"),
        Kid: localStorage.getItem("Kid"),
        Tax: tax,
        Amount: totoalcost,
        PayStatus: "Pay At Hotel",
        MealPlan: props.selectedMealPlan,
        Mealprice: props.selectedMealPlanPrice,
        Rooms: props.RoomCategoryCombination,
      });
    } else {
      document.getElementById("No_rooms").style.display = "block";
    }
  };
  //pay 25%
  const GetSemiHalfOrderId = async () => {
    setispaymentProcessing(true);
    setPaymentStatus("ADVANCED");
    setPayStatus("25% PAID");
    let halfcost = 0.25 * totoalcost;
    const response = await fetch(`${props.baseUrl}/payment/create_order`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomNumbers: [],
        hId: localStorage.getItem("hid"),
        ndid: localStorage.getItem("hotelid"),
        amount: halfcost,
        currency: props.currency,
        guestInfo: {
          guestName: Name,
          EmailId: Email,
          Phone: Phone,
          City: City,
          Country: Country,
          address: City,
        },
        Adults: localStorage.getItem("Adult"),
        Kids: localStorage.getItem("Kid"),
        Bookings: [
          { RoomType: "1", Qty: props.Delux },
          { RoomType: "2", Qty: props.SuperDelux },
          { RoomType: "3", Qty: props.Suite },
          { RoomType: "4", Qty: props.Premium },
          { RoomType: "5", Qty: props.PremiereRetreat },
          { RoomType: "6", Qty: props.EliteSuite },
          { RoomType: "7", Qty: props.GrandDeluxe },
          { RoomType: "8", Qty: props.ImperialSuite },
          { RoomType: "9", Qty: props.SupremeRetreat },
          { RoomType: "10", Qty: props.RoyalDeluxe },
          { RoomType: "11", Qty: props.PrestigeSuite },
          { RoomType: "12", Qty: props.ExclusiveRetreat },
        ],
        payment: {
          Status: "PENDING",
          RefNo: "",
          PaymentProvider: "RazorPay",
          Mode: "Online",
        },
        mealPlan: {
          PackageId: props.mealplanId,
          PackageName: props.selectedMealPlan,
          PackagePrice: props.Mealprice,
          PackageperRoom: props.isperRoom,
        },
        promocode: {
          PromoId: "NA",
          Code: "NA",
          Discount: "NA",
        },
        packages: {
          packageId: "NA",
          packageName: "NA",
          packagePrice: "NA",
          specialRequest: "NA",
        },
        checkIn: localStorage.getItem("Checkin"),
        checkOut: localStorage.getItem("Checkout"),
        price: {
          amountPay: halfcost,
          Principal: cost,
          Tax: tax,
          Total: totoalcost,
        },
        isCheckedIn: false,
        isCheckedOut: false,
      }),
    });

    const json = await response.json();

    if (json.Status === true) {
      setOrderId(json.order_id);
      setRedirectLink(json.redirectLink);
      setispaymentProcessing(false);
    } else {
      document.getElementById("No_rooms").style.display = "block";
    }
  };

  //HALF PAYMENT OPTION
  const GetHalfOrderId = async () => {
    setispaymentProcessing(true);
    setPaymentStatus("ADVANCED");
    setPayStatus("HALF PAID");
    let halfcost = 0.5 * totoalcost;
    const response = await fetch(`${props.baseUrl}/payment/create_order`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomNumbers: [],
        hId: localStorage.getItem("hid"),
        ndid: localStorage.getItem("hotelid"),
        amount: halfcost,
        currency: props.currency,
        guestInfo: {
          guestName: Name,
          EmailId: Email,
          Phone: Phone,
          City: City,
          Country: Country,
          address: City,
        },
        Adults: localStorage.getItem("Adult"),
        Kids: localStorage.getItem("Kid"),
        Bookings: [
          { RoomType: "1", Qty: props.Delux },
          { RoomType: "2", Qty: props.SuperDelux },
          { RoomType: "3", Qty: props.Suite },
          { RoomType: "4", Qty: props.Premium },
          { RoomType: "5", Qty: props.PremiereRetreat },
          { RoomType: "6", Qty: props.EliteSuite },
          { RoomType: "7", Qty: props.GrandDeluxe },
          { RoomType: "8", Qty: props.ImperialSuite },
          { RoomType: "9", Qty: props.SupremeRetreat },
          { RoomType: "10", Qty: props.RoyalDeluxe },
          { RoomType: "11", Qty: props.PrestigeSuite },
          { RoomType: "12", Qty: props.ExclusiveRetreat },
        ],
        payment: {
          Status: "PENDING",
          RefNo: "",
          PaymentProvider: "RazorPay",
          Mode: "Online",
        },
        mealPlan: {
          PackageId: props.mealplanId,
          PackageName: props.selectedMealPlan,
          PackagePrice: props.Mealprice,
          PackageperRoom: props.isperRoom,
        },
        promocode: {
          PromoId: "NA",
          Code: "NA",
          Discount: "NA",
        },
        packages: {
          packageId: "NA",
          packageName: "NA",
          packagePrice: "NA",
          specialRequest: "NA",
        },
        checkIn: localStorage.getItem("Checkin"),
        checkOut: localStorage.getItem("Checkout"),
        price: {
          amountPay: halfcost,
          Principal: cost,
          Tax: tax,
          Total: totoalcost,
        },
        isCheckedIn: false,
        isCheckedOut: false,
      }),
    });

    const json = await response.json();

    if (json.Status === true) {
      setOrderId(json.order_id);
      setRedirectLink(json.redirectLink);
      setispaymentProcessing(false);
    } else {
      document.getElementById("No_rooms").style.display = "block";
    }
  };

  //FULL PAYMENT BUTTON
  const GetOrderId = async () => {
    setispaymentProcessing(true);
    setPaymentStatus("SUCCESS");
    const response = await fetch(`${props.baseUrl}/payment/create_order`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomNumbers: [],
        hId: localStorage.getItem("hid"),
        ndid: localStorage.getItem("hotelid"),
        amount: totoalcost,
        currency: props.currency,
        guestInfo: {
          guestName: Name,
          EmailId: Email,
          Phone: Phone,
          City: City,
          Country: Country,
          address: City,
        },
        Adults: localStorage.getItem("Adult"),
        Kids: localStorage.getItem("Kid"),
        Bookings: [
          { RoomType: "1", Qty: props.Delux },
          { RoomType: "2", Qty: props.SuperDelux },
          { RoomType: "3", Qty: props.Suite },
          { RoomType: "4", Qty: props.Premium },
          { RoomType: "5", Qty: props.PremiereRetreat },
          { RoomType: "6", Qty: props.EliteSuite },
          { RoomType: "7", Qty: props.GrandDeluxe },
          { RoomType: "8", Qty: props.ImperialSuite },
          { RoomType: "9", Qty: props.SupremeRetreat },
          { RoomType: "10", Qty: props.RoyalDeluxe },
          { RoomType: "11", Qty: props.PrestigeSuite },
          { RoomType: "12", Qty: props.ExclusiveRetreat },
        ],
        payment: {
          Status: "PENDING",
          RefNo: "",
          PaymentProvider: "RazorPay",
          Mode: "Online",
        },
        mealPlan: {
          PackageId: props.mealplanId,
          PackageName: props.selectedMealPlan,
          PackagePrice: props.Mealprice,
          PackageperRoom: props.isperRoom,
        },
        promocode: {
          PromoId: "NA",
          Code: "NA",
          Discount: "NA",
        },
        packages: {
          packageId: "NA",
          packageName: "NA",
          packagePrice: "NA",
          specialRequest: "NA",
        },
        checkIn: localStorage.getItem("Checkin"),
        checkOut: localStorage.getItem("Checkout"),
        price: {
          Principal: cost,
          Tax: tax,
          Total: totoalcost,
          amountPay: totoalcost,
        },
        isCheckedIn: false,
        isCheckedOut: false,
      }),
    });

    const json = await response.json();

    if (json.Status === true) {
      setOrderId(json.order_id);
      setRedirectLink(json.redirectLink);
      setispaymentProcessing(false);
    } else {
      document.getElementById("No_rooms").style.display = "block";
    }
  };

  const PaymentSuccessFull = async (payid) => {
    const response = await fetch(`${props.baseUrl}/booking/update`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ndid: localStorage.getItem("hotelid"),
        orderid: OrderId,
        paymentid: payid,
        Status: PaymentStatus,
        hId: localStorage.getItem("hid"),
      }),
    });
  };

  function BookingFinalize() {
    let maxAdult = 0;
    if (props.Delux > 0) {
      props.setmaxAdult((maxAdult += props.Delux * props.DeluxAdult));
    }
    if (props.SuperDelux > 0) {
      props.setmaxAdult((maxAdult += props.SuperDelux * props.SuperDeluxAdult));
    }
    if (props.Suite > 0) {
      props.setmaxAdult((maxAdult += props.Suite * props.SuiteAdult));
    }
    if (props.Premium > 0) {
      props.setmaxAdult((maxAdult += props.Premium * props.PremiumAdult));
    }
    if (props.PremiereRetreat > 0) {
      props.setmaxAdult(
        (maxAdult += props.PremiereRetreat * props.PremiereRetreatAdult)
      );
    }
    if (props.EliteSuite > 0) {
      props.setmaxAdult((maxAdult += props.EliteSuite * props.EliteSuiteAdult));
    }
    if (props.GrandDeluxe > 0) {
      props.setmaxAdult(
        (maxAdult += props.GrandDeluxe * props.GrandDeluxeAdult)
      );
    }
    if (props.ImperialSuite > 0) {
      props.setmaxAdult(
        (maxAdult += props.ImperialSuite * props.ImperialSuiteAdult)
      );
    }
    if (props.SupremeRetreat > 0) {
      props.setmaxAdult(
        (maxAdult += props.SupremeRetreat * props.SupremeRetreatAdult)
      );
    }
    if (props.RoyalDeluxe > 0) {
      props.setmaxAdult(
        (maxAdult += props.RoyalDeluxe * props.RoyalDeluxeAdult)
      );
    }
    if (props.PrestigeSuite > 0) {
      props.setmaxAdult(
        (maxAdult += props.PrestigeSuite * props.PrestigeSuiteAdult)
      );
    }
    if (props.ExclusiveRetreat > 0) {
      props.setmaxAdult(
        (maxAdult += props.ExclusiveRetreat * props.ExclusiveRetreatAdult)
      );
    }
    if (props.Adult <= props.maxAdult) {
      return false;
    } else {
      return true;
    }
  }

  const PopupFillFields = () => {
    alert("Please Complete User details form");
  };

  const handlePayment = async () => {
    try {
      // alert(props.GatewayConnected)
      const mockOrderData = {
        amount:
          parseInt(Number(props.room) * Number(props.BookingTotalPrice)) * 100, // Convert amount to paise (assuming INR)
        orderId: OrderId, // Generate a unique order ID
      };

      const options = {
        key: props.GatewayConnected.API_KEY, // Enter the Key ID generated from the Dashboard rzp_test_UZ0V9jh3jMC0C9,rzp_live_5uaIIwZcxLC70j
        amount: mockOrderData.amount.toString(), // Use the amount from the order data
        currency: props.currency,
        name: props.HotelName,
        description: "Test Transaction",
        image: props.HotelLogo,
        order_id: OrderId, // Use the order ID from the order data
        handler: async function (response) {
          setOrderId(response.razorpay_order_id);
          await PaymentSuccessFull(response.razorpay_payment_id);
          props.setPayment({
            Status: true,
            Logo: props.HotelLogo,
            HotelName: props.HotelName,
            Order: response.razorpay_order_id,
            Payment: response.razorpay_payment_id,
            Name: Name,
            Phone: Phone,
            Email: Email,
            City: City,
            Country: Country.label,
            Checkin: localStorage.getItem("Checkin"),
            Checkout: localStorage.getItem("Checkout"),
            Adult: localStorage.getItem("Adult"),
            Kid: localStorage.getItem("Kid"),
            Tax: tax,
            Amount: totoalcost,
            PayStatus: PayStatus,
            Delux: props.Delux,
            Sd: props.SuperDelux,
            Suite: props.Suite,
            Premium: props.Premium,
            PremiereRetreat: props.PremiereRetreat,
            EliteSuite: props.EliteSuite,
            GrandDeluxe: props.GrandDeluxe,
            ImperialSuite: props.ImperialSuite,
            SupremeRetreat: props.SupremeRetreat,
            RoyalDeluxe: props.RoyalDeluxe,
            PrestigeSuite: props.PrestigeSuite,
            ExclusiveRetreat: props.ExclusiveRetreat,
            MealPlan: props.selectedMealPlan,
            Mealprice: props.selectedMealPlanPrice,
            Rooms: props.RoomCategoryCombination,
          });
        },

        theme: {
          color: props.Bg_color,
        },
      };

      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
    } catch (error) {
      console.log("Payment Error:", error);
    }
  };

  // for country selector

  const options = useMemo(() => {
    const countryData = countryList().getData();
    const defaultOption = { label: Country, value: Country };
    return [defaultOption, ...countryData];
  }, []);
  const changeHandler = (Country) => {
    setCountry(Country);
  };

  return (
    <>
      <div className="w-full bg-black text-white rounded-2xl px-6 py-4 shadow-xl space-y-3">
        <div className="flex items-center gap-2 w-fit px-4 py-2 shadow-inner bg-white/10 backdrop-blur-sm border-[0.5px] border-gray-600 rounded-full">
          <span>
            <BoxIcon />
          </span>
          <h2 className="md:text-lg">Guest Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16">
          <div className="md:col-span-2 col-span-1 flex flex-col gap-4">
            {/* full name */}
            <div className="grid grid-cols-1 md:grid-cols-[.4fr_1fr] gap-4 items-center">
              <label for="FullName">
                Full Name <span style={{ color: "red" }}>*</span>
              </label>
              <div className="flex items-center justify-center gap-2 w-full py-2 bg-black/90 border border-gray-600 rounded-md">
                <select
                  id="prefix"
                  name="prefix"
                  className="text-white bg-transparent block w-1/6 px-2.5"
                  required
                >
                  {/* <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Mrs.">Miss.</option>
                  <option value="Mrs.">Dr.</option>
                  <option value="Mrs.">Prof.</option> */}
                  {["Mr.", "Mrs.", "Miss.", "Dr.", "Prof."].map((option) => (
                    <option key={option} value={option} className="bg-gray-900">
                      {option}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="bg-transparent text-white block w-5/6 px-2.5 focus:outline-none"
                  name="fullname"
                  id="FullName"
                  placeholder="Full Name"
                  value={Name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
              </div>
            </div>

            {/* email */}
            <div className="grid grid-cols-1 md:grid-cols-[.4fr_1fr] gap-4 items-center">
              <label htmlFor="Email">
                Email Id <span style={{ color: "red" }}>*</span>
              </label>
              <div className="w-full py-2 bg-black/90 border border-gray-600 rounded-md">
                <input
                  type="email"
                  className="bg-inherit text-white block w-full px-2.5 focus:outline-none"
                  value={Email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  name="email"
                  id="Email"
                  placeholder="Please enter your email id"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  required
                />
              </div>
            </div>

            {/* phone */}
            <div className="grid grid-cols-1 md:grid-cols-[.4fr_1fr] gap-4 items-center">
              <label htmlFor="phone">
                Phone No. <span style={{ color: "red" }}>*</span>
              </label>
              <div className="w-full py-2 bg-black/90 border border-gray-600 rounded-md">
                <PhoneInput
                  international
                  className="bg-inherit text-white block w-1/6 px-2.5 focus:outline-none"
                  defaultCountry="IN"
                  placeholder="Enter phone number"
                  value={Phone}
                  onChange={(newPhone) => setPhone(newPhone)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[.4fr_1fr] gap-4 items-center">
              <label htmlFor="user_city">
                City <span style={{ color: "red" }}>*</span>
              </label>
              <input
                value={City}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                id="user_city"
                className="bg-inherit border border-gray-600 p-2.5 rounded-md text-white block w-full px-2.5 focus:outline-none"
                name="city"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[.4fr_1fr] gap-4 items-center">
              <label for="country">
                Country <span style={{ color: "red" }}>*</span>
              </label>
              <Select
                options={options}
                value={Country}
                onChange={changeHandler}
                className="bg-inherit border border-gray-600 p-2.5 rounded-md text-white block w-full px-2.5 focus:outline-none"
              />

              {/* <input
                                            type="text"
                                            value={Country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        /> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[.4fr_1fr] gap-4">
              <label htmlFor="request">Special Requests</label>
              <textarea
                className="bg-inherit border border-gray-600 p-2.5 rounded-md text-white block w-full px-2.5 focus:outline-none"
                name="text"
                id="request"
                rows={4}
                placeholder="ADDITIONAL REQUEST"
              ></textarea>
            </div>

            {/* <div className="content_inner">
                                        <span className="text-span">Promo Code</span>
                                        <div className="promo_btn_div">
                                            <input type="text" placeholder="Enter Promo Code here" />
                                            <Button>Apply</Button>
                                        </div>
                                    </div> */}

            {props.GatewayConnected.Type !== "None" ? (
              BookingFinalize() ? (
                <div className="alert alert-danger" role="alert">
                  Please Select More Rooms
                </div>
              ) : !OrderId ? (
                <div className="button_s">
                  {ispaymentProcessing ? (
                    <div>
                      <p style={{ textAlign: "center" }}>
                        Processing Please wait....
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  {Name && Phone && Email && Country && City && !OrderId ? (
                    <>
                      {props.isPayatHotel ? (
                        <button
                          className="submitbtn"
                          onClick={GetPayLaterOrderId}
                        >
                          PAY AT HOTEL
                        </button>
                      ) : (
                        ""
                      )}
                      {props.isSemiPayment && props.isOnlinepay ? (
                        <button
                          className="submitbtn"
                          onClick={GetSemiHalfOrderId}
                        >
                          PAY 25% AMOUNT{" "}
                          <span>
                            {0.25 * (cost + tax)} {props.currency}
                          </span>
                        </button>
                      ) : (
                        ""
                      )}
                      {props.isOnlinepay ? (
                        <button className="submitbtn" onClick={GetHalfOrderId}>
                          PAY 50% AMOUNT{" "}
                          <span>
                            {0.5 * (cost + tax)} {props.currency}
                          </span>
                        </button>
                      ) : (
                        ""
                      )}
                      {props.isOnlinepay ? (
                        <button className="submitbtn" onClick={GetOrderId}>
                          PAY FULL AMOUNT{" "}
                          <span>
                            {cost + tax} {props.currency}
                          </span>
                        </button>
                      ) : (
                        ""
                      )}
                      <p className="button_s_p">
                        By making this booking, you are accepting our terms and
                        conditions***
                      </p>
                    </>
                  ) : (
                    <>
                      {props.isPayatHotel ? (
                        <button className="submitbtn" onClick={PopupFillFields}>
                          PAY AT HOTEL
                        </button>
                      ) : (
                        ""
                      )}
                      {props.isSemiPayment ? (
                        <button className="submitbtn" onClick={PopupFillFields}>
                          PAY 25% AMOUNT{" "}
                          <span>
                            {0.25 * (cost + tax)} {props.currency}
                          </span>
                        </button>
                      ) : (
                        ""
                      )}
                      {props.isOnlinepay ? (
                        <button className="submitbtn" onClick={PopupFillFields}>
                          PAY 50% AMOUNT{" "}
                          <span>
                            {0.5 * (cost + tax)} {props.currency}
                          </span>
                        </button>
                      ) : (
                        ""
                      )}
                      {props.isOnlinepay ? (
                        <button className="submitbtn" onClick={PopupFillFields}>
                          PAY FULL AMOUNT{" "}
                          <span>
                            {cost + tax} {props.currency}
                          </span>
                        </button>
                      ) : (
                        ""
                      )}
                      <p className="button_s_p">
                        By making this booking, you are accepting our terms and
                        conditions***
                      </p>
                    </>
                  )}
                </div>
              ) : props.GatewayConnected.Type === "Razorpay" ? (
                <div className="bookingbtn">
                  <button
                    className="cmplt pay_button"
                    id="rzp-button1"
                    onClick={handlePayment}
                    style={{ backgroundColor: props.color }}
                  >
                    {props.Paymentbutton}
                  </button>
                </div>
              ) : (
                <div className="bookingbtn">
                  <button
                    className="cmplt pay_button"
                    id=""
                    onClick={() => {
                      window.location.replace(RedirectLink);
                    }}
                    style={{ backgroundColor: props.color }}
                  >
                    {props.Paymentbutton}
                  </button>
                </div>
              )
            ) : (
              <div className="alert alert-danger" role="alert">
                No Gateway Connected
              </div>
            )}
          </div>
          {/* <div className="button_s">
                                    <button className="submitbtn" onClick={toggleDiv}>Submit</button>
                                </div> */}

          <div className="flex flex-col gap-4 col-span-1">
            <h4 className="text-center text-xl font-semibold">Reservation details</h4>

            {/* checkin */}

            <div className="flex items-center justify-between">
              <span className="left-span">Check In</span>
              <div>
                <span className="right-span" id="Final_checkin">
                  {changeDateFormat(localStorage.getItem("Checkin"))}
                </span>
              </div>
            </div>

            {/* checkout */}
            <div className="flex items-center justify-between">
              <span className="left-span">Check Out</span>
              <span className="right-span" id="Final_checkout">
                {changeDateFormat(localStorage.getItem("Checkout"))}
              </span>
            </div>

            {/* nights */}
            <div className="flex items-center justify-between">
              <span className="left-span">No. of Nights</span>
              <p className="right-span">
                <span id="Final_night">{props.nights}</span>
              </p>
            </div>

            {/* guests */}
            <div className="flex items-center justify-between">
              <span className="left-span">No. of Guests</span>
              <span className="right-span">
                <span id="Final_adult">{localStorage.getItem("Adult")}</span>{" "}
                adults,{" "}
                <span id="Final_kid">{localStorage.getItem("Kid")}</span>{" "}
                children
              </span>
            </div>

            {/* rooms */}
            <div className="flex items-center justify-between">
              <span className="left-span">Rooms</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {props.Delux !== 0 ? (
                  <span className="right-span" id="Final_checkout">
                    {props.RoomCategoryCombination["DELUX"]}:- {props.Delux}
                  </span>
                ) : (
                  ""
                )}
                {props.SuperDelux !== 0 ? (
                  <span className="right-span" id="Final_checkout">
                    {props.RoomCategoryCombination["SUPERDELUX"]}:-{" "}
                    {props.SuperDelux}
                  </span>
                ) : (
                  ""
                )}
                {props.Suite !== 0 ? (
                  <span className="right-span" id="Final_checkout">
                    {props.RoomCategoryCombination["SUITE"]}:- {props.Suite}
                  </span>
                ) : (
                  ""
                )}
                {props.Premium !== 0 ? (
                  <span className="right-span" id="Final_checkout">
                    {props.RoomCategoryCombination["PREMIUM"]}:- {props.Premium}
                  </span>
                ) : (
                  ""
                )}
                {props.PremiereRetreat !== 0 ? (
                  <span className="right-span" id="Final_checkout">
                    {props.RoomCategoryCombination["PremiereRetreat"]}:-{" "}
                    {props.PremiereRetreat}
                  </span>
                ) : (
                  ""
                )}
                {props.EliteSuite !== 0 ? (
                  <span className="right-span" id="Final_checkout">
                    {props.RoomCategoryCombination["EliteSuite"]}:-{" "}
                    {props.EliteSuite}
                  </span>
                ) : (
                  ""
                )}
                {props.GrandDeluxe !== 0 ? (
                  <span className="right-span" id="Final_checkout">
                    {props.RoomCategoryCombination["GrandDeluxe"]}:-{" "}
                    {props.GrandDeluxe}
                  </span>
                ) : (
                  ""
                )}
                {props.ImperialSuite !== 0 ? (
                  <span className="right-span" id="Final_checkout">
                    {props.RoomCategoryCombination["ImperialSuite"]}:-{" "}
                    {props.ImperialSuite}
                  </span>
                ) : (
                  ""
                )}
                {props.SupremeRetreat !== 0 ? (
                  <span className="right-span" id="Final_checkout">
                    {props.RoomCategoryCombination["SupremeRetreat"]}:-{" "}
                    {props.SupremeRetreat}
                  </span>
                ) : (
                  ""
                )}
                {props.RoyalDeluxe !== 0 ? (
                  <span className="right-span" id="Final_checkout">
                    {props.RoomCategoryCombination["RoyalDeluxe"]}:-{" "}
                    {props.RoyalDeluxe}
                  </span>
                ) : (
                  ""
                )}
                {props.PrestigeSuite !== 0 ? (
                  <span className="right-span" id="Final_checkout">
                    {props.RoomCategoryCombination["PrestigeSuite"]}:-{" "}
                    {props.PrestigeSuite}
                  </span>
                ) : (
                  ""
                )}
                {props.ExclusiveRetreat !== 0 ? (
                  <span className="right-span" id="Final_checkout">
                    {props.RoomCategoryCombination["ExclusiveRetreat"]}:-{" "}
                    {props.ExclusiveRetreat}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* meal */}
            <div className="flex items-center justify-between">
              <span className="left-span">Meal Selected</span>
              <p className="right-span">
                <span id="Final_room">
                  {props.selectedMealPlan ? props.selectedMealPlan : "-"}
                </span>
              </p>
            </div>

            {/* meal */}
            <div className="flex items-center justify-between">
              <span className="left-span">Meal Price</span>
              <p className="right-span">
                <span id="Final_room">
                  {props.selectedMealPlanPrice
                    ? props.selectedMealPlanPrice
                    : "-"}{" "}
                  {props.isperRoom ? "per room" : "per adult"}
                </span>
              </p>
            </div>

            {/* <div className="flex items-center justify-between">
              <span className="left-span">Total Meal Price</span>
              <p className="right-span">
                <span id="Final_room">{props.Mealprice}</span>
              </p>
            </div> */}
            {/* price */}
            <div className="py-3 space-y-2 border-y border-white">
              {/* sub total */}
              <div className="flex items-center justify-between">
                <span className="left-span">Sub total</span>
                <span>
                  <span id="Final_price">{cost}</span> {props.currency}
                </span>
              </div>

              {/* tax */}
              <div className="flex items-center justify-between">
                <span className="">Taxes and fees</span>
                <p className="text-white">
                  <span id="Final_tax" style={{ fontWeight: "600" }}>
                    {tax}
                  </span>{" "}
                  {props.currency}
                </p>
              </div>
            </div>

            {/* grand total */}
            <div className="flex items-center justify-between py-3 border-b border-white">
              <span className="">GRAND TOTAL</span>
              <span className="">
                <span id="Final_payable_price">{cost + tax}</span>{" "}
                {props.currency}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* contact information end  */}

      {/* {isOpen && (
                <Payment />
            )} */}
    </>
  );
}

export default CnfrmPay;
