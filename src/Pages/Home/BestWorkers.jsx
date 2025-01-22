import { useQuery } from "@tanstack/react-query";
import Heading from "../../components/Heading";
import { axiosSecureUrl } from "../../hooks/useAxiosSecure";


const BestWorkers = () => {
  const {data:workers=[...Array(6)], isLoading} = useQuery({
    queryKey: ['best-workers'],
    queryFn: async() => {
      const {data} = await axiosSecureUrl('/best-workers');
      return data;
    }
  })
  return (
    <section className="section">
      <Heading heading='Best workers' />
      
      <div className="grid grid-cols-3 gap-4">
        {
          isLoading ? <>{
          workers.map((i, index) => <div key={index} className="skeleton py-8">
            <div className="w-full flex items-center flex-col">
              <div className="skeleton h-40 w-40 rounded-full"></div>
              <div className="mt-2 h-8 w-1/3 skeleton rounded-none"></div>
            </div>

            <div className="flex mt-4 gap-2 justify-center">
              <div className="skeleton w-1/4 h-12"></div>
              <div className="skeleton w-1/4 h-10"></div>
            </div>
          </div>)
        }</> : <>
          {
            workers.map(worker => <div key={worker?._id} className="border px-4 py-8">
              <div className="flex items-center text-center flex-col">
                <div>
                  <img src={worker?.image} className="h-40 w-40 object-cover rounded-full" alt={`${worker?.name}'s image`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mt-1">{worker?.name}</h3>
                </div>
              </div>

              <div className="flex gap-2 items-center mt-4 justify-center">
                <h3 className="font-semibold text-2xl">Coins:</h3>
                <p className="text-xl font-medium">{worker?.coin}</p>
              </div>
            </div>) 
          }
        </>
        }
      </div>

    </section>
  );
};

export default BestWorkers;