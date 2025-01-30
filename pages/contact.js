export default function Contact() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-2 border rounded-lg"
            rows="4"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    );
  }