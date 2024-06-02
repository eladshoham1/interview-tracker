import { redirect } from "next/navigation";
import db from "@/db/db";
import { Position } from "@/lib/types";

async function createTodo(data: FormData) {
  "use server";

  // console.log('data:', data)

  const time = data.get("time")?.valueOf();
  if (typeof time !== "string" || time.length === 0) {
    throw new Error("Invalid time");
  }
  const interviewers = data.get("interviewers")?.valueOf();
  if (typeof interviewers !== "string" || interviewers.length === 0) {
    throw new Error("Invalid interviewers");
  }

  const location = data.get("location")?.valueOf();
  if (typeof location !== "string" || location.length === 0) {
    throw new Error("Invalid location");
  }
  const isRemote = data.get("isRemote")?.valueOf();
  if (typeof isRemote !== "string" || isRemote.length === 0) {
    throw new Error("Invalid is remote");
  }
  const positionId = data.get("positionId")?.valueOf();
  if (typeof positionId !== "string" || positionId.length === 0) {
    throw new Error("Invalid position id");
  }

  await db.interview.create({
    data: {
      time: new Date(time),
      interviewers: interviewers.split(/\s*,\s*/),
      location,
      isRemote: isRemote === "yes",
      positionId,
    },
  });
  redirect("/");
}

export default function NewInterview({ positions }: { positions: Position[] }) {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1>New Interview</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col">
        Positon:
        <select
          name="positionId"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        >
          <option value="">--Please choose an option--</option>
          {positions.map((position: Position) => (
            <option key={position.id} value={position.id}>
              {position.title}
            </option>
          ))}
        </select>
        Date (format: DD/YY/MMMM HH:MM:ss):
        <input
          type="text"
          name="time"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        Interviewers (write all of them one by one separated by comma):
        <input
          type="text"
          name="interviewers"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        Location:
        <input
          type="text"
          name="location"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        Is remote:
        <select
          name="isRemote"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        >
          <option value="">--Please choose an option--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <div className="flex gap-1 justify-end">
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
