
export default function SubscribeSection() {
  return (
    <section className="bg-gray-100 py-16 sm:py-20">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <h2 className="text-xl font-semibold sm:text-2xl">
          Subscribe to our emails
        </h2>

        <p className="mt-2 text-gray-600 text-[14px] sm:text-[15px]">
          Be the first to know about new collections and special offers.
        </p>

        <form className="mt-6 flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-[14px] focus:outline-none sm:rounded-r-none sm:rounded-l-full"
          />
          <button
            className="rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-800 sm:rounded-l-none sm:rounded-r-full"
            type="submit"
          >
            →
          </button>
        </form>
      </div>
    </section>
  );
}
