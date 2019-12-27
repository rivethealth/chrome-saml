import { tap, map, filter } from 'rxjs/operators';
import { chromeEvent } from './chrome';
import { merge } from 'rxjs';
import { MessageInfo } from './saml';

const responses = new Map<number, MessageInfo>();
window['responses'] = responses;

function enable(tabId: number) {
  chrome.pageAction.show(tabId);
  chrome.pageAction.setIcon({ tabId, path: 'asset/icon/16.png' });
  chrome.pageAction.setTitle({ tabId, title: 'SAML response' });
  chrome.pageAction.setPopup({
    tabId,
    popup: `index.html?action`,
  });
}

const intercept = chromeEvent(
  chrome.webRequest.onBeforeRequest,
  { urls: ['<all_urls>'] },
  ['requestBody'],
).pipe(
  filter(([event]) => 0 <= event.tabId),
  map(([event]) => {
    let info: MessageInfo | undefined;
    if (
      event.requestBody &&
      event.requestBody.formData &&
      event.requestBody.formData.SAMLResponse
    ) {
      info = {
        url: event.url,
        value: event.requestBody.formData.SAMLResponse[0],
      };
    }
    return <const>[event.tabId, info];
  }),
  tap(([tabId, info]) => {
    if (info) {
      responses.set(tabId, info);
      enable(tabId);
    }
  }),
);

const update = chromeEvent(chrome.tabs.onUpdated).pipe(
  tap(([tabId]) => {
    if (responses.has(tabId)) {
      enable(tabId);
    }
  }),
);

const cleanup = chromeEvent(chrome.tabs.onRemoved).pipe(
  tap(([tabId]) => responses.delete(tabId)),
);

merge(intercept, cleanup, update).subscribe();
