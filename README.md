# Chrome SAML

See the most recent SAML response in the web browser.

This is useful for other (non-web) programs requiring SAML responses.

<p align="center">
  <img alt="Screenshot" src="doc/screenshot.png">
</p>

## Install

Enable developer mode. Download ZIP from [Releases](https://github.com/rivethealth/chrome-saml/releases), and add to Chrome extensions.

Chrome Webstore listing is currently under review.

## Usage

1. Perform your normal SAML login via Chrome.

2. Click on the key icon in the upper right.

3. Copy the base64 encoded or raw SAML response.

## IdP examples

### Google

Find your IdP and SP ids, and bookmark https://accounts.google.com/o/saml2/initsso?idpid=A0000000&spid=000000000000&forceauthn=false

## SP examples

### AWS CLI

```txt
aws sts assume-role-with-saml \
    --role-arn arn:aws:iam::000000000000:role/Admin \
    --principal-arn arn:aws:iam::000000000000:saml-provider/Google \
    --saml-assertion <base64_saml_response>
```

See https://github.com/rivethealth/aws-saml-cli for a helpful solution.
