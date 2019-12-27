#!/usr/bin/env python
# Replace the following:
idp_arn='arn:aws:iam::000123456789:saml-provider/Google'
role_arn='arn:aws:iam::000123456789:role/admin'
profile_name='default'
session_duration=60 * 60 * 12

import boto3
import configparser
import os.path
import readline # needed for terminal raw mode (> 4096 characters)

try:
    input = raw_input
except NameError:
    pass

config_path=os.path.expanduser('~/.aws/credentials')
# would use getpass, but truncates to terminal max 4096
saml_assertion = input('Base64 encoded SAML response:\n')

sts = boto3.client('sts')
response = sts.assume_role_with_saml(
    DurationSeconds=session_duration,
    PrincipalArn=idp_arn,
    RoleArn=role_arn,
    SAMLAssertion=saml_assertion,
)

config = configparser.RawConfigParser()
config.read(config_path)

if not config.has_section(profile_name):
    config.add_section(profile_name)

config.set(profile_name, 'aws_access_key_id', response['Credentials']['AccessKeyId'])
config.set(profile_name, 'aws_secret_access_key', response['Credentials']['SecretAccessKey'])
config.set(profile_name, 'aws_session_token', response['Credentials']['SessionToken'])

with open(config_path, 'w+') as f:
    config.write(f)
