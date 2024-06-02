import { redirect } from "next/navigation";
import db from "@/db/db";

async function createResume(data: FormData) {
  "use server";

  // console.log('data:', data.get('title')?.valueOf())

  // await db.resume.create({ data: { filePath: "C:/Elad Shoham.pdf" } })
  redirect("/");
}

export default function NewResume() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1>New Resume</h1>
      </header>
      <form action={createResume} className="flex gap-2 flex-col">
        Choose resume:
        <input
          type="file"
          name="title"
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
  );
}
