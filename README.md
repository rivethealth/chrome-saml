# Chrome SAML

See the most recent SAML response in the browser.

This is useful for other programs requiring SAML responses.

For example, the AWS CLI:

```txt
aws sts assume-role-with-saml \
    --role-arn arn:aws:iam::000000000000:role/Admin \
    --principal-arn arn:aws:iam::000000000000:saml-provider/Google \
    --saml-assertion <base64_saml_response>
```

## Usage

1. Perform your normal SAML login via Chrome.

2. Click on the key icon in the upper right.

3. Copy the base64 encoded or raw SAML response.

## Full example: Google + AWS

1. Add browser bookmark for Google-initiated login, e.g. https://accounts.google.com/o/saml2/initsso?idpid=A0000000&spid=000000000000&forceauthn=false

2. Copy [`examples/aws-auth.py`]('examples/aws-auth.py'), and replace variables.

Authenticate AWS CLI by clicking on bookmark, copying SAML response, and running script.