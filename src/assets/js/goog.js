/**
 * Switches the language link in the navbar,
 * according to google translate cookie
 * @return null
 */
export function switchLangLink() {
  $('document').ready(() => {
    if (Cookies.get('googtrans') == '/en/en') {
      $("#languageLink>span").html("Español")
    } else {
      $("#languageLink>span").html("English")
    }
  })
}

/**
 * Sets the google translate cookie to English or Spanish
 * @return null
 */
export function switchGoogleTransCookie() {
  $('#languageLink').on('click', () => {

    if (Cookies.get('googtrans') == '/en/en') {
      Cookies.set('googtrans', '/en/es');
      location.reload();
    } else {
      Cookies.set('googtrans', '/en/en');
      location.reload();
    }

  })
}
