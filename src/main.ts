const url = new URL(location.href);
switch (url.search) {
  case '?action':
    import('./action');
    break;
  case '?background':
    import('./background');
    break;
}
