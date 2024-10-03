import CartComponent from "@/components/CartComponent";

function CheckOut() {
  return (
    <div className="w-full max-w-4xl min-h-[90vh] flex flex-col items-center mt-12 mb-12 mx-auto bg-white shadow-md rounded-xl overflow-hidden">
      <div className="w-full py-4 flex justify-around items-center border-b border-gray-200 bg-gray-200 flex-wrap md:flex-nowrap">
        <div className="capitalize w-[40%] md:w-[30%] text-left pl-4 md:pl-20">
          <span className="ml-4 font-semibold text-black text-lg">Product</span>
        </div>
        <div className="capitalize w-[30%] md:w-[20%] text-center pr-4 md:pr-52">
          <span className="mr-8 font-semibold text-black text-lg">Price</span>
        </div>
        <div className="capitalize w-[20%] md:w-[10%] text-center pr-4 md:pr-28">
          <span className="mr-4 font-semibold text-black text-lg">Remove</span>
        </div>
      </div>
      <div className="w-full p-4 md:p-6">
        <CartComponent />
      </div>
    </div>
  );
}

export default CheckOut;
