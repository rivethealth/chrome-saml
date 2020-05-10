# Chrome SAML

[![Chrome extension](https://img.shields.io/chrome-web-store/v/cbenhegonmmoommjjbklhfjlgclpcong.svg)](https://chrome.google.com/webstore/detail/saml-response/cbenhegonmmoommjjbklhfjlgclpcong)

View and copy the most recent SAML response from the web browser.

This is useful for giving other programs (e.g. a CLI utility) a SAML response.

Works with Google Chrome and Mozilla Firefox.

<p align="center">
  <img alt="Screenshot" src="doc/screenshot.png">
</p>

## Install

[Chrome Web Store](https://chrome.google.com/webstore/detail/saml-response/cbenhegonmmoommjjbklhfjlgclpcong)

Or download ZIP from
[Releases](https://github.com/rivethealth/chrome-saml/releases) and manually
install as a browser extension.

## Usage

1. Perform your normal SAML login via Chrome.

2. Click on the key icon in the upper right.

3. Copy the base64 encoded or raw SAML response.

## Rationale

The was developed after running into
[anti-robot measures](https://github.com/cevoaustralia/aws-google-auth/issues/160)
with GSuite SAML. Instead of replicating a browser, this approach uses your real
browser and human to authenticate; after which the SAML can be copy-pasted to
its destination.

## Example

Use GSuite as the IdP where the SP is the AWS CLI.

1. Go to the SAML sign in URL, e.g. https://accounts.google.com/o/saml2/initsso?idpid=A0000000&spid=000000000000&forceauthn=false, and enter credentials.
2. After being redirected to the AWS web console, copy the base-64 encoded SAML response captured by the browser extension.
3. Run the command `aws sts assume-role-with-saml` or the even more convenient [aws-cli-saml](https://github.com/rivethealth/aws-cli-saml).
4. Paste the SAML response, and a credentialed session is created for the AWS CLI.
