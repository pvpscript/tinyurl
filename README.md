# Disclaimer
This extension was made with the purpose of studying how browser add-ons work, thus the simple ideia. I also hope that this extension can help people out with their necessities as well as devs with how to code a browser extension.

# Introduction
This browser extension's goal is to use the [TinyURL](https://www.tinyurl.com) service to allow the user to create a short URL for the current page being visited. It also allows the user to choose between a "default" URL, where a random address is generated by the TinyURL website, or an "aliased" URL, which is chosen by the user.

There are two ways of using it:
* By clicking on the extension's icon;
* By right clicking anywhere on the current page and going to the `TinyURL` context menu.

# Browser compatibility
This extension is compatible with **Firefox**; **Google Chrome and derivatives**; **Opera**.

### Compatibility issues during development
Below the folders `chrome/` and `firefox/` you will find the extension's code for chrome based web browsers and for firefox, respectivelly.

At first I thought they would be extremelly necessary and that I'd face some serious core rewring when going from chrome based (where I started) to firefox, but that wasn't actually the case. When analysing the code, you'll notice that API calls under the `chrome/` folder, starts with `chrome.[something]` and for the `firefox/` folder, `browser.[something]`, and as it turns out this is not really necessary, since firefox can have API calls starting with `chrome.[something]`. Regardless of that, I decided to keep the difference in the code and document it here.

A very straightforward difference is about the `options` page. In both Google Chrome and Firefox, it'll be defined in the `manifest.json` file, but for the first, the key is called `options_page`, and for the second, `options_ui`.

An important difference that I noticed was regarding a property called `Add-on ID`. Firefox asks for a manually defined `add-on ID` in the `manifest.json` file, otherwise the `storage` API won't work. See [bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=1323228).

In this case, it's necessary to define it as shown below:
```
"browser_specific_settings": {
  "gecko": {
    "id": "some_custom_addon_id"
  }
}
```

More about the implications of the `Add-on ID` are discussed [here](https://extensionworkshop.com/documentation/develop/extensions-and-the-add-on-id/).


Another relevant thing that I noticed was about javascript popup boxes, such as alerts. When using Google Chrome and its based web browsers, it's possible to display popup boxes directly from the background script and it will be displayed in a kind-of different window and this happens to not be the case in Firefox. When trying to display alerts from a background script, the browser will notify that those are not supported by showing an warning, like this one below:

`alert() is not supported in background windows; please use console.log instead.`;

# Known Issues
There might be an issue that prevents this extension from working when currently on a search page, such as google search. As pointed out by [this issue](https://forums.opera.com/topic/31645/solved-this-page-cannot-be-scripted-due-to-an-extensionssettings-policy), go to the `extension's preferences` menu and check the `Allow access to search page results` option.

# Installation
* Firefox: [Add-ons for Firefox page]();
* Google Chrome: [Chrome Web Store page](); 
* Opera: [Opera add-ons page]();

## Manual installation
See the specifications regarding unpacked extensions for your particular browser.
