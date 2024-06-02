import Link from "next/link";

const data = [
  { name: "John Doe", age: 28, email: "john@example.com" },
  { name: "Jane Smith", age: 34, email: "jane@example.com" },
  { name: "Michael Johnson", age: 45, email: "michael@example.com" },
  // Add more data as needed
];

export default async function Home() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Interviews</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-green-500 text-white">
                <th className="py-2 px-4 border-b">Company</th>
                <th className="py-2 px-4 border-b">Position</th>
                <th className="py-2 px-4 border-b">resume</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Location</th>
                <th className="py-2 px-4 border-b">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="bg-gray-50 odd:bg-white">
                  <td className="py-2 px-4 border-b">{row.name}</td>
                  <td className="py-2 px-4 border-b">{row.age}</td>
                  <td className="py-2 px-4 border-b">{row.email}</td>
                  <td className="py-2 px-4 border-b">{row.name}</td>
                  <td className="py-2 px-4 border-b">{row.age}</td>
                  <td className="py-2 px-4 border-b">{row.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
