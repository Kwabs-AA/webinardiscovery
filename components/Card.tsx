import { useRouter } from "next/navigation";

interface Props {
  name: string;
  description: string;
  _id: string;
  link: string;
}

const Card = ({ name, description, _id, link }: Props) => {
  const router = useRouter();

  const handleFetchCategory = async () => {
    if (!_id) return;
    
    try {
      router.push(`/categories/${_id}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full sm:w-72 md:w-80 lg:w-96 mx-2 my-4 transition-transform duration-300 hover:scale-105">
      <div className="card bg-base-100 shadow-xl h-full">
        <figure className="relative w-full pt-[56.25%]">
          <img
            src={link}
            alt={`${name} webinar`}
            className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
          />
        </figure>
        
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title text-lg sm:text-xl mb-2 line-clamp-2">
            {name?.toUpperCase()}
          </h2>
          
          <p className="text-sm sm:text-base text-gray-600 line-clamp-3 mb-4">
            {description}
          </p>
          
          <div className="card-actions justify-end mt-auto">
            <button
              className="w-full sm:w-auto px-4 py-2 btn bg-base-300 hover:bg-green-300 transition-colors duration-300"
              onClick={handleFetchCategory}
              disabled={!_id}
            >
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;