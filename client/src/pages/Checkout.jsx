import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";
import { showSuccess, showError } from "../utils/toast";
import "./Checkout.css";

function Checkout() {

  const { cartItems } = useContext(CartContext);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);



  // ==========================
  // LOAD SAVED ADDRESSES
  // ==========================

  useEffect(() => {

    const getAddresses = async () => {

      try {

        const res = await API.get(
          "/addresses",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "token"
              )}`,
            },
          }
        );


        console.log(
          "CHECKOUT ADDRESS DATA:",
          res.data
        );



        let userAddresses = [];



        if (Array.isArray(res.data)) {

          userAddresses = res.data;

        }


        else if (
          Array.isArray(res.data.addresses)
        ) {

          userAddresses =
            res.data.addresses;

        }


        else if (
          Array.isArray(
            res.data.user?.addresses
          )
        ) {

          userAddresses =
            res.data.user.addresses;

        }




        setAddresses(userAddresses);



        if (userAddresses.length > 0) {

          setSelectedAddress(
            userAddresses[0]
          );

        }



      } catch (error) {

        console.log(error);

      }

    };



    getAddresses();


  }, []);





  // ==========================
  // PRICE CALCULATION
  // ==========================


  const totalPrice = cartItems.reduce(

    (total, item) =>

      total +
      item.price *
        (item.quantity || 1),

    0

  );



  const totalItems = cartItems.reduce(

    (total, item) =>

      total +
      (item.quantity || 1),

    0

  );







  // ==========================
  // PAYMENT
  // ==========================


  const handlePayment = async () => {


    if (!selectedAddress) {

      showError(
        "Please select delivery address"
      );

      return;

    }




    try {


      const { data: order } =
        await API.post(
          "/payments/create-order",
          {
            amount: totalPrice,
          }
        );




      const options = {


        key:
          import.meta.env
            .VITE_RAZORPAY_KEY_ID,


        amount: order.amount,


        currency: order.currency,


        name: "Meridex",


        description:
          "Meridex Shopping Payment",


        order_id: order.id,


handler: async function (response) {

  try {

const orderItems =
  cartItems.map((item) => ({
product:
  item._id ||
  item.id ||
  item.product?._id ||
  item.product?.id,

    name:
      item.name ||
      item.product?.name,

    image:
      item.image ||
      item.product?.image,

    price:
      item.price ||
      item.product?.price,

    quantity:
      item.quantity || 1,

  }));




    await API.post(
      "/orders",
      {

        items: orderItems,


        shippingAddress:
          selectedAddress,


        totalAmount:
          totalPrice,


        paymentInfo: {

          razorpayPaymentId:
            response.razorpay_payment_id,


          razorpayOrderId:
            response.razorpay_order_id,

        },


      },

      {

        headers: {

          Authorization:
            `Bearer ${localStorage.getItem(
              "token"
            )}`,

        },

      }

    );




    showSuccess(
      "Order placed successfully 🎉"
    );



  } catch (error) {


    console.log(error);


    showError(
      "Order saving failed"
    );


  }

},


        theme: {

          color: "#2563eb",

        },


      };




      const razorpay =
        new window.Razorpay(options);



      razorpay.open();




    } catch (error) {


      console.log(error);


      showError(
        error.response?.data?.message ||
          "Payment Failed"
      );


    }

  };







  return (

    <div className="checkout-page">


      <h1 className="checkout-title">

        Secure Checkout

      </h1>





      <div className="checkout-layout">


        <div>




          {/* DELIVERY ADDRESS */}


          <div className="checkout-products">


            <h2>
              📍 Delivery Address
            </h2>




            {addresses.length === 0 ? (


              <p>
                No address found.
                Please add address from profile.
              </p>


            ) : (


              addresses.map((address) => (


                <div
                  key={address._id}
                  className="checkout-address-card"
                >


                  <input

                    type="radio"

                    checked={
                      selectedAddress?._id
                      ===
                      address._id
                    }


                    onChange={() =>
                      setSelectedAddress(
                        address
                      )
                    }

                  />




                  <div>


                    <h3>
                      {address.fullName}
                    </h3>


                    <p>

                      {address.house},
                      {" "}
                      {address.area}

                    </p>



                    <p>

                      {address.city},
                      {" "}
                      {address.state}

                    </p>



                    <p>

                      📞 {address.phone}

                    </p>



                  </div>



                </div>


              ))


            )}



          </div>






          {/* ORDER ITEMS */}


          <div className="checkout-products">


            <h2>
              Order Items
            </h2>




            {cartItems.map((item) => (


              <div

                key={item._id}

                className="checkout-item"

              >



                <img

                  src={item.image}

                  alt={item.name}

                />



                <div style={{ flex: 1 }}>


                  <h3>

                    {item.name}

                  </h3>



                  <p>

                    Quantity :
                    {" "}
                    {item.quantity || 1}

                  </p>



                </div>





                <h3>


                  ₹
                  {
                    item.price *
                    (item.quantity || 1)
                  }


                </h3>




              </div>


            ))}



          </div>




        </div>







        {/* SUMMARY */}


        <div className="checkout-summary">


          <h2>

            Order Summary

          </h2>



          <p>

            Total Items :

            <strong>

              {" "}
              {totalItems}

            </strong>

          </p>




          <p>

            Subtotal :

            <strong>

              {" "}
              ₹{totalPrice}

            </strong>

          </p>




          <hr />




          <h2 className="checkout-total">

            ₹{totalPrice}

          </h2>




<button
  className="pay-btn"
  onClick={handlePayment}
>
  Proceed to Payment
</button>



         




        </div>





      </div>



    </div>


  );

}


export default Checkout;