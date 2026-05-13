
export default function SubscribeSection() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-xl mx-auto text-center px-4">
        <h2 className="text-2xl font-semibold">
          Subscribe to our emails
        </h2>

        <p className="mt-2 text-gray-600">
          Be the first to know about new collections and special offers.
        </p>

        <form className="mt-6 flex">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 px-4 py-3 rounded-l-full border border-gray-300 focus:outline-none"
          />
          <button
            className="px-6 bg-black text-white rounded-r-full hover:bg-gray-800"
            type="submit"
          >
            →
          </button>
        </form>
      </div>
    </section>
  );
}