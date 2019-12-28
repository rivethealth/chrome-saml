#!/usr/bin/env python
import argparse

parser = argparse.ArgumentParser('aws-auth')
parser.add_argument('-p', '--profile', help='AWS profile name. Defaults to AWS_PROFILE or \'default\'.')
parser.add_argument('-d', '--session-duration', type=int, help='Session duration in seconds. Defaults to saml.session_duration or 3600.')
parser.add_argument('-i', '--idp-arn', help='Authenticating SAML provider ARN. Defaults to saml.idp_arn.')
parser.add_argument('-r', '--role-arn', help='Assumed IAM role ARN. Defaults to saml.role_arn.')
args = parser.parse_args()

import boto3
import configparser
import os
import os.path
import readline # needed for terminal raw mode (> 4096 characters)

try:
    input = raw_input
except NameError:
    pass

profile_name = args.profile or os.environ.get('AWS_PROFILE', 'default')
section_name = profile_name if profile_name == 'default' else 'profile {}'.format(profile_name)

config_path=os.path.expanduser('~/.aws/config')
cred_path=os.path.expanduser('~/.aws/credentials')

config = configparser.RawConfigParser()
config.read(config_path)

session_duration = args.session_duration or config.getint(section_name, 'saml.session_duration')
principal_arn = args.idp_arn or config.get(section_name, 'saml.idp_arn')
role_arn = args.role_arn or config.get(section_name, 'saml.role_arn')

# would use getpass, but truncates to terminal max 4096
saml_assertion = input('Base64 encoded SAML response:\n')

sts = boto3.client('sts')
response = sts.assume_role_with_saml(
    DurationSeconds=session_duration,
    PrincipalArn=principal_arn,
    RoleArn=role_arn,
    SAMLAssertion=saml_assertion,
)

cred = configparser.RawConfigParser()
cred.read(cred_path)

if not cred.has_section(profile_name):
    cred.add_section(profile_name)

cred.set(profile_name, 'aws_access_key_id', response['Credentials']['AccessKeyId'])
cred.set(profile_name, 'aws_secret_access_key', response['Credentials']['SecretAccessKey'])
cred.set(profile_name, 'aws_session_token', response['Credentials']['SessionToken'])

with open(cred_path, 'w+') as f:
    cred.write(f)

print('Credentials saved for {}. Expire {}.'.format(profile_name, response['Credentials']['Expiration']))
