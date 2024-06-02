import { redirect } from "next/navigation";
import Link from "next/link";
import db from "@/db/db";
import { Resume, Company } from "@/lib/types";

async function createPosition(data: FormData) {
  "use server"

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.trim().length === 0) {
    throw new Error("Invalid title!");
  }

  const description = data.get("description")?.valueOf();
  if (typeof description !== "string" || description.trim().length === 0) {
    throw new Error("Invalid description!");
  }

  const applicationLink = data.get("applicationLink")?.valueOf();
  if (typeof applicationLink !== "string" || applicationLink.trim().length === 0) {
    throw new Error("Invalid application link!");
  }

  const recruiter = data.get("recruiter")?.valueOf();
  if (typeof recruiter !== "string" || recruiter.trim().length === 0) {
    throw new Error("Invalid recruiter name!");
  }

  const resumeId = data.get("resumeId")?.valueOf();
  if (typeof resumeId !== "string" || resumeId.trim().length === 0) {
    throw new Error("Invalid resume id!");
  }

  const companyId = data.get("companyId")?.valueOf();
  if (typeof companyId !== "string" || companyId.trim().length === 0) {
    throw new Error("Invalid company id!");
  }

  await db.position.create({ data: { title, description, applicationLink, recruiter, resumeId, companyId } });
  redirect("/");
}

export default async function NewPosition({ resumes, companies } : { resumes: Resume[], companies: Company[] }) {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New Position</h1>
      </header>
      <form action={createPosition} className="flex gap-2 flex-col">
        Resume:
        <select name='resumeId' className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100">
          <option value="">--Please choose an option--</option>
          {
            resumes.map((resume: Resume) => <option key={resume.id} value={resume.id}>{resume.filePath}</option>)
          }
        </select>
        Company:
        <select name='companyId' className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100">
          <option value="">--Please choose an option--</option>
          {
            companies.map((company: Company) => <option key={company.id} value={company.id}>{company.name}</option>)
          }
        </select>
        Title:
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        Description:
        <textarea
            name='description'
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        Link to application page:
        <input
          type="text"
          name="applicationLink"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        Recruiter Name:
        <input
          type="text"
          name="recruiter"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
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
