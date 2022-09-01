import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

function RoomCreate({ id }) {
  const { data } = useQuery(["person", id], () => fetchPerson(id));
  const { register, handleSubmit } = useForm();
  const { mutate } = useMutation((values) => updatePerson(values));

  if (data) {
    return (
      <form onSubmit={handleSubmit(mutate)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register("firstName")} defaultValue={data.firstName} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input {...register("lastName")} defaultValue={data.lastName} />
        </div>
        <input type="submit" />
      </form>
    );
  }

  return "loading...";
}
export default RoomCreate;
