import { Component, ChangeDetectionStrategy } from '@angular/core';
import { queryTabs } from '../chrome';
import { BackgroundWindow } from '../background-schema';
import * as moment from 'moment';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'extension',
  styleUrls: ['./action.component.scss'],
  templateUrl: './action.component.html',
})
export class ActionComponent {
  private readonly currentTab = queryTabs({
    active: true,
    currentWindow: true,
  });
  private readonly background = <BackgroundWindow>(
    chrome.extension.getBackgroundPage()
  );

  private readonly response = this.currentTab.then(([tab]) =>
    this.background.responses.get(tab.id),
  );

  readonly duration = this.response
    .then(message => moment(message.time).fromNow());

  readonly url = this.response.then(message => message.url);

  readonly encoded = this.response.then(message => message.value);

  readonly decoded = this.response
    .then(message => atob(message.value))
    .catch(() => '');
}
