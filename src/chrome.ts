import { Observable } from 'rxjs';

export function chromeEvent<T extends unknown[]>(
  event: chrome.events.Event<(...event: T) => void>,
  ...args: any[]
): Observable<T> {
  return new Observable((subscriber) => {
    const listener = (...event: T) => subscriber.next(event);
    (<any>event.addListener)(listener, ...args);
    return () => event.removeListener(listener);
  });
}

export function queryTabs(
  queryInfo: chrome.tabs.QueryInfo,
): Promise<chrome.tabs.Tab[]> {
  return new Promise((resolve) => chrome.tabs.query(queryInfo, resolve));
}
