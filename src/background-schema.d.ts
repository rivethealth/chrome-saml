import { MessageInfo } from './saml';

export interface BackgroundWindow extends Window {
  responses: Map<number, MessageInfo>;
}
