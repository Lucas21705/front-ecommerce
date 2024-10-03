import { IProductCardProps } from "@/interfaces/interfaces";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

function CartItem({ product, remove }: IProductCardProps) {
  const handleRemove = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (remove) {
          remove();
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });
        } else {
          console.error("Remove function is not defined.");
        }
      }
    });
  };

  return (
    <div className="flex  md:flex-row w-full border border-gray-300 my-6 font-bold justify-between items-center bg-slate-100 rounded-lg p-4 shadow-md">
      <div className="flex flex-col items-center w-full md:w-1/3 p-3">
        <Image src={product.image} alt={product.name} width={120} height={45} />
        <span className="mt-2 text-gray-700 text-center">{product.name}</span>
      </div>

      <div className="w-full md:w-1/3 text-center text-gray-700 py-2 md:py-0">
        ${product.price}
      </div>

      <div className="flex justify-end w-full md:w-1/3 mr-2">
        <button
          onClick={handleRemove}
          className="bg-red-600 hover:bg-red-700 text-gray-100 font-semibold py-2 px-4 rounded-full transition-colors duration-200 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center justify-center"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
