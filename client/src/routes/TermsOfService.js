import React from "react";
import Header from "../components/Layout/Header";

function TermsOfService({ user, usersCount, signOut }) {
  return (
    <>
      <Header user={user} usersCount={usersCount} signOut={signOut} />
      <h3 className="main-heading">Terms of Service</h3>
      <div className="tos-content">
        <p>Effective Date: 10/11/2023</p>
        <p>
          Please carefully read these Terms of Service ("Terms") for Shoutizer
          ("we," "our," or "us") before using our website, services, or
          participating in our shoutout promotion pools. By using Shoutizer, you
          agree to comply with and be bound by these Terms. If you do not agree
          with these Terms, please refrain from using our services.
        </p>
        <p>
          <em>1. How Shoutizer Works</em>
        </p>
        <p>
          Shoutizer is a platform where users can enter promotion or shoutout
          pools to potentially have their website, Instagram profile page,
          business website, or product showcased for 24 hours. Here's how it
          works:
        </p>
        <p>
          1.1. Eligibility: Users must be eligible to participate in the
          shoutout pools. This includes being the owner of the email used for
          registration and complying with all other eligibility criteria
          established by Shoutizer.
        </p>
        <p>
          1.2. Registration: To participate, create an account by visiting the
          'Register' route in the header menu. You must verify that you own the
          registered email by following the verification link sent to your email
          address.
        </p>
        <p>
          1.3. Pool Entry: If a link is being promoted when you wish to enter a
          pool, you must visit that link to be eligible for entry. Press 'Enter
          Shoutout Pool' to join the pool of users participating in the next
          shoutout lottery.
        </p>
        <p>
          1.4. Random Selection: When the timer runs out, one winner will be
          randomly selected from the pool of participants. The selected user's
          website URL and description will be displayed for 24 hours.
        </p>
        <p>
          <em>2. Acceptable Use Policy</em>
        </p>
        <p>
          When using Shoutizer, you agree to adhere to the following Acceptable
          Use Policy:
        </p>
        <p>
          2.1. Eligibility: You must be at least 18 years old or have reached
          the age of majority in your jurisdiction to use Shoutizer.
        </p>
        <p>
          2.2. Legal and Ethical Use: You must use Shoutizer for lawful and
          ethical purposes. Do not engage in any illegal, harmful, or fraudulent
          activities on our platform.
        </p>
        <p>
          2.3. Respectful Conduct: Be respectful towards other users. Do not
          engage in harassment, hate speech, or any behavior that may harm,
          offend, or threaten others.
        </p>
        <p>
          2.4. Intellectual Property: Respect intellectual property rights. Do
          not use copyrighted content or trademarks without proper
          authorization.
        </p>
        <p>
          2.5. Privacy: Protect user privacy. Do not share personal information
          without consent, and adhere to our Privacy Policy.
        </p>
        <p>
          2.6. No Misrepresentation: Do not impersonate another user, use
          deceptive methods to enter pools, or manipulate the platform's
          functionality.
        </p>
        <p>
          2.7. No Abuse: Do not abuse the service, including excessive use that
          may overload or disrupt our platform.
        </p>
        <p>
          2.8. Compliance with Laws: Comply with all applicable laws,
          regulations, and guidelines governing your use of Shoutizer.
        </p>
        <p>
          <em>3. User Accounts</em>
        </p>
        <p>
          3.1. You are responsible for maintaining the confidentiality of your
          account credentials, including your password.
        </p>
        <p>
          3.2. You agree to notify us immediately if you suspect any
          unauthorized access or use of your account.
        </p>
        <p>
          3.3. We reserve the right to suspend or terminate your account if you
          violate these Terms.
        </p>
        <p>
          <em>4. Modifications</em>
        </p>
        <p>
          We may update and modify these Terms at any time, and any changes will
          be effective immediately upon posting. It is your responsibility to
          regularly review the Terms to stay informed of any updates.
        </p>
        <p>
          <em>5. Termination</em>
        </p>
        <p>
          We may, at our discretion, suspend or terminate your access to
          Shoutizer for violations of these Terms or for any other reason. You
          may also terminate your account at any time.
        </p>
        <p>
          <em>6. Contact Us</em>
        </p>
        <p>
          If you have any questions or concerns about these Terms or Shoutizer,
          please contact us at contact@milosdraskovic.com.
        </p>
        <p>
          By using Shoutizer, you acknowledge that you have read and understood
          these Terms of Service, and you agree to abide by them. Thank you for
          using Shoutizer!
        </p>
      </div>
    </>
  );
}

export default TermsOfService;
