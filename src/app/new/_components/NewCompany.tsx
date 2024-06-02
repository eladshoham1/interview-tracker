import { redirect } from "next/navigation";
import db from "@/db/db";

async function createCompany(data: FormData) {
    "use server"

    const name = data.get("name")?.valueOf();
    if (typeof name !== "string" || name.trim().length === 0) {
        throw new Error("Invalid Company name!");
    }

    const location = data.get("location")?.valueOf();
    if (typeof location !== "string" || location.trim().length === 0) {
        throw new Error("Invalid Company location!");
    }

    await db.company.create({ data: { name, location } });
    redirect("/");
}

export default function NewCompany() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New Company</h1>
      </header>
      <form action={createCompany} className="flex gap-2 flex-col">
        Name:
        <input
          type="text"
          name="name"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        Location:
        <input
          type="text"
          name="location"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
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
  )
}
