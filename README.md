# Chrome SAML

See the most recent SAML response in the browser.

This is useful for other programs requiring SAML responses.

For example, copy-paste to the AWS CLI:

```sh
aws assume-role-with-saml \
    --role-arn arn:aws:iam::000000000000:role/Admin \
    --principal-arn arn:aws:iam::000000000000:saml-provider/Google \
    --saml-assertion <saml_response>
```
