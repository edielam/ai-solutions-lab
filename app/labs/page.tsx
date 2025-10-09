import Link from "next/link";
import { getAllLabsSummary } from "@/lib/labs-data";

export default function LabsPage() {
  const labs = getAllLabsSummary();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="py-3 sm:py-4">
            <h1 className="text-base sm:text-xl font-semibold text-gray-900">
              AI Receptionist Labs
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              AI Receptionist Labs
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Learn to build production-ready AI applications through hands-on
              labs.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6">
            {labs.map((lab) => (
              <div
                key={lab.id}
                className="border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 hover:border-gray-300 transition-colors"
              >
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 text-gray-900">
                  {lab.title}
                </h2>
                <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base leading-relaxed">
                  {lab.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-gray-500">
                    <span>Level: {lab.level}</span>
                    <span>Tech: {lab.technology}</span>
                  </div>

                  <Link
                    href={`/labs/${lab.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm lg:text-base inline-flex items-center"
                  >
                    Start Lab →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
