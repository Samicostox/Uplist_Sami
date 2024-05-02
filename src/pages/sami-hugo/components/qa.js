export default function Faqs() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-b border-gray-100">
          {/* Section header */}
          <div className="pb-12 md:pb-20">
            <h2 className="text-5xl font-extrabold text-left font-cabinet-grotesk">
              Questions and answers
            </h2>
          </div>
          {/* Columns */}
          <div className="md:flex md:space-x-12 space-y-8 md:space-y-0">
            {/* Column */}
            <div className="w-full md:w-1/2 space-y-8">
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl text-left font-cabinet-grotesk font-bold">
                  What is UPlist?
                </h4>
                <p className="text-gray-500 text-left">
                  A platform for music artists to merge their YouTube,
                  SoundCloud, Spotify content, and Mailchimp promotions in one
                  biolink, making it easier for fans to explore and book
                  services.
                </p>
              </div>
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl text-left font-cabinet-grotesk font-bold">
                  How can users discover new artists?
                </h4>
                <p className="text-gray-500 text-left">
                  Users can discover new music artists through our dedicated
                  "Discover" page, which showcases the main artist biolinks.
                  This feature allows users to explore a wide range of artists
                  and their offerings on a single, user-friendly platform.
                </p>
              </div>
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl text-left font-cabinet-grotesk font-bold">
                  Is there a content limit for artist biolinks?
                </h4>
                <p className="text-gray-500 text-left">
                  Artists are free to embed as much content as they wish from
                  YouTube, SoundCloud, and Spotify on their biolink pages. Our
                  platform is designed to help artists showcase their complete
                  portfolio without restrictions.
                </p>
              </div>
            </div>
            {/* Column */}
            <div className="w-full md:w-1/2 space-y-8">
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl text-left font-cabinet-grotesk font-bold">
                  How does the booking and payment process work on UPlist?
                </h4>
                <p className="text-gray-500 text-left">
                  Fans book and pay for services directly via artist biolinks,
                  with a transaction fee applied to each booking.
                </p>
              </div>
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl text-left font-cabinet-grotesk font-bold">
                  What kind of support does UPlist offer to its users?
                </h4>
                <p className="text-gray-500 text-left">
                  Our platform is committed to providing a seamless experience
                  for both artists and fans. For any inquiries or issues, users
                  can reach out to our support team through the contact
                  information provided on our website. We ensure prompt
                  assistance to resolve any concerns.
                </p>
              </div>
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl text-left font-cabinet-grotesk font-bold">
                  How does UPlist handle privacy and security, especially for
                  transactions?
                </h4>
                <p className="text-gray-500 text-left">
                  Ensuring the privacy and security of our users' data,
                  including payment information, is a top priority at UPlist. We
                  employ robust security measures to protect against
                  unauthorised access and ensure that all transactions are
                  processed securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
