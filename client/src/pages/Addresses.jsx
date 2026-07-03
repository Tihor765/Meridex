import { useEffect, useState } from "react";
import API from "../services/api";
import "./Addresses.css";

function Addresses() {

  const [showForm, setShowForm] = useState(false);

  const [addresses, setAddresses] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    house: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });


  // =========================
  // GET SAVED ADDRESSES
  // =========================

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


        const userAddresses =
          res.data.addresses || res.data;


        setAddresses(userAddresses);


      } catch (error) {

        console.log(error);

      }

    };


    getAddresses();


  }, []);




  // =========================
  // INPUT CHANGE
  // =========================


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };





  // =========================
  // SAVE ADDRESS
  // =========================


  const handleSaveAddress = async () => {

    try {


      const res = await API.post(
        "/addresses",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );



      const updatedAddresses =
        res.data.addresses || res.data;



      setAddresses(updatedAddresses);



      alert("Address saved successfully ✅");



      setFormData({
        fullName: "",
        phone: "",
        house: "",
        area: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
      });



      setShowForm(false);



    } catch (error) {


      console.log(error);


      alert(
        error.response?.data?.message ||
          "Failed to save address ❌"
      );

    }

  };






  return (

    <div className="addresses-page">


      <div className="addresses-header">

        <h1>📍 My Addresses</h1>

        <p>
          Manage your delivery addresses for faster checkout.
        </p>

      </div>





      {/* ADD ADDRESS FORM */}


      {showForm ? (

        <div className="address-form">


          <h2>Add New Address</h2>



          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />


          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />


          <input
            name="house"
            placeholder="House / Flat No."
            value={formData.house}
            onChange={handleChange}
          />


          <input
            name="area"
            placeholder="Area / Street"
            value={formData.area}
            onChange={handleChange}
          />


          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />


          <input
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />


          <input
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
          />


          <input
            name="landmark"
            placeholder="Landmark"
            value={formData.landmark}
            onChange={handleChange}
          />



          <button
            className="add-address-btn"
            onClick={handleSaveAddress}
          >

            Save Address

          </button>



        </div>



      ) : (



        <>



          {addresses.length === 0 ? (


            <div className="addresses-empty">


              <h2>No Addresses Found</h2>


              <p>
                Your saved addresses will appear here.
              </p>


            </div>



          ) : (



            <div className="address-list">



              {addresses.map((address) => (



                <div
                  className="address-card"
                  key={address._id}
                >


                  <h2>
                    🏠 {address.fullName}
                  </h2>


                  <p>
                    📞 {address.phone}
                  </p>


                  <p>
                    {address.house}, {address.area}
                  </p>


                  <p>
                    {address.city}, {address.state}
                  </p>


                  <p>
                    📍 {address.pincode}
                  </p>


                  {address.landmark && (

                    <p>
                      Landmark : {address.landmark}
                    </p>

                  )}



                </div>


              ))}



            </div>



          )}




          <button
            className="add-address-btn"
            onClick={() => setShowForm(true)}
          >

            + Add New Address

          </button>




        </>



      )}




    </div>

  );

}


export default Addresses;