import { useQuery } from "@tanstack/react-query";
import { getHotels } from "../../API/Hotel";

function Hotel() {
  const { status, data, error } = useQuery({
    queryKey: ["hotels"],
    queryFn: getHotels,
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }
  console.log(data?.data?.data);
  return (
    <div>
      {/* {data.data.data.map((hotel) => {
        return (
          <div key={hotel.id}>
            <h1>{hotel.name}</h1>
          </div>
        );
      })} */}
    </div>
  );
}

export default Hotel;
