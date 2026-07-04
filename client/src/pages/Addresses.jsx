import { useEffect, useState } from "react";
import API from "../services/api";
import "./Addresses.css";


function Addresses() {

  const [showForm, setShowForm] = useState(false);

  const [addresses, setAddresses] = useState([]);

  const [editId, setEditId] = useState(null);


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



  useEffect(() => {

    const getAddresses = async () => {

      try {

        const res = await API.get(
          "/addresses",
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );


        setAddresses(
          res.data.addresses || res.data
        );


      } catch (error) {

        console.log(error);

      }

    };


    getAddresses();

  }, []);







  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };







  // ADD + UPDATE ADDRESS

  const handleSaveAddress = async () => {

    try {


      let res;


      if (editId) {


        res = await API.put(

          `/addresses/${editId}`,

          formData,

          {
            headers: {

              Authorization:
                `Bearer ${localStorage.getItem("token")}`,

            },
          }

        );


        alert(
          "Address updated successfully ✏️"
        );


      } else {



        res = await API.post(

          "/addresses",

          formData,

          {
            headers: {

              Authorization:
                `Bearer ${localStorage.getItem("token")}`,

            },
          }

        );


        alert(
          "Address saved successfully ✅"
        );


      }




      setAddresses(
        res.data.addresses || res.data
      );



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



      setEditId(null);

      setShowForm(false);




    } catch (error) {

      console.log(error);

      alert("Operation failed ❌");

    }

  };









  // EDIT

  const handleEditAddress = (address) => {


    setFormData({

      fullName: address.fullName,

      phone: address.phone,

      house: address.house,

      area: address.area,

      city: address.city,

      state: address.state,

      pincode: address.pincode,

      landmark: address.landmark,

    });


    setEditId(address._id);


    setShowForm(true);


  };








  // DELETE

  const handleDeleteAddress = async (id) => {


    try {


      const res = await API.delete(

        `/addresses/${id}`,

        {
          headers: {

            Authorization:
              `Bearer ${localStorage.getItem("token")}`,

          },
        }

      );



      setAddresses(
        res.data.addresses || res.data
      );



      alert(
        "Address deleted 🗑"
      );



    } catch (error) {


      console.log(error);


    }


  };









  return (

    <div className="addresses-page">


      <div className="addresses-header">

        <h1>📍 My Addresses</h1>

        <p>
          Manage your delivery addresses.
        </p>

      </div>





      {showForm ? (

        <div className="address-form">


          <h2>

            {editId
              ? "✏️ Edit Address"
              : "Add New Address"}

          </h2>




          {Object.keys(formData).map(
            (field) => (

              <input

                key={field}

                name={field}

                placeholder={field}

                value={formData[field]}

                onChange={handleChange}

              />

            )
          )}





          <button

            className="add-address-btn"

            onClick={handleSaveAddress}

          >

            {editId
              ? "Update Address"
              : "Save Address"}

          </button>



        </div>




      ) : (


        <>


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
                  📍 {address.pincode}
                </p>






                <button

                  className="add-address-btn"

                  onClick={() =>
                    handleEditAddress(address)
                  }

                >

                  ✏️ Edit Address

                </button>





                <button

                  className="delete-address-btn"

                  onClick={() =>
                    handleDeleteAddress(
                      address._id
                    )
                  }

                >

                  🗑 Delete Address

                </button>




              </div>


            ))}


          </div>





          <button

            className="add-address-btn"

            onClick={() =>
              setShowForm(true)
            }

          >

            + Add New Address

          </button>



        </>


      )}



    </div>

  );

}


export default Addresses;