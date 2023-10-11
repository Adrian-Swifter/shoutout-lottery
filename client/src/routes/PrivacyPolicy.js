import React from "react";
import Header from "../components/Layout/Header";

function PrivacyPolicy({ user, usersCount, signOut }) {
  return (
    <>
      <Header user={user} usersCount={usersCount} signOut={signOut} />
      <h3 className="main-heading">Privacy Policy</h3>
      <div className="privacy-content">
        <p>Effective Date: 10/11/2023</p>
        <p>
          At Shoutizer ("we," "our," or "us"), we are committed to protecting
          your privacy and providing a safe online environment for our users.
          This Privacy Policy outlines our practices regarding the collection,
          use, and sharing of your personal information when you use our website
          and services. By using Shoutizer, you consent to the practices
          described in this policy.
        </p>
        <p>
          <em>1. Information We Collect</em>
        </p>
        <ol>
          <li>
            1.1. Account Information: When you create an account, we collect
            information such as your name, email address, and any other details
            you provide during the registration process.
          </li>
          <li>
            1.2. Log Data: We automatically collect information about your use
            of the website, including your IP address, browser type, operating
            system, and other related data.
          </li>
          <li>
            1.3. Cookies and Similar Technologies: We use cookies and similar
            technologies to collect information about your interactions with our
            platform. You can manage your cookie preferences in your browser
            settings.
          </li>
          <li>
            1.4. User-Generated Content: Any content you submit, post, or share
            on Shoutizer may be collected, including text, images, and links.
          </li>
        </ol>
        <p>
          <em>2. How We Use Your Information</em>
        </p>
        <ol>
          <li>
            2.1. Providing Services: We use the collected information to provide
            and improve our services, including administering shoutout pools and
            delivering prizes.
          </li>
          <li>
            2.2. Communication: We may contact you with service-related
            announcements, updates, and other relevant information.
          </li>
          <li>
            2.3. Personalization: We may use your information to personalize
            your experience on our platform.
          </li>
          <li>
            2.4. Legal Obligations: We may process your information to comply
            with legal obligations, including responding to legal requests.
          </li>
        </ol>
        <p>
          <em>3. Information Sharing</em>
        </p>
        <p>
          We do not sell or rent your personal information to third parties.
          However, we may share your information in the following circumstances:
        </p>
        <ol>
          <li>
            3.1. Service Providers: We may share information with trusted
            service providers who assist us in providing and maintaining our
            services. These providers are contractually obligated to protect
            your information.
          </li>
          <li>
            3.2. Legal Requirements: We may share information when required by
            law, such as in response to a subpoena, court order, or other legal
            requests.
          </li>
          <li>
            3.3. Protection of Rights: We may share information to protect our
            rights, privacy, safety, or property, as well as the rights,
            privacy, safety, or property of our users and the public.
          </li>
          <li>
            3.4. Business Transfers: In the event of a merger, acquisition, or
            sale of all or a portion of our assets, your information may be
            transferred as part of that transaction.
          </li>
        </ol>
        <p>
          <em>4. Data Security</em>
        </p>
        <p>
          We take appropriate security measures to protect your information.
          However, no method of online transmission or electronic storage is
          completely secure. Therefore, while we strive to protect your personal
          information, we cannot guarantee its absolute security.
        </p>
        <p>
          <em>5. Access and Control Over Your Information</em>
        </p>
        <p>
          You have the right to access, modify, or delete your personal
          information. You can also unsubscribe from promotional communications.
          To exercise these rights, please contact us at
          contact@milosdraskovic.com.
        </p>
        <p>
          <em>6. Children's Privacy</em>
        </p>
        <p>
          Shoutizer is not intended for use by children under the age of 18 or
          the age of majority in their jurisdiction. We do not knowingly collect
          or maintain information from individuals under these ages.
        </p>
        <p>
          <em>7. Changes to this Privacy Policy</em>
        </p>
        <p>
          We may update and modify this Privacy Policy as necessary. Any changes
          will be effective immediately upon posting, and we will update the
          effective date accordingly. Please check this page regularly for
          updates.
        </p>
        <p>
          <em>8. Contact Us</em>
        </p>
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or the information we collect, please contact us at
          contact@milosdraskovic.com.
        </p>
        <p>
          By using Shoutizer, you acknowledge that you have read and understood
          this Privacy Policy and agree to the practices described. Your privacy
          is important to us, and we appreciate your trust in Shoutizer. Thank
          you for using our platform!
        </p>
      </div>
    </>
  );
}

export default PrivacyPolicy;
