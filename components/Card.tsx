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
        <div className="card bg-base-100 w-72 shadow-xl mx-4 sm:my-3">
            <figure className="relative w-full " style={{ paddingTop: '56.25%' }}>
                <img
                    src={link}
                    alt={`${name} webinar`}
                    className="absolute top-0 left-0 w-full h-full object-cover "
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name?.toUpperCase()}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <button
                        className="btn bg-base-300 hover:bg-green-300"
                        onClick={handleFetchCategory}
                        disabled={!_id}
                    >
                        Learn more
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
