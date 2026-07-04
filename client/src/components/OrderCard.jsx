import "../pages/Orders.css";


const OrderCard = ({ order }) => {

  return (

    <div className="order-card">


      {/* PRODUCTS */}

      {order.items?.map((item) => (

        <div
          key={item._id}
          className="order-product"
        >


          <div className="order-image-container">


            <img

              src={item.image}

              alt={item.name}

              className="order-image"

            />


          </div>




          <div className="order-details">


            <h2 className="order-product-name">

              {item.name}

            </h2>




            <p className="order-price">

              ₹{item.price}

            </p>




            <p>

              Quantity :
              {" "}
              {item.quantity}

            </p>


          </div>


        </div>

      ))}




      {/* ORDER INFO */}


      <div className="order-details">


        <h2>

          Total : ₹{order.totalAmount}

        </h2>




        <p className="order-date">

          📅 Ordered on{" "}

          {new Date(
            order.createdAt
          ).toLocaleDateString()}

        </p>





        <p>

          📍 Deliver To:

          <br />

          {order.shippingAddress?.fullName}

          <br />

          {order.shippingAddress?.city},

          {" "}

          {order.shippingAddress?.state}

        </p>





        <span className="order-status">

          📦 {order.orderStatus}

        </span>



      </div>



    </div>

  );

};


export default OrderCard;