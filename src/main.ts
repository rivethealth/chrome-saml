const url = new URL(location.href);
switch (url.search) {
  case '?background':
    import('./background');
    break;
  case '?ui':
    import('./ui');
    break;
}
