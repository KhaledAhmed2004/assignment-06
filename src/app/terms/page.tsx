import Link from "next/link";
import React from "react";

const TermsOfService = () => {
  return (
    <div className="px-5">
      <section className="container max-w-6xl px-5 mx-auto py-8 lg:py-10 bg-white my-4 md:my-12">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="mb-6">Last updated: October 17, 2024</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            Welcome to TecQue! By accessing and using our platform, you agree to
            adhere to these Terms of Service. If you do not agree with any part
            of these terms, please refrain from using our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            2. Changes to the Terms
          </h2>
          <p>
            We may update these Terms from time to time to reflect changes in
            our practices or for other operational, legal, or regulatory
            reasons. Any modifications will be effective immediately upon
            posting. Your continued use of the Service after any such changes
            constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">3. User Accounts</h2>
          <p>
            To access certain features of our Service, you may be required to
            create an account. You agree to provide accurate and complete
            information and to update it as necessary. You are solely
            responsible for maintaining the confidentiality of your account
            credentials and for all activities that occur under your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            4. User-Generated Content
          </h2>
          <p>
            By submitting any content to our platform (including comments,
            reviews, and feedback), you grant us a worldwide, non-exclusive,
            royalty-free license to use, reproduce, and distribute that content.
            You are responsible for ensuring your content does not violate any
            laws or the rights of third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            5. Payment and Premium Services
          </h2>
          <p>
            Some features of the Service may be offered as premium services for
            which you will be charged. By using these premium services, you
            agree to pay all associated fees. Payments are processed securely
            through third-party payment processors, and we do not store any
            payment information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            6. Prohibited Activities
          </h2>
          <p>
            You agree not to engage in any unlawful or prohibited activities
            while using our Service. This includes, but is not limited to,
            spamming, hacking, impersonating others, or distributing harmful
            software. Violation of this policy may result in account
            termination.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            7. Limitation of Liability
          </h2>
          <p>
            Our Service is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis without any warranties. We will not be liable
            for any damages arising from your use of the Service, including
            indirect, incidental, or consequential damages.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">8. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account and access
            to the Service at our sole discretion, without prior notice or
            liability, for any reason, including violations of these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">9. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of [Your Jurisdiction]. Any disputes arising under these
            Terms will be subject to the exclusive jurisdiction of the courts
            located in [Your Location].
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            10. Contact Information
          </h2>
          <p>
            If you have any questions or concerns about these Terms, please
            contact us at{" "}
            <Link
              href="mailto:support@tecQue.com"
              className="text-blue-500 hover:underline"
            >
              support@tecQue.com
            </Link>
            &nbsp;.
          </p>
        </section>
      </section>
    </div>
  );
};

export default TermsOfService;
