export default function WorkerCard({ worker }) {
  const { photo, name, role, coin } = worker;

  return (
    <div className="mx-8 my-4">
      <div className="card bg-base-200 mx-auto shadow-xl pt-6">
        <figure className="mx-auto">
          <img src={photo} className="rounded-full w-24 h-24" />
        </figure>
        <div className="card-body text-center">
          <h2 className="card-title mx-auto">{name}</h2>
          <h2 className="card-title mx-auto italic text-gray-500 dark:text-gray-400 text-base">
            {role}
          </h2>
          <p>Coin: {coin}</p>
          <div className="card-actions justify-center"></div>
        </div>
      </div>
    </div>
  );
}
